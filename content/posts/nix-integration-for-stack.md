---
title: Nix integration for stack
description: null
date: '2020-02-24T19:00:00-05:00'
draft: false
tags: nix
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqg8ldxglep28mee4lgdvz9mzlx00kwmfw3mp50fzt2d3k3qxqn8g35ga296s
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

