---
title: Get current file path in vim
description: null
date: '2019-07-08T20:00:00-04:00'
draft: false
tags: tips
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsza8fv8v75380hv09jsnjlyyjw40lgemtuqe4kjkhadp287zm7n4qp263yd
type: yaml
---


You can get file path in vim with % (percent) symbol. Sometimes you need to run a command with the current file path, for example `git add filepath` or `sh filepath`.

You can add the current file to git with this command in vim: 

`:!git add %`

or you can run any file with this command:

`:!%:p`

For example, you write a bash script and saved it. But you don't want to close vim or you don't want to go to another terminal screen. Just you need to write `:!%:p` and vim run the file for you.

