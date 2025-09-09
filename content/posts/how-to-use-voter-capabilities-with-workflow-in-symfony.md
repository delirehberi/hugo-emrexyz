---
title: How to use voter capabilities with workflow in symfony
description: null
date: '2020-01-15T19:00:00-05:00'
draft: false
tags: symfony
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsvspgxxfs62x3fkgc6mtgtjzmwcsu4c7t5gtup4v3zctppep3nrkgc0yuzt
type: yaml
---


You need to use a [Voter](https://symfony.com/doc/current/security/voters.html) for workflow entity for managing access policies when you use the [Workflow component](https://symfony.com/doc/current/components/workflow.html). Workflow component supports access policies with guard option, but the documentation won't point out how to get the subject variable for a voter class.
<!--more-->
I faced this situation when I was developing a feature for my last customer. I needed to dig into the workflow component`s code. I found out the class that getting guard config, parsing with expression language, and creating transaction blocker. 

This class is evaluating expression with some variables. 

```php
$variables = [
            'token' => $token,
            'user' => $token->getUser(),
            'subject' => $event->getSubject(),
            'roles' => $roles,
            'role_names' => $roleNames,
            // needed for the is_granted expression function
            'auth_checker' => $this->authorizationChecker,
            // needed for the is_* expression function
            'trust_resolver' => $this->trustResolver,
            // needed for the is_valid expression function
            'validator' => $this->validator,
        ];
```
This is our solution, you can use these variables for writing your expression to workflow guard. I needed subject variable and I used to this in transaction configuration:

```yaml
        to_rejected:
          guard: "is_granted('reject',subject)"
          from: draft
          to: rejected
```

Now I can use my voter class with full capabilities.

