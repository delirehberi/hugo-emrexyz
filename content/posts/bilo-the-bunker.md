---
title: Bilo the Bunker!
date: '2026-08-13T19:32:11-04:00'
slug: bilo-the-bunker
tags: []
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsqx5agc5jfjp56wn7sxwu99l9c743q2zsqcr9tdqwekjajlvpqk7qx67luw
---
I have been using Nostr for a long time and always use a browser extension to log in to Nostr-supported apps. I believe it's the most secure way to use Nostr because it never exposes the `nsec` to clients. Instead, it injects `window.nostr`, and all clients use it to sign events.

However, automated apps sometimes require signing access, and naturally, it is not easy to trust applications with your `nsec`. To solve this, there is NIP-46 Remote Signing.

I am currently using `nak` via Docker on my Raspberry Pi, but it is not easy to use. `nak` is a large tool that supports many things at once and lacks a UI. It simply generates a bunker URI and shows it in the logs, which is neither usable nor user-friendly.

Because of this, I decided to build a web tool. My first attempt was on Cloudflare, but unfortunately, Durable Objects are not sufficient to handle always-listening WebSockets. I then changed my approach, removed the entire Cloudflare tech stack, and now it is working in a single Docker image.

**Bilo Bunker** is a stateful, multi-tenant Nostr remote signing service (NIP-46). It enables users to keep their Nostr private keys securely stored while responding to remote signing requests from authorized Nostr clients across Nostr relays.

- **Backend Application Engine (Hono + Node.js):** Handles NIP-46 RPC signing commands, NIP-05 profile verification, and SQLite persistent storage.
- **Auto-SSL Reverse Proxy (Caddy 2):** Provisions and auto-renews Let's Encrypt / ZeroSSL TLS certificates for your domain out of the box.
- **TailAdmin React UI SPA:** Modern dashboard allowing users to log in with NIP-07 (`window.nostr`), view active `bunker://` URIs, revoke client permissions, and audit real-time RPC logs.

It's ready to use on [GitHub](https://github.com/workouse/bilo-bunker). I'd love to get some feedback, and don't forget, it's still a work in progress. Let me know if you find any issues or bugs. And for the AI haters, this tool was developed using agentic AI tools. So, the UI is TailAdmin and might look like AI slop. Still, you can trust it because it was carefully architected and reviewed by me.
