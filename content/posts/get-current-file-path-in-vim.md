---
title: Get current file path in vim
lang: en
categories:
  - Tech
description: null
date: '2019-07-08T20:00:00-04:00'
draft: false
tags: tips
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqr3nk2apdvd6hyun9de6z6enfd3jj6urpw35z66tw94mxjmgclm8gm
---


You can get file path in vim with % (percent) symbol. Sometimes you need to run a command with the current file path, for example `git add filepath` or `sh filepath`.

You can add the current file to git with this command in vim: 

`:!git add %`

or you can run any file with this command:

`:!%:p`

For example, you write a bash script and saved it. But you don't want to close vim or you don't want to go to another terminal screen. Just you need to write `:!%:p` and vim run the file for you.

