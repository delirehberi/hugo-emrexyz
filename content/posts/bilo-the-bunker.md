---
title: Bilo the Bunker!
lang: en
categories:
  - Tech
date: '2026-08-13T19:32:11-04:00'
slug: bilo-the-bunker
tags: []
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpqmrwdryv5mn2wgds6v3u
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
