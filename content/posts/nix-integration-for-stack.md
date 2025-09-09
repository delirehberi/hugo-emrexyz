---
title: Nix integration for stack
description: null
date: '2020-02-24T19:00:00-05:00'
draft: false
tags: nix
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqs076v3ljz50hnnt7s6cytk97v7lvakjarkrg7jyk5mrdzqvpxw3rgxqz2vs
type: yaml
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

