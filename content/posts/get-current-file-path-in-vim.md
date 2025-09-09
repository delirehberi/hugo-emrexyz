---
title: Get current file path in vim
description: null
date: '2019-07-08T20:00:00-04:00'
draft: false
tags: tips
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqgpwn5krk02gnhmk8jegfe0jzf82hl5va47qv6mftt7ks4rlpdlf6skc3xt9
---


You can get file path in vim with % (percent) symbol. Sometimes you need to run a command with the current file path, for example `git add filepath` or `sh filepath`.

You can add the current file to git with this command in vim: 

`:!git add %`

or you can run any file with this command:

`:!%:p`

For example, you write a bash script and saved it. But you don't want to close vim or you don't want to go to another terminal screen. Just you need to write `:!%:p` and vim run the file for you.

