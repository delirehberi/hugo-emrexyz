---
title: Mysterious php errors
lang: en
categories:
  - Tech
description: null
date: '2019-07-03T20:00:00-04:00'
draft: false
tags: errors
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqz4khjum5v4exjmm4wvkhq6rs94jhyun0wfeswm7fdx
---


Sometimes you get an error like that: 

`container extension liip_imagine not registered`

You double-checked all configurations and you are absolutely sure nothing is wrong.

But code not works, why?

Because Php can't convert `i` to `I` if os language is `tr_TR`. Your code searches Liipİmagine and can't find that.
Change os's lang code to en_US.UTF-8 for fix that.

Or add this line to .bashrc or .profile file.

`export LANG=en_US.UTF-8`

bb.

