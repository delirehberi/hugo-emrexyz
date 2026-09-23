---
title: Custom LNAddress with Self-Hosted AlbyHub
lang: en
categories:
  - Tech
description: My adventure to have custom LNAddres
date: '2025-09-30T09:59:22-04:00'
tags: []
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpqcr2v3svd3kgvs8m9zhe
---
I was using [Wallet of Satoshi](https://www.walletofsatoshi.com/) at first, but then I realized it does not support [NWC](https://nwc.dev/), so I found [Alby](https://getalby.com/). It’s great, but I didn’t want to make that many payments (I’m a developer but a newbie in [Nostr](https://nostr.com), more of an explorer).

Thanks to Alby, they have an open-source [AlbyHub](https://github.com/getAlby/hub). I had a Raspberry Pi 3, so I updated it and installed AlbyHub, then connected my wallet to my Alby account.

Still, I didn’t like depending on other domains. Alby gave me the address `fallingwhimsy946296@getalby.com`—ugly, right? So I started researching how to have a custom [LN Address](https://lightningaddress.com/). Alby offers this if you buy their cloud hub, but as I mentioned, I didn’t want to spend money for this exploration.

After reading some Lightning Network documentation, I realized that LN supports [well-known URLs](https://docs.lightspark.com/lightspark-sdk/lnurls).

I then accessed Alby’s well-known URL for my account: `https://getalby.com/.well-known/lnurlp/delirehberi` and got the correct configurations for the callback setting and updated identifier.

Next, I created a `.well-known/lnurlp/delirehberi` file under the `static` folder of my Hugo blog. I’m using GitHub Pages to serve my blog. This led to two problems:

1. GitHub Pages does not set correct headers for files without an extension. I tried to solve this using a Cloudflare Worker as middleware to add the `application/json` header.  
2. My Cloudflare-GitHub setup was corrupted, affecting the proxy configuration for my root domain.

After some research, I realized the exact SSL configuration matters when using Cloudflare with GitHub Pages:

- Use **Full SSL** on Cloudflare and enable **Force HTTPS** in GitHub Pages.  
- Or use **Flexible SSL** on Cloudflare and disable **Force HTTPS** in GitHub Pages.

After making these updates, I enabled proxy configuration for my root domain and added the worker route for my Worker.

Finally, it worked like a charm: [https://emre.xyz/.well-known/lnurlp/delirehberi](https://emre.xyz/.well-known/lnurlp/delirehberi)
