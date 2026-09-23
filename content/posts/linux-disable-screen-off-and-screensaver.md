---
title: Disabling Screen Off and Screensaver on Debian / Linux
lang: en
categories:
  - Tech
description: null
date: '2024-07-24T20:00:00-04:00'
draft: false
tags: en
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusq9pkxjmn40qkkg6tnv93xcefdwd3hyet9dckk7enx94skuepdwd3hyet9deekzan9wga97zw0
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
