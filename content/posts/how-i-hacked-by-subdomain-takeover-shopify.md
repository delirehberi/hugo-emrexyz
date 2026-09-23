---
title: How I've been hacked by Subdomain Takeover - Shopify
lang: en
categories:
  - Tech
date: 2026-08-05T22:43:09.000Z
slug: how-i-hacked-by-subdomain-takeover-shopify
draft: false
tags: []
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpp3xvctpvenxgwgfn4gs5
---
**Disclaimer:** _While I’m discussing how Shopify could implement better safeguards against this, I fully acknowledge that keeping my DNS clean and removing unused subdomains is ultimately my own responsibility._

A stray DNS record from a project I shut down two years ago came back to bite me this week.

Out of nowhere, I got a Google Search Console alert letting me know an unknown user (`******@gmail.com`) had been verified as a new owner for one of my subdomains: `electrouse.workouse.com`.

Since all my domains are managed through Cloudflare, I immediately dug into my DNS records to figure out how someone else managed to verify ownership of my site.

Here is what went down:

- **The Stale CNAME:** Two years ago, I used this subdomain for a Shopify test store. When I closed the store, I forgot to clean up my DNS, leaving a `CNAME` record pointing straight to Shopify’s servers (`shops.myshopify.com`).
- **The Takeover:** Shopify recycled the routing. An attacker created a fresh Shopify store, claimed `electrouse.workouse.com` as their custom domain, and Shopify accepted it because the Cloudflare DNS record was still active and pointing right at them.
- **The GSC Claim:** Control of the store gave them full access to inject a Google site verification tag into their theme, instantly making them a verified property owner in Search Console.

### Why Doesn't Shopify Protect Against This?

You would expect a platform as massive as Shopify to require explicit proof of ownership—like a unique TXT record in your DNS settings—before attaching any custom domain to a new account.

Instead, Shopify’s setup process only checks for basic DNS resolution. It queries the web to see if `electrouse.workouse.com` points to `shops.myshopify.com`. Because my dangling CNAME record was still active in Cloudflare, Shopify's system assumed, _"The DNS is pointing to us, so the owner must have set it up,"_ and automatically approved the attachment without asking for a fresh TXT token.

While Shopify _does_ require TXT record verification when transferring an active domain between two _live_ Shopify stores, it completely skips this check if a domain was unlinked from a canceled account.

If a domain has been used by anyone else before, platforms should always force a unique verification code via TXT record (e.g., `shopify-verification=xyz123`) before accepting a new user for that domain. Relying solely on a static CNAME target invites subdomain takeovers by design.

### The Fix

It took less than a minute to resolve once identified. I logged into Cloudflare, navigated to my DNS records, and permanently deleted the orphaned `CNAME` record.

Deleting the record immediately cut off the attacker's connection to my subdomain, broke their Search Console verification, and shut down the hijack.

If you have old, abandoned projects lying around, check your DNS records today and delete any dangling `CNAME` points before someone else claims them.
