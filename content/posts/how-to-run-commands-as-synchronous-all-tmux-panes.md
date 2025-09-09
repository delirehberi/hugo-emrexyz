---
title: How to run commands as synchronous all tmux panes
description: null
date: '2019-07-03T20:00:00-04:00'
draft: false
tags: tmux
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqgqs6sln2wj6xlpt24gyxx2refh9eph6e40392qktwemr6mka8p9x50ep7xk
---


You can run the same command in all active Tmux panes at the same time. 

You need to activate command mode in Tmux with Ctrl+B keys and update `synchronize-panes` setting to on.

`:setw synchronize-panes on`

To disable it, set as off.

`:setw synchronize-panes off`


You can toggle synchronize-panes setting without use on-off parameters.

`:setw synchronize-panes`

