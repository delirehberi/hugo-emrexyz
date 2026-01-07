---
title: Journal Guardian
description: A tool to watch system logs for errors and find solutions with AI
date: '2026-01-07T05:11:29-05:00'
tags: []
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqs2t8xqwfysgy72yd3d545z9h3hsh3fx4pjnlvxter970w6xnyvvsgh80y2c
---
I like to watch my local and server logs to catch any errors caused by background tasks from time to time. With this motivation, I’ve decided to create a tool.

Journal Guardian just follows the Journald service, and it tries to find a solution when it catches an error by getting help from an LLM.

It's easy to install and use for Linux and macOS. I used Go as the language and Nix as the build tool.

[Journal Guardian](https://github.com/delirehberi/journal-guardian) can be found on my GitHub. Just download the released executable and run it for macOS, or download the deb/rpm/arch packages to install.

All contributions are welcome.
