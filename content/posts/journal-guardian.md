---
title: Journal Guardian
lang: en
categories:
  - Tech
description: A tool to watch system logs for errors and find solutions with AI
date: '2026-01-07T05:11:29-05:00'
tags: []
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpqmkzd3e8ymnxeqc9rl9q
---
I like to watch my local and server logs to catch any errors caused by background tasks from time to time. With this motivation, I’ve decided to create a tool.

Journal Guardian just follows the Journald service, and it tries to find a solution when it catches an error by getting help from an LLM.

It's easy to install and use for Linux and macOS. I used Go as the language and Nix as the build tool.

[Journal Guardian](https://github.com/delirehberi/journal-guardian) can be found on my GitHub. Just download the released executable and run it for macOS, or download the deb/rpm/arch packages to install.

All contributions are welcome.
