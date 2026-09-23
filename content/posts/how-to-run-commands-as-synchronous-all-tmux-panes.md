---
title: How to run commands as synchronous all tmux panes
lang: en
categories:
  - Tech
description: null
date: '2019-07-03T20:00:00-04:00'
draft: false
tags: tmux
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqx95x7aedw3hj6un4dckkxmmdd4skuern94shxttn09hxx6rjdahx7atn94skcmpdw3kh27pdwpskuetnm2ejst
---


You can run the same command in all active Tmux panes at the same time. 

You need to activate command mode in Tmux with Ctrl+B keys and update `synchronize-panes` setting to on.

`:setw synchronize-panes on`

To disable it, set as off.

`:setw synchronize-panes off`


You can toggle synchronize-panes setting without use on-off parameters.

`:setw synchronize-panes`

