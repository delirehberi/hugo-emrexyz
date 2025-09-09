---
title: Disabling Screen Off and Screensaver on Debian / Linux
description: null
date: '2024-07-24T20:00:00-04:00'
draft: false
tags: en
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqs0x9s2gk33w5nvq4x8uczcdnhft6sa5lwl8vstut554z6xu9zgz2ce2ujam
---

If you're using a Linux system and want to prevent your screen from turning off or your screensaver from activating, you can use the `xset` command to adjust your Display Power Management Signaling (DPMS) settings and screensaver settings. Here’s how you can do it:
<!--more-->

## Disable DPMS Settings

DPMS controls power-saving features such as standby, suspend, and off. To disable these features, run the following command:

```sh
xset -dpms
```

Alternatively, you can set each DPMS setting to zero, which effectively disables them:

```sh
xset dpms 0 0 0
```

## Disable the Screensaver

To disable the screensaver, you can use the `xset s` command. Setting the timeout to `0` will turn off the screensaver completely:

```sh
xset s off
```

Or you can set the screensaver timeout to `0`:

```sh
xset s 0 0
```

## Verify Your Settings

After running these commands, you can verify the changes by executing:

```sh
xset q
```

This will display your current settings, allowing you to confirm that DPMS and the screensaver are disabled.

By using these commands, you can ensure that your screen remains on and your screensaver does not activate, providing an uninterrupted experience on your Linux system.
