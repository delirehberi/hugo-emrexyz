---
title: How to use voter capabilities with workflow in symfony
lang: en
categories:
  - Tech
description: null
date: '2020-01-15T19:00:00-05:00'
draft: false
tags: symfony
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqxe5x7aedw3hj6atnv5khvmm5v4ez6cmpwpsky6tvd96xjetn94mkjarg94mk7untvekx7aedd9hz6umed4nx7mnel84tjg
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

