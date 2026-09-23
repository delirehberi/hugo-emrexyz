import { SimplePool, finalizeEvent, getPublicKey, generateSecretKey } from 'nostr-tools';
import * as nip19 from 'nostr-tools/nip19';
import { BunkerSigner, parseBunkerInput } from 'nostr-tools/nip46';

/**
 * Nostr Highlights (NIP-84, Kind: 9802) Component for blog.emre.xyz
 * Allows readers to select text strictly within article content,
 * sign and publish highlights/quote-highlights to Nostr relays,
 * and view existing community highlights on the article.
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

const DEFAULT_CACHE_RELAY = 'wss://cache.nostr.org.tr';
const SITE_AUTHOR_NPUB = 'npub1gmeu0wenescpjpymwmwgnkaedc6vy3aamf5tdtvxxf5z0yll3gdqatwl3v';

// Helper: Escape HTML to strictly prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Helper: Shorten hex or npub
function shortenKey(key) {
  if (!key) return '';
  if (key.length <= 12) return key;
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

// Helper: Relative time format
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

export class NostrHighlightsApp {
  constructor(options = {}) {
    this.bodyEl = document.querySelector('.post-content .body') || document.querySelector('section.body');
    if (!this.bodyEl) return;

    this.commentsContainer = document.getElementById('nostr-comments');
    const relaysAttr = this.commentsContainer?.getAttribute('data-relays');
    this.relays = relaysAttr ? relaysAttr.split(',').map(r => r.trim()).filter(Boolean) : DEFAULT_RELAYS;
    const cacheRelayAttr = this.commentsContainer?.getAttribute('data-cache-relay');
    this.cacheRelay = cacheRelayAttr !== null ? cacheRelayAttr.trim() : DEFAULT_CACHE_RELAY;

    this.pool = new SimplePool();
    this.currentUser = null;
    this.rootInfo = null;
    this.highlights = [];
    this.profiles = new Map();

    this.currentSelection = null;
    this.popoverEl = null;
    this.activeModalEl = null;
    this.activeDetailPopover = null;

    this.init();
  }

  getReadRelays(upstreamRelays = this.relays) {
    if (!this.cacheRelay || this.cacheRelay === 'false') {
      return upstreamRelays;
    }
    const cleanRelays = (upstreamRelays || [])
      .map(r => r.trim())
      .filter(r => Boolean(r) && !r.startsWith(this.cacheRelay));
    if (cleanRelays.length === 0) {
      return [this.cacheRelay];
    }
    return [`${this.cacheRelay}?relays=${cleanRelays.join(',')}`];
  }

  async init() {
    this.createFloatingPopover();
    this.bindSelectionEvents();
    await this.restoreSavedSession();
    await this.resolvePostRoot();
    await this.fetchAndRenderExistingHighlights();
  }

  // ------------------------------------------------------------------------
  // Session & Auth Management (Unified with NostrComments)
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
      console.warn('Failed to restore Nostr session in highlights:', err);
    }
  }

  setLoggedInUser(type, pubkey, signer, extra = '') {
    let npub = '';
    try {
      npub = nip19.npubEncode(pubkey);
    } catch {
      npub = shortenKey(pubkey);
    }

    this.currentUser = { type, pubkey, npub, signer };

    if (type === 'extension') {
      localStorage.setItem('nostr_comments_auth', JSON.stringify({ type: 'extension' }));
    } else if (type === 'bunker') {
      const clientKeyHex = Array.from(signer.secretKey).map(b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('nostr_comments_auth', JSON.stringify({ type: 'bunker', bunkerInput: extra, clientKeyHex }));
    }

    // Sync with comments app if present
    if (window.nostrComments && !window.nostrComments.currentUser) {
      window.nostrComments.setLoggedInUser(type, pubkey, signer, extra);
    }
  }

  // ------------------------------------------------------------------------
  // Post Resolution
  // ------------------------------------------------------------------------
  async resolvePostRoot() {
    let anchor = this.commentsContainer?.getAttribute('data-anchor') || '';
    if (!anchor || anchor.startsWith('http://') || anchor.startsWith('https://')) {
      const linkTag = document.querySelector('link[rel~="alternate"][href^="nostr:"]');
      if (linkTag) {
        const nostrUri = linkTag.getAttribute('href') || '';
        const discovered = nostrUri.replace(/^nostr:/i, '').trim();
        if (discovered) anchor = discovered;
      }
    }

    let relays = [...this.relays];
    let eventId = null;
    let coordinate = null;
    let authorPubkey = null;
    let url = window.location.href.split('#')[0];

    // Decode default site author pubkey
    try {
      const decodedAuthor = nip19.decode(SITE_AUTHOR_NPUB);
      if (decodedAuthor.type === 'npub') {
        authorPubkey = decodedAuthor.data;
      }
    } catch {}

    let cleanAnchor = (anchor || '').trim().replace(/^nostr:/i, '').trim();

    if (cleanAnchor.startsWith('nevent1')) {
      try {
        const decoded = nip19.decode(cleanAnchor);
        if (decoded.type === 'nevent') {
          eventId = decoded.data.id;
          if (decoded.data.relays && decoded.data.relays.length > 0) {
            relays = Array.from(new Set([...decoded.data.relays, ...relays]));
          }
          if (decoded.data.author) authorPubkey = decoded.data.author;

          const rootEvent = await this.pool.get(this.getReadRelays(relays), { ids: [eventId] });
          if (rootEvent) {
            authorPubkey = rootEvent.pubkey;
            if (rootEvent.kind === 30023) {
              const dTag = rootEvent.tags.find(t => t[0] === 'd')?.[1] || '';
              coordinate = `30023:${rootEvent.pubkey}:${dTag}`;
            }
          }
        }
      } catch (e) {
        console.warn('Error resolving nevent anchor:', e);
      }
    } else if (cleanAnchor.startsWith('naddr1')) {
      try {
        const decoded = nip19.decode(cleanAnchor);
        if (decoded.type === 'naddr') {
          const { kind, pubkey, identifier, relays: hintRelays } = decoded.data;
          coordinate = `${kind}:${pubkey}:${identifier}`;
          authorPubkey = pubkey;
          if (hintRelays && hintRelays.length > 0) {
            relays = Array.from(new Set([...hintRelays, ...relays]));
          }
        }
      } catch (e) {
        console.warn('Error resolving naddr anchor:', e);
      }
    } else if (cleanAnchor.startsWith('note1')) {
      try {
        const decoded = nip19.decode(cleanAnchor);
        if (decoded.type === 'note') eventId = decoded.data;
      } catch {}
    }

    this.rootInfo = { relays, eventId, coordinate, authorPubkey, url };
  }

  // ------------------------------------------------------------------------
  // Selection Detection & Floating Popover
  // ------------------------------------------------------------------------
  createFloatingPopover() {
    this.popoverEl = document.createElement('div');
    this.popoverEl.className = 'nh-selection-popover';
    this.popoverEl.innerHTML = `
      <button class="nh-popover-btn" id="nh-btn-highlight" title="Highlight on Nostr">
        <svg viewBox="0 0 24 24"><path d="m15.5 3.5 5 5L7 22H2v-5L15.5 3.5z"/><path d="m14 5 5 5"/></svg>
        Highlight
      </button>
      <div class="nh-popover-divider"></div>
      <button class="nh-popover-btn" id="nh-btn-quote" title="Quote Highlight with Comment">
        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Quote
      </button>
    `;
    document.body.appendChild(this.popoverEl);

    this.popoverEl.querySelector('#nh-btn-highlight')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleHighlightAction(false);
    });

    this.popoverEl.querySelector('#nh-btn-quote')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleHighlightAction(true);
    });
  }

  bindSelectionEvents() {
    const handleSelection = () => {
      // Delay slightly to ensure selection bounds are stabilized
      setTimeout(() => this.checkSelection(), 10);
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    document.addEventListener('mousedown', (e) => {
      if (this.popoverEl && !this.popoverEl.contains(e.target) && !e.target.closest('.nh-detail-popover')) {
        this.hidePopover();
      }
      if (this.activeDetailPopover && !this.activeDetailPopover.contains(e.target) && !e.target.closest('mark.nh-highlight')) {
        this.hideDetailPopover();
      }
    });

    window.addEventListener('resize', () => this.hidePopover());
    window.addEventListener('scroll', () => this.hidePopover(), { passive: true });
  }

  checkSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      this.hidePopover();
      return;
    }

    const range = sel.getRangeAt(0);
    const selectedText = sel.toString().trim();

    // Minimum 2 characters
    if (selectedText.length < 2) {
      this.hidePopover();
      return;
    }

    // Must be strictly inside article content (.post-content .body / section.body)
    const commonAncestor = range.commonAncestorContainer;
    const ancestorNode = commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor : commonAncestor.parentElement;
    
    if (!this.bodyEl.contains(ancestorNode)) {
      this.hidePopover();
      return;
    }

    // Exclude comments section, nostr id link, toc, etc.
    if (ancestorNode.closest('#nostr-comments, .nostr-id, .toc, .post-tags')) {
      this.hidePopover();
      return;
    }

    // Determine surrounding context (paragraph or containing block)
    let contextNode = ancestorNode;
    while (contextNode && contextNode !== this.bodyEl && !['P', 'BLOCKQUOTE', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV'].includes(contextNode.tagName)) {
      contextNode = contextNode.parentElement;
    }
    const contextText = contextNode ? contextNode.textContent.trim() : selectedText;

    this.currentSelection = {
      text: selectedText,
      context: contextText,
      range: range.cloneRange()
    };

    this.showPopover(range);
  }

  showPopover(range) {
    if (!this.popoverEl) return;
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      this.hidePopover();
      return;
    }

    const popoverWidth = 190;
    const popoverHeight = 40;

    let left = rect.left + (rect.width / 2) - (popoverWidth / 2) + window.scrollX;
    let top = rect.top - popoverHeight - 10 + window.scrollY;
    let isBottom = false;

    // Boundary collision checks
    if (left < 10) left = 10;
    if (left + popoverWidth > window.innerWidth - 10) {
      left = window.innerWidth - popoverWidth - 10;
    }

    if (rect.top - popoverHeight - 10 < 0) {
      // Show below selection
      top = rect.bottom + 10 + window.scrollY;
      isBottom = true;
    }

    this.popoverEl.style.left = `${left}px`;
    this.popoverEl.style.top = `${top}px`;
    this.popoverEl.classList.toggle('arrow-bottom', !isBottom);
    this.popoverEl.classList.toggle('arrow-top', isBottom);
    this.popoverEl.classList.add('visible');
  }

  hidePopover() {
    if (this.popoverEl) {
      this.popoverEl.classList.remove('visible');
    }
  }

  // ------------------------------------------------------------------------
  // Action Handlers: Highlight or Quote
  // ------------------------------------------------------------------------
  async handleHighlightAction(isQuote) {
    if (!this.currentSelection) return;

    this.hidePopover();

    // Check if user is logged in
    if (!this.currentUser) {
      this.showAuthModal(async () => {
        if (isQuote) {
          this.showQuoteModal();
        } else {
          await this.publishHighlight(this.currentSelection.text, this.currentSelection.context, null);
        }
      });
      return;
    }

    if (isQuote) {
      this.showQuoteModal();
    } else {
      await this.publishHighlight(this.currentSelection.text, this.currentSelection.context, null);
    }
  }

  // ------------------------------------------------------------------------
  // Auth Modal (Shared login for Nostr actions)
  // ------------------------------------------------------------------------
  showAuthModal(onSuccessCallback) {
    this.closeModal();

    const backdrop = document.createElement('div');
    backdrop.className = 'nh-modal-backdrop';
    backdrop.innerHTML = `
      <div class="nh-modal-content">
        <div class="nh-modal-header">
          <h3 class="nh-modal-title">
            <svg style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Connect Nostr to Highlight
          </h3>
          <button class="nh-modal-close" id="nh-auth-close">&times;</button>
        </div>
        <p style="font-size:0.875rem;opacity:0.8;margin:0 0 1rem 0;">Sign your highlight event (NIP-84) to publish it to Nostr relays.</p>
        
        <div class="nc-auth-tabs">
          <button class="nc-auth-tab active" data-tab="extension">Extension</button>
          <button class="nc-auth-tab" data-tab="bunker">Bunker</button>
          <button class="nc-auth-tab" data-tab="nsec">nsec</button>
        </div>

        <div class="nc-auth-panel active" id="nh-auth-panel-extension">
          <p style="margin:0 0 0.5rem 0; font-size:0.85rem; opacity:0.8;">Sign securely using browser extensions like Alby or nos2x.</p>
          <button class="nh-btn nh-btn-primary" id="nh-auth-connect-ext">Connect Extension</button>
        </div>

        <div class="nc-auth-panel" id="nh-auth-panel-bunker">
          <div class="nc-auth-row">
            <input class="nc-input" id="nh-bunker-input" placeholder="bunker://pubkey?relay=... or name@domain" />
            <button class="nh-btn nh-btn-primary" id="nh-auth-connect-bunker">Connect</button>
          </div>
        </div>

        <div class="nc-auth-panel" id="nh-auth-panel-nsec">
          <div class="nc-auth-row">
            <input class="nc-input" type="password" id="nh-nsec-input" placeholder="nsec1..." autocomplete="off" />
            <button class="nh-btn nh-btn-primary" id="nh-auth-connect-nsec">Use nsec</button>
          </div>
          <span style="font-size:0.75rem; opacity:0.6; margin-top:4px;">Your key remains strictly in browser memory.</span>
        </div>

        <div id="nh-auth-status" class="nh-status" style="margin-top:0.75rem;"></div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.activeModalEl = backdrop;
    requestAnimationFrame(() => backdrop.classList.add('visible'));

    // Close handler
    backdrop.querySelector('#nh-auth-close')?.addEventListener('click', () => this.closeModal());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.closeModal();
    });

    // Tab switcher
    backdrop.querySelectorAll('.nc-auth-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const targetTab = e.currentTarget.getAttribute('data-tab');
        backdrop.querySelectorAll('.nc-auth-tab').forEach(t => t.classList.toggle('active', t === e.currentTarget));
        backdrop.querySelectorAll('.nc-auth-panel').forEach(p => p.classList.toggle('active', p.id === `nh-auth-panel-${targetTab}`));
      });
    });

    const statusEl = backdrop.querySelector('#nh-auth-status');

    // Connect Extension
    backdrop.querySelector('#nh-auth-connect-ext')?.addEventListener('click', async () => {
      if (!window.nostr) {
        if (statusEl) {
          statusEl.className = 'nh-status error';
          statusEl.textContent = 'No NIP-07 browser extension found (e.g. Alby or nos2x).';
        }
        return;
      }
      try {
        if (statusEl) {
          statusEl.className = 'nh-status';
          statusEl.textContent = 'Requesting access from extension...';
        }
        const pubkey = await window.nostr.getPublicKey();
        this.setLoggedInUser('extension', pubkey, {
          signEvent: (ev) => window.nostr.signEvent(ev)
        });
        this.closeModal();
        if (onSuccessCallback) onSuccessCallback();
      } catch (err) {
        if (statusEl) {
          statusEl.className = 'nh-status error';
          statusEl.textContent = `Extension error: ${err.message || err}`;
        }
      }
    });

    // Connect Bunker
    backdrop.querySelector('#nh-auth-connect-bunker')?.addEventListener('click', async () => {
      const input = backdrop.querySelector('#nh-bunker-input')?.value?.trim();
      if (!input) return;
      try {
        if (statusEl) {
          statusEl.className = 'nh-status';
          statusEl.textContent = 'Connecting to bunker...';
        }
        const clientKey = generateSecretKey();
        const bp = await parseBunkerInput(input);
        const bunkerSigner = new BunkerSigner(clientKey, bp);
        await bunkerSigner.connect();
        const pubkey = await bunkerSigner.getPublicKey();
        this.setLoggedInUser('bunker', pubkey, bunkerSigner, input);
        this.closeModal();
        if (onSuccessCallback) onSuccessCallback();
      } catch (err) {
        if (statusEl) {
          statusEl.className = 'nh-status error';
          statusEl.textContent = `Bunker error: ${err.message || err}`;
        }
      }
    });

    // Connect nsec
    backdrop.querySelector('#nh-auth-connect-nsec')?.addEventListener('click', () => {
      const input = backdrop.querySelector('#nh-nsec-input')?.value?.trim();
      if (!input) return;
      try {
        const decoded = nip19.decode(input);
        if (decoded.type !== 'nsec') {
          throw new Error('Invalid key: expected nsec1...');
        }
        const secretKey = decoded.data;
        const pubkey = getPublicKey(secretKey);
        this.setLoggedInUser('nsec', pubkey, {
          signEvent: async (ev) => finalizeEvent(ev, secretKey)
        });
        this.closeModal();
        if (onSuccessCallback) onSuccessCallback();
      } catch (err) {
        if (statusEl) {
          statusEl.className = 'nh-status error';
          statusEl.textContent = `Key error: ${err.message || 'Invalid nsec'}`;
        }
      }
    });
  }

  // ------------------------------------------------------------------------
  // Quote / Comment Modal
  // ------------------------------------------------------------------------
  showQuoteModal() {
    this.closeModal();
    if (!this.currentSelection) return;

    const selectedText = this.currentSelection.text;
    const contextText = this.currentSelection.context;

    const backdrop = document.createElement('div');
    backdrop.className = 'nh-modal-backdrop';
    backdrop.innerHTML = `
      <div class="nh-modal-content">
        <div class="nh-modal-header">
          <h3 class="nh-modal-title">
            <svg style="width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Quote Highlight
          </h3>
          <button class="nh-modal-close" id="nh-quote-close">&times;</button>
        </div>

        <div class="nh-quote-preview">"${escapeHtml(selectedText)}"</div>

        <textarea class="nh-textarea" id="nh-quote-comment" placeholder="Add your thoughts or commentary (optional)..." rows="3"></textarea>

        <div class="nh-modal-footer">
          <span class="nh-status" id="nh-quote-status"></span>
          <div class="nh-btn-row">
            <button class="nh-btn" id="nh-quote-cancel">Cancel</button>
            <button class="nh-btn nh-btn-primary" id="nh-quote-publish">Publish</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.activeModalEl = backdrop;
    requestAnimationFrame(() => backdrop.classList.add('visible'));

    const commentInput = backdrop.querySelector('#nh-quote-comment');
    commentInput?.focus();

    backdrop.querySelector('#nh-quote-close')?.addEventListener('click', () => this.closeModal());
    backdrop.querySelector('#nh-quote-cancel')?.addEventListener('click', () => this.closeModal());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.closeModal();
    });

    backdrop.querySelector('#nh-quote-publish')?.addEventListener('click', async () => {
      const comment = commentInput?.value?.trim() || null;
      const statusEl = backdrop.querySelector('#nh-quote-status');
      const pubBtn = backdrop.querySelector('#nh-quote-publish');

      if (pubBtn) pubBtn.disabled = true;
      if (statusEl) {
        statusEl.className = 'nh-status';
        statusEl.textContent = 'Signing & publishing...';
      }

      try {
        await this.publishHighlight(selectedText, contextText, comment);
        this.closeModal();
      } catch (err) {
        if (statusEl) {
          statusEl.className = 'nh-status error';
          statusEl.textContent = `Error: ${err.message || err}`;
        }
        if (pubBtn) pubBtn.disabled = false;
      }
    });
  }

  closeModal() {
    if (this.activeModalEl) {
      this.activeModalEl.classList.remove('visible');
      setTimeout(() => {
        this.activeModalEl?.remove();
        this.activeModalEl = null;
      }, 200);
    }
  }

  // ------------------------------------------------------------------------
  // NIP-84 Event Publishing
  // ------------------------------------------------------------------------
  async publishHighlight(highlightedText, contextText, comment = null) {
    if (!this.currentUser || !this.currentUser.signer) {
      throw new Error('User not logged in');
    }

    const relayHint = this.rootInfo?.relays?.[0] || 'wss://relay.emre.xyz';
    const tags = [];

    // 1. Source reference tags (a, e, r)
    if (this.rootInfo?.coordinate) {
      tags.push(['a', this.rootInfo.coordinate, relayHint, 'source']);
    }
    if (this.rootInfo?.eventId) {
      tags.push(['e', this.rootInfo.eventId, relayHint, 'source']);
    }
    if (this.rootInfo?.url) {
      tags.push(['r', this.rootInfo.url, 'source']);
    }

    // 2. Author attribution tag (p)
    if (this.rootInfo?.authorPubkey) {
      tags.push(['p', this.rootInfo.authorPubkey, relayHint, 'author']);
    }

    // 3. Context tag per NIP-84
    if (contextText && contextText !== highlightedText) {
      tags.push(['context', contextText]);
    }

    // 4. Quote comment tag
    if (comment) {
      tags.push(['comment', comment]);
    }

    // 5. Client tag & Alt summary
    tags.push(['client', 'emre.xyz']);
    tags.push(['alt', `Highlight: "${highlightedText.slice(0, 120)}..."`]);

    const unsignedEvent = {
      kind: 9802,
      created_at: Math.floor(Date.now() / 1000),
      tags,
      content: highlightedText
    };

    const signedEvent = await this.currentUser.signer.signEvent(unsignedEvent);

    // Publish across relays
    const targetRelays = this.rootInfo?.relays || this.relays;
    const publishPromises = this.pool.publish(targetRelays, signedEvent);
    await Promise.any(publishPromises);

    this.showToast('Highlight published to Nostr!');

    // Add to local highlights and render
    this.highlights.push(signedEvent);
    this.renderSingleHighlightInDom(signedEvent);
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'nh-toast';
    toast.innerHTML = `
      <svg style="width:16px;height:16px;stroke:#10b981;fill:none;stroke-width:2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
      <span>${escapeHtml(message)}</span>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // ------------------------------------------------------------------------
  // Query & Render Existing Highlights on the Post
  // ------------------------------------------------------------------------
  async fetchAndRenderExistingHighlights() {
    if (!this.rootInfo) return;

    const filters = [];
    if (this.rootInfo.coordinate) {
      filters.push({ '#a': [this.rootInfo.coordinate], kinds: [9802] });
    }
    if (this.rootInfo.eventId) {
      filters.push({ '#e': [this.rootInfo.eventId], kinds: [9802] });
    }
    if (this.rootInfo.url) {
      filters.push({ '#r': [this.rootInfo.url], kinds: [9802] });
    }

    if (filters.length === 0) return;

    const eventsMap = new Map();
    const authorsToFetch = new Set();

    try {
      for (const filter of filters) {
        const events = await this.pool.querySync(this.getReadRelays(this.rootInfo.relays), filter);
        for (const ev of events) {
          if (ev.kind === 9802 && ev.content && ev.content.trim().length > 0) {
            eventsMap.set(ev.id, ev);
            authorsToFetch.add(ev.pubkey);
          }
        }
      }
    } catch (err) {
      console.warn('Error querying highlights:', err);
    }

    this.highlights = Array.from(eventsMap.values());

    if (authorsToFetch.size > 0) {
      this.fetchProfiles(Array.from(authorsToFetch)).then(() => {
        // Update detail views if needed
      });
    }

    // Render highlights into article DOM
    this.highlights.forEach(h => this.renderSingleHighlightInDom(h));
  }

  async fetchProfiles(pubkeys) {
    const missing = pubkeys.filter(pk => !this.profiles.has(pk));
    if (missing.length === 0) return;

    try {
      const profileEvents = await this.pool.querySync(this.getReadRelays(this.relays), {
        kinds: [0],
        authors: missing
      });
      for (const ev of profileEvents) {
        try {
          const data = JSON.parse(ev.content);
          this.profiles.set(ev.pubkey, data);
        } catch {}
      }
    } catch (err) {
      console.warn('Error fetching profiles in highlights:', err);
    }
  }

  renderSingleHighlightInDom(highlightEvent) {
    const textToFind = highlightEvent.content.trim();
    if (!textToFind || textToFind.length < 3) return;

    // Search text nodes inside this.bodyEl
    const walker = document.createTreeWalker(
      this.bodyEl,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          if (node.parentElement?.closest('#nostr-comments, .nostr-id, .toc, .post-tags, script, style')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentElement?.tagName === 'MARK' && node.parentElement.classList.contains('nh-highlight')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      const nodeText = node.textContent;
      const index = nodeText.indexOf(textToFind);
      if (index !== -1) {
        const mark = document.createElement('mark');
        mark.className = 'nh-highlight';
        mark.setAttribute('data-highlight-id', highlightEvent.id);
        mark.textContent = textToFind;

        const before = document.createTextNode(nodeText.substring(0, index));
        const after = document.createTextNode(nodeText.substring(index + textToFind.length));

        const parent = node.parentNode;
        parent.insertBefore(before, node);
        parent.insertBefore(mark, node);
        parent.insertBefore(after, node);
        parent.removeChild(node);

        mark.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showDetailPopover(mark, highlightEvent);
        });

        break;
      }
    }
  }

  showDetailPopover(targetEl, highlightEvent) {
    this.hideDetailPopover();

    const profile = this.profiles.get(highlightEvent.pubkey) || {};
    const name = profile.display_name || profile.name || shortenKey(highlightEvent.pubkey);
    const avatar = profile.picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${highlightEvent.pubkey}`;
    const commentTag = highlightEvent.tags.find(t => t[0] === 'comment');
    const comment = commentTag ? commentTag[1] : null;
    const dateStr = formatRelativeTime(highlightEvent.created_at);
    let npub = '';
    let nevent = '';
    try {
      npub = nip19.npubEncode(highlightEvent.pubkey);
      nevent = nip19.neventEncode({ id: highlightEvent.id, relays: this.rootInfo?.relays || [] });
    } catch {}

    const popover = document.createElement('div');
    popover.className = 'nh-detail-popover';
    popover.innerHTML = `
      <div class="nh-detail-header">
        <a class="nh-detail-author" href="https://njump.me/${npub || highlightEvent.pubkey}" target="_blank" rel="noopener noreferrer">
          <img class="nh-detail-avatar" src="${escapeHtml(avatar)}" onerror="this.src='https://api.dicebear.com/7.x/identicon/svg?seed=${highlightEvent.pubkey}'" />
          <span>${escapeHtml(name)}</span>
        </a>
        <span class="nh-detail-time">${dateStr}</span>
      </div>
      ${comment ? `<div class="nh-detail-comment">${escapeHtml(comment)}</div>` : ''}
      <div class="nh-detail-footer">
        <span style="opacity:0.7;">Highlighted on Nostr</span>
        <a class="nh-detail-link" href="https://njump.me/${nevent || highlightEvent.id}" target="_blank" rel="noopener noreferrer">
          View on njump &rarr;
        </a>
      </div>
    `;

    document.body.appendChild(popover);
    this.activeDetailPopover = popover;

    // Position popover relative to highlight element
    const rect = targetEl.getBoundingClientRect();
    const popoverWidth = 280;
    let left = rect.left + (rect.width / 2) - (popoverWidth / 2) + window.scrollX;
    let top = rect.bottom + 8 + window.scrollY;

    if (left < 10) left = 10;
    if (left + popoverWidth > window.innerWidth - 10) {
      left = window.innerWidth - popoverWidth - 10;
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    requestAnimationFrame(() => popover.classList.add('visible'));
  }

  hideDetailPopover() {
    if (this.activeDetailPopover) {
      this.activeDetailPopover.remove();
      this.activeDetailPopover = null;
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.nostrHighlights = new NostrHighlightsApp();
});
