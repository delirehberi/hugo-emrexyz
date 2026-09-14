import { SimplePool, finalizeEvent, getPublicKey, generateSecretKey } from 'nostr-tools';
import * as nip19 from 'nostr-tools/nip19';
import { BunkerSigner, parseBunkerInput } from 'nostr-tools/nip46';

/**
 * Nostr Comments Component for blog.emre.xyz
 * Provides automatic nevent/naddr resolution, threaded comments,
 * and multi-auth reply box (NIP-07 Extension, NIP-46 Bunker, nsec).
 */

const DEFAULT_RELAYS = [
  'wss://relay.emre.xyz',
  'wss://relay.nostr.band',
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://nos.lol',
  'wss://relay.primal.net',
  'wss://nostr.mom',
  'wss://relay.nos.social',
  'wss://articles.layer3.news',
  'wss://mls.akdeniz.edu.tr/nostr',
  'wss://relay.nostr.org.tr',
  'wss://purplepag.es'
];

// Helper: Escape HTML to strictly prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Helper: Format text with safe clickable URLs and nostr links
function formatContent(text) {
  if (!text) return '';
  const escaped = escapeHtml(text);
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  return escaped.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}

// Helper: Human-readable relative time
function formatRelativeTime(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  const d = new Date(timestamp * 1000);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// Helper: Shorten hex or npub
function shortenKey(key) {
  if (!key) return '';
  if (key.length <= 12) return key;
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

class NostrCommentsApp {
  constructor(container) {
    this.container = container;
    this.anchor = container.getAttribute('data-anchor') || '';
    const relaysAttr = container.getAttribute('data-relays');
    this.relays = relaysAttr ? relaysAttr.split(',').map(r => r.trim()).filter(Boolean) : DEFAULT_RELAYS;
    
    this.pool = new SimplePool();
    this.rootInfo = null;
    this.comments = [];
    this.profiles = new Map();
    
    this.currentUser = null;
    this.activeAuthTab = 'extension';
    this.activeReplyToId = null;

    this.init();
  }

  async init() {
    this.renderSkeleton();
    await this.restoreSavedSession();
    await this.resolveRootAndFetchComments();
  }

  renderSkeleton() {
    this.container.innerHTML = `
      <div class="nc-header">
        <h3>Comments <span class="nc-count" id="nc-header-count"></span></h3>
      </div>
      <div id="nc-reply-container"></div>
      <div id="nc-comments-list">
        <div class="nc-loading">Connecting to Nostr relays and loading comments...</div>
      </div>
    `;
    this.renderReplyBox();
  }

  // ------------------------------------------------------------------------
  // Session & Signer Management
  // ------------------------------------------------------------------------
  async restoreSavedSession() {
    try {
      const saved = localStorage.getItem('nostr_comments_auth');
      if (!saved) return;
      const parsed = JSON.parse(saved);

      if (parsed.type === 'extension') {
        if (window.nostr) {
          const pubkey = await window.nostr.getPublicKey();
          this.setLoggedInUser('extension', pubkey, {
            signEvent: (ev) => window.nostr.signEvent(ev)
          });
        }
      } else if (parsed.type === 'bunker' && parsed.bunkerInput && parsed.clientKeyHex) {
        const clientKey = new Uint8Array(parsed.clientKeyHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const bp = await parseBunkerInput(parsed.bunkerInput);
        const bunkerSigner = new BunkerSigner(clientKey, bp);
        await bunkerSigner.connect();
        const pubkey = await bunkerSigner.getPublicKey();
        this.setLoggedInUser('bunker', pubkey, bunkerSigner, parsed.bunkerInput);
      } else if (parsed.type === 'nsec' && parsed.nsecHex) {
        const secretKey = new Uint8Array(parsed.nsecHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const pubkey = getPublicKey(secretKey);
        this.setLoggedInUser('nsec', pubkey, {
          signEvent: async (ev) => finalizeEvent(ev, secretKey)
        });
      }
    } catch (err) {
      console.warn('Failed to restore Nostr session:', err);
      localStorage.removeItem('nostr_comments_auth');
    }
  }

  setLoggedInUser(type, pubkey, signer, extra = '') {
    let npub = '';
    try {
      npub = nip19.npubEncode(pubkey);
    } catch {
      npub = shortenKey(pubkey);
    }

    this.currentUser = {
      type,
      pubkey,
      npub,
      signer
    };

    // Save session in localStorage
    if (type === 'extension') {
      localStorage.setItem('nostr_comments_auth', JSON.stringify({ type: 'extension' }));
    } else if (type === 'bunker') {
      const clientKeyHex = Array.from(signer.secretKey).map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('nostr_comments_auth', JSON.stringify({ type: 'bunker', bunkerInput: extra, clientKeyHex }));
    } else if (type === 'nsec') {
      sessionStorage.setItem('nostr_comments_nsec', 'active');
    }

    // Fetch user profile
    this.fetchProfile(pubkey).then(() => {
      this.renderReplyBox();
    });
    this.renderReplyBox();
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('nostr_comments_auth');
    sessionStorage.removeItem('nostr_comments_nsec');
    this.renderReplyBox();
  }

  // ------------------------------------------------------------------------
  // Resolution Engine: Decodes nevent, naddr, or URL into Address & Event ID
  // ------------------------------------------------------------------------
  async resolveRootAndFetchComments() {
    try {
      this.rootInfo = await this.resolveAnchor(this.anchor);
      await this.fetchComments();
    } catch (err) {
      console.error('Resolution error:', err);
      const listEl = document.getElementById('nc-comments-list');
      if (listEl) {
        listEl.innerHTML = `<div class="nc-empty">Could not load Nostr root event: ${escapeHtml(err.message)}</div>`;
      }
    }
  }

  async resolveAnchor(anchor) {
    let relays = [...this.relays];
    let eventId = null;
    let coordinate = null;
    let authorPubkey = null;
    let url = null;

    if (!anchor) {
      return { relays, eventId: null, coordinate: null, authorPubkey: null, url: window.location.href };
    }

    if (anchor.startsWith('nevent1')) {
      const decoded = nip19.decode(anchor);
      if (decoded.type === 'nevent') {
        eventId = decoded.data.id;
        if (decoded.data.relays && decoded.data.relays.length > 0) {
          relays = Array.from(new Set([...decoded.data.relays, ...relays]));
        }
        authorPubkey = decoded.data.author || null;

        // Fetch root event to check if it's kind 30023 and retrieve its d-tag
        try {
          const rootEvent = await this.pool.get(relays, { ids: [eventId] });
          if (rootEvent) {
            authorPubkey = rootEvent.pubkey;
            if (rootEvent.kind === 30023) {
              const dTag = rootEvent.tags.find(t => t[0] === 'd')?.[1] || '';
              coordinate = `30023:${rootEvent.pubkey}:${dTag}`;
            }
          }
        } catch (fetchErr) {
          console.warn('Could not fetch root event directly; relying on eventId:', fetchErr);
        }
      }
    } else if (anchor.startsWith('naddr1')) {
      const decoded = nip19.decode(anchor);
      if (decoded.type === 'naddr') {
        const { kind, pubkey, identifier, relays: hintRelays } = decoded.data;
        coordinate = `${kind}:${pubkey}:${identifier}`;
        authorPubkey = pubkey;
        if (hintRelays && hintRelays.length > 0) {
          relays = Array.from(new Set([...hintRelays, ...relays]));
        }
      }
    } else if (anchor.startsWith('note1')) {
      const decoded = nip19.decode(anchor);
      if (decoded.type === 'note') {
        eventId = decoded.data;
      }
    } else {
      url = anchor;
    }

    return { relays, eventId, coordinate, authorPubkey, url };
  }

  // ------------------------------------------------------------------------
  // Comment Fetching & Thread Tree Construction
  // ------------------------------------------------------------------------
  async fetchComments() {
    if (!this.rootInfo) return;

    const filters = [];
    if (this.rootInfo.coordinate) {
      filters.push({ '#a': [this.rootInfo.coordinate], kinds: [1, 1111] });
      filters.push({ '#A': [this.rootInfo.coordinate], kinds: [1, 1111] });
    }
    if (this.rootInfo.eventId) {
      filters.push({ '#e': [this.rootInfo.eventId], kinds: [1, 1111] });
      filters.push({ '#E': [this.rootInfo.eventId], kinds: [1, 1111] });
    }
    if (this.rootInfo.url) {
      filters.push({ '#r': [this.rootInfo.url], kinds: [1, 1111] });
    }

    if (filters.length === 0) {
      this.renderCommentTree();
      return;
    }

    const eventsMap = new Map();
    const authorsToFetch = new Set();
    if (this.rootInfo.authorPubkey) authorsToFetch.add(this.rootInfo.authorPubkey);

    try {
      // Query each filter individually with valid single filter objects
      for (const filter of filters) {
        const events = await this.pool.querySync(this.rootInfo.relays, filter);
        for (const ev of events) {
          if (ev.id === this.rootInfo.eventId) continue;
          // Strictly allow only text notes (1) and comments (1111)
          if (ev.kind !== 1 && ev.kind !== 1111) continue;
          eventsMap.set(ev.id, ev);
          authorsToFetch.add(ev.pubkey);
        }
      }

      // Query any threaded replies to the comments found so far
      if (eventsMap.size > 0) {
        const commentIds = Array.from(eventsMap.keys());
        const replyEvents = await this.pool.querySync(this.rootInfo.relays, {
          '#e': commentIds,
          kinds: [1, 1111]
        });
        for (const ev of replyEvents) {
          if (ev.id === this.rootInfo.eventId) continue;
          if (ev.kind !== 1 && ev.kind !== 1111) continue;
          eventsMap.set(ev.id, ev);
          authorsToFetch.add(ev.pubkey);
        }
      }
    } catch (err) {
      console.warn('Error querying comments:', err);
    }

    this.comments = Array.from(eventsMap.values()).sort((a, b) => a.created_at - b.created_at);

    // Fetch kind 0 profiles in parallel
    if (authorsToFetch.size > 0) {
      this.fetchProfiles(Array.from(authorsToFetch)).then(() => {
        this.renderCommentTree();
      });
    }

    this.renderCommentTree();
  }

  async fetchProfiles(pubkeys) {
    const missing = pubkeys.filter(pk => !this.profiles.has(pk));
    if (missing.length === 0) return;

    try {
      const profileEvents = await this.pool.querySync(this.relays, {
        kinds: [0],
        authors: missing
      });
      for (const ev of profileEvents) {
        try {
          const data = JSON.parse(ev.content);
          const existing = this.profiles.get(ev.pubkey);
          if (!existing || ev.created_at > (existing._created_at || 0)) {
            data._created_at = ev.created_at;
            this.profiles.set(ev.pubkey, data);
          }
        } catch {}
      }
    } catch (err) {
      console.warn('Error fetching profiles:', err);
    }
  }

  async fetchProfile(pubkey) {
    if (this.profiles.has(pubkey)) return this.profiles.get(pubkey);
    await this.fetchProfiles([pubkey]);
    return this.profiles.get(pubkey);
  }

  // ------------------------------------------------------------------------
  // UI Rendering: Comment Tree & Single Comment Item
  // ------------------------------------------------------------------------
  renderCommentTree() {
    const listEl = document.getElementById('nc-comments-list');
    const countEl = document.getElementById('nc-header-count');
    if (!listEl) return;

    if (countEl) {
      countEl.textContent = `(${this.comments.length})`;
    }

    if (this.comments.length === 0) {
      listEl.innerHTML = `<div class="nc-empty">No comments yet. Be the first to share your thoughts on Nostr!</div>`;
      return;
    }

    // Build parent-child map
    const rootComments = [];
    const childrenMap = new Map();

    for (const comment of this.comments) {
      const parentId = this.findParentCommentId(comment);
      if (parentId && this.comments.some(c => c.id === parentId)) {
        if (!childrenMap.has(parentId)) childrenMap.set(parentId, []);
        childrenMap.get(parentId).push(comment);
      } else {
        rootComments.push(comment);
      }
    }

    const renderNode = (comment) => {
      const children = childrenMap.get(comment.id) || [];
      return `
        <div class="nc-comment-item" id="nc-comment-${comment.id}">
          ${this.renderCommentCard(comment)}
          ${children.length > 0 ? `
            <div class="nc-replies-container">
              ${children.map(renderNode).join('')}
            </div>
          ` : ''}
          <div class="nc-inline-reply-container" id="nc-inline-reply-${comment.id}"></div>
        </div>
      `;
    };

    listEl.innerHTML = `
      <div class="nc-thread-list">
        ${rootComments.map(renderNode).join('')}
      </div>
    `;

    // Attach reply button listeners
    listEl.querySelectorAll('.nc-btn-reply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const commentId = e.currentTarget.getAttribute('data-comment-id');
        this.openInlineReply(commentId);
      });
    });
  }

  findParentCommentId(comment) {
    const eTags = comment.tags.filter(t => t[0] === 'e' || t[0] === 'E');
    if (eTags.length === 0) return null;

    // NIP-10: check for explicit 'reply' marker
    const replyTag = eTags.find(t => t[3] === 'reply');
    if (replyTag && replyTag[1] !== this.rootInfo?.eventId) return replyTag[1];

    // If only one e-tag and it points to root event, it's a top-level reply
    if (eTags.length === 1 && eTags[0][1] === this.rootInfo?.eventId) return null;

    // In NIP-22: ["A", coordinate], ["e", parentCommentId]
    const lowerETag = comment.tags.find(t => t[0] === 'e' && t[1] !== this.rootInfo?.eventId);
    if (lowerETag) return lowerETag[1];

    // Otherwise, last e-tag is usually parent
    const lastTag = eTags[eTags.length - 1];
    if (lastTag[1] !== this.rootInfo?.eventId) return lastTag[1];

    return null;
  }

  renderCommentCard(comment) {
    const profile = this.profiles.get(comment.pubkey) || {};
    const name = profile.display_name || profile.name || shortenKey(comment.pubkey);
    const nip05 = profile.nip05 ? `<span class="nc-nip05">${escapeHtml(profile.nip05)}</span>` : '';
    const avatar = profile.picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${comment.pubkey}`;
    const dateStr = formatRelativeTime(comment.created_at);
    const contentHtml = formatContent(comment.content);

    return `
      <div class="nc-comment-card">
        <div class="nc-comment-header">
          <div class="nc-comment-author">
            <img class="nc-user-avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(name)}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${comment.pubkey}'" />
            <a class="nc-comment-author-name" href="https://njump.me/${nip19.npubEncode(comment.pubkey)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>
            ${nip05}
          </div>
          <span class="nc-comment-date">${dateStr}</span>
        </div>
        <div class="nc-comment-body">${contentHtml}</div>
        <div class="nc-comment-footer">
          <button class="nc-btn-reply" data-comment-id="${comment.id}">Reply</button>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // Reply Box Rendering & Event Publishing
  // ------------------------------------------------------------------------
  renderReplyBox(targetEl = null, parentCommentId = null) {
    const container = targetEl || document.getElementById('nc-reply-container');
    if (!container) return;

    if (this.currentUser) {
      const profile = this.profiles.get(this.currentUser.pubkey) || {};
      const name = profile.display_name || profile.name || this.currentUser.npub;
      const avatar = profile.picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${this.currentUser.pubkey}`;

      container.innerHTML = `
        <div class="nc-reply-box" id="nc-box-${parentCommentId || 'root'}">
          <div class="nc-user-bar">
            <div class="nc-user-info">
              <img class="nc-user-avatar" src="${escapeHtml(avatar)}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${this.currentUser.pubkey}'" />
              <span class="nc-user-name">${escapeHtml(name)}</span>
              <span class="nc-user-method">${this.currentUser.type}</span>
            </div>
            <button class="nc-btn-logout" id="nc-logout-btn">Log out</button>
          </div>
          <textarea class="nc-textarea" id="nc-text-${parentCommentId || 'root'}" placeholder="${parentCommentId ? 'Write a reply...' : 'Leave a comment via Nostr...'}" rows="3"></textarea>
          <div class="nc-reply-footer">
            <span class="nc-status" id="nc-status-${parentCommentId || 'root'}"></span>
            <div class="nc-actions">
              ${parentCommentId ? `<button class="nc-btn nc-btn-sm" id="nc-cancel-${parentCommentId}">Cancel</button>` : ''}
              <button class="nc-btn nc-btn-primary" id="nc-send-${parentCommentId || 'root'}">Send</button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#nc-logout-btn')?.addEventListener('click', () => this.logout());

      if (parentCommentId) {
        container.querySelector(`#nc-cancel-${parentCommentId}`)?.addEventListener('click', () => {
          container.innerHTML = '';
          this.activeReplyToId = null;
        });
      }

      container.querySelector(`#nc-send-${parentCommentId || 'root'}`)?.addEventListener('click', () => {
        this.handlePublishReply(parentCommentId);
      });

    } else {
      // Logged out: Show auth switcher
      container.innerHTML = `
        <div class="nc-reply-box">
          <div class="nc-auth-tabs">
            <button class="nc-auth-tab ${this.activeAuthTab === 'extension' ? 'active' : ''}" data-tab="extension">Extension</button>
            <button class="nc-auth-tab ${this.activeAuthTab === 'bunker' ? 'active' : ''}" data-tab="bunker">Bunker</button>
            <button class="nc-auth-tab ${this.activeAuthTab === 'nsec' ? 'active' : ''}" data-tab="nsec">nsec</button>
          </div>

          <!-- Extension Tab -->
          <div class="nc-auth-panel ${this.activeAuthTab === 'extension' ? 'active' : ''}" id="nc-panel-extension">
            <p style="margin:0 0 0.5rem 0; opacity:0.8;">Sign comments securely using browser extensions like Alby or nos2x.</p>
            <button class="nc-btn nc-btn-primary" id="nc-connect-ext-btn">Connect Extension</button>
          </div>

          <!-- Bunker Tab -->
          <div class="nc-auth-panel ${this.activeAuthTab === 'bunker' ? 'active' : ''}" id="nc-panel-bunker">
            <div class="nc-auth-row">
              <input class="nc-input" id="nc-bunker-input" placeholder="bunker://pubkey?relay=... or user@domain" />
              <button class="nc-btn nc-btn-primary" id="nc-connect-bunker-btn">Connect</button>
            </div>
          </div>

          <!-- nsec Tab -->
          <div class="nc-auth-panel ${this.activeAuthTab === 'nsec' ? 'active' : ''}" id="nc-panel-nsec">
            <div class="nc-auth-row">
              <input class="nc-input" type="password" id="nc-nsec-input" placeholder="nsec1..." autocomplete="off" />
              <button class="nc-btn nc-btn-primary" id="nc-connect-nsec-btn">Use nsec</button>
            </div>
            <span style="font-size:0.75rem; opacity:0.6;">Your key remains strictly in browser memory.</span>
          </div>

          <div id="nc-auth-status" class="nc-status" style="margin-top:0.5rem;"></div>
        </div>
      `;

      // Tab switcher handlers
      container.querySelectorAll('.nc-auth-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
          this.activeAuthTab = e.currentTarget.getAttribute('data-tab');
          this.renderReplyBox(container, parentCommentId);
        });
      });

      // Connect Extension
      container.querySelector('#nc-connect-ext-btn')?.addEventListener('click', async () => {
        const statusEl = container.querySelector('#nc-auth-status');
        if (!window.nostr) {
          if (statusEl) {
            statusEl.className = 'nc-status error';
            statusEl.textContent = 'No NIP-07 browser extension found (e.g. Alby or nos2x).';
          }
          return;
        }
        try {
          if (statusEl) {
            statusEl.className = 'nc-status';
            statusEl.textContent = 'Requesting access from extension...';
          }
          const pubkey = await window.nostr.getPublicKey();
          this.setLoggedInUser('extension', pubkey, {
            signEvent: (ev) => window.nostr.signEvent(ev)
          });
        } catch (err) {
          if (statusEl) {
            statusEl.className = 'nc-status error';
            statusEl.textContent = `Extension error: ${err.message || err}`;
          }
        }
      });

      // Connect Bunker
      container.querySelector('#nc-connect-bunker-btn')?.addEventListener('click', async () => {
        const input = container.querySelector('#nc-bunker-input')?.value?.trim();
        const statusEl = container.querySelector('#nc-auth-status');
        if (!input) return;
        try {
          if (statusEl) {
            statusEl.className = 'nc-status';
            statusEl.textContent = 'Connecting to bunker...';
          }
          const clientKey = generateSecretKey();
          const bp = await parseBunkerInput(input);
          const bunkerSigner = new BunkerSigner(clientKey, bp);
          await bunkerSigner.connect();
          const pubkey = await bunkerSigner.getPublicKey();
          this.setLoggedInUser('bunker', pubkey, bunkerSigner, input);
        } catch (err) {
          if (statusEl) {
            statusEl.className = 'nc-status error';
            statusEl.textContent = `Bunker error: ${err.message || err}`;
          }
        }
      });

      // Connect nsec
      container.querySelector('#nc-connect-nsec-btn')?.addEventListener('click', () => {
        const input = container.querySelector('#nc-nsec-input')?.value?.trim();
        const statusEl = container.querySelector('#nc-auth-status');
        if (!input) return;
        try {
          const decoded = nip19.decode(input);
          if (decoded.type !== 'nsec') {
            throw new Error('Invalid key type: expected nsec1...');
          }
          const secretKey = decoded.data;
          const pubkey = getPublicKey(secretKey);
          this.setLoggedInUser('nsec', pubkey, {
            signEvent: async (ev) => finalizeEvent(ev, secretKey)
          });
        } catch (err) {
          if (statusEl) {
            statusEl.className = 'nc-status error';
            statusEl.textContent = `Key error: ${err.message || 'Invalid nsec'}`;
          }
        }
      });
    }
  }

  openInlineReply(commentId) {
    if (this.activeReplyToId && this.activeReplyToId !== commentId) {
      const oldContainer = document.getElementById(`nc-inline-reply-${this.activeReplyToId}`);
      if (oldContainer) oldContainer.innerHTML = '';
    }
    this.activeReplyToId = commentId;
    const container = document.getElementById(`nc-inline-reply-${commentId}`);
    if (container) {
      this.renderReplyBox(container, commentId);
    }
  }

  async handlePublishReply(parentCommentId = null) {
    const boxId = parentCommentId || 'root';
    const textEl = document.getElementById(`nc-text-${boxId}`);
    const statusEl = document.getElementById(`nc-status-${boxId}`);
    const sendBtn = document.getElementById(`nc-send-${boxId}`);
    const text = textEl?.value?.trim();

    if (!text) return;
    if (!this.currentUser || !this.currentUser.signer) {
      if (statusEl) {
        statusEl.className = 'nc-status error';
        statusEl.textContent = 'Please log in to reply.';
      }
      return;
    }

    if (sendBtn) sendBtn.disabled = true;
    if (statusEl) {
      statusEl.className = 'nc-status';
      statusEl.textContent = 'Signing and publishing to relays...';
    }

    try {
      const tags = [];
      const relayHint = this.rootInfo?.relays?.[0] || 'wss://nos.lol';

      if (!parentCommentId) {
        // Root reply
        if (this.rootInfo?.coordinate) {
          tags.push(['A', this.rootInfo.coordinate, relayHint]);
          tags.push(['a', this.rootInfo.coordinate, relayHint, 'root']);
        }
        if (this.rootInfo?.eventId) {
          tags.push(['e', this.rootInfo.eventId, relayHint, 'root']);
        }
        if (this.rootInfo?.authorPubkey) {
          tags.push(['p', this.rootInfo.authorPubkey]);
        }
      } else {
        // Reply to existing comment
        const parentComment = this.comments.find(c => c.id === parentCommentId);
        if (this.rootInfo?.coordinate) {
          tags.push(['A', this.rootInfo.coordinate, relayHint]);
          tags.push(['a', this.rootInfo.coordinate, relayHint, 'root']);
        }
        if (this.rootInfo?.eventId) {
          tags.push(['e', this.rootInfo.eventId, relayHint, 'root']);
        }
        tags.push(['e', parentCommentId, relayHint, 'reply']);
        if (parentComment?.pubkey) {
          tags.push(['p', parentComment.pubkey]);
        }
      }

      tags.push(['client', 'emre.xyz']);

      const unsignedEvent = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags,
        content: text
      };

      const signedEvent = await this.currentUser.signer.signEvent(unsignedEvent);

      // Publish to relays
      const publishPromises = this.pool.publish(this.rootInfo.relays, signedEvent);
      await Promise.any(publishPromises);

      if (statusEl) {
        statusEl.className = 'nc-status';
        statusEl.textContent = 'Published successfully!';
      }

      // Optimistic update: add comment to local state and re-render
      this.comments.push(signedEvent);
      if (textEl) textEl.value = '';

      if (parentCommentId) {
        const inlineContainer = document.getElementById(`nc-inline-reply-${parentCommentId}`);
        if (inlineContainer) inlineContainer.innerHTML = '';
        this.activeReplyToId = null;
      }

      this.renderCommentTree();

    } catch (err) {
      console.error('Publish failed:', err);
      if (statusEl) {
        statusEl.className = 'nc-status error';
        statusEl.textContent = `Failed: ${err.message || err}`;
      }
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('nostr-comments');
  if (container) {
    window.nostrComments = new NostrCommentsApp(container);
  }
});
