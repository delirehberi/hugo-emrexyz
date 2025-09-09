---
title: Mysterious php errors
description: null
date: '2019-07-03T20:00:00-04:00'
draft: false
tags: errors
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsw7gzlma0cmqqt50ghz4td4s433m65scqrqcgk5tdwep502v83lsgdfm8vg
type: yaml
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

