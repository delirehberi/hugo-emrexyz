---
title: Nix integration for stack
lang: en
categories:
  - Tech
description: null
date: '2020-02-24T19:00:00-05:00'
draft: false
tags: nix
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqr9hxj7pdd9h8get8wfshg6t0dckkvmmj94ehgctrdv3va5y8
---


You might want to build your Haskell application with #Nix even if you did start with #Stack.

#Stack has support for building with #Nix. You need to add nix.enable: true to your stack.yaml file.
<!--more-->
```yaml
nix:
  enable: true
  packages: [glpk, pcre]
```

You can build your app with Nix now. Also, you can specify a custom shell file for defining environment variables or anything else. You need to remove the `packages` parameter and to add the `shell-file` parameter to `stack.yaml` file.

```yaml
nix:
  enable: true
  shell-file: shell.nix 
```

After that, you can write your shell.nix file. 

```nix
{ghc}:
with (import <nixpkgs> {});
 
haskell.lib.buildStackProject {
    inherit ghc;
    name = "ScottyEnv";
    buildInputs = [pkgs.figlet zlib.dev zlib.out glpk pcre];
    shellHook = ''
    export PORT=3003;
    figlet "LISTENING ON PORT "$PORT;
    '';
}
```

And then, just run `stack build` or `stack run` or `stack ghci` commands.

