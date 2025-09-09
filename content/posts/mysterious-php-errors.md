---
title: Mysterious php errors
description: null
date: '2019-07-03T20:00:00-04:00'
draft: false
tags: errors
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqg80yp0a7hudsq9685t324k6c2ccaa2gvqpsvyt29khvs684xrclcydhqlvn
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

