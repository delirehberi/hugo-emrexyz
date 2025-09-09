+++
categories = ["software", "ai", "English"]
date = "2024-05-23T20:00:00-04:00"
description = "I`ve been using Copilot + ChatGPT for my daily development work for the last six months, and it has significantly accelerated my productivity. This new workflow has transformed my development journey, removing the stress of figuring out how to do things. Now, I just focus on what needs to be done."
title = "No How, Live Long What! - Experiences with AI Tools on Software Development"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqstusdtpmht9d4swr66hdmz9f9fwzrk4240vh60dydakvefs905mdgzjjx4t"
type = "toml"
+++

I've been using Copilot + ChatGPT for my daily development work for the last six months, and it has significantly accelerated my productivity. This new workflow has transformed my development journey, removing the stress of figuring out *how* to do things. Now, I just focus on *what* needs to be done.

Let me explain.

Before adopting this workflow, I used various languages to accomplish my tasks: PHP and Node.js for web development, and Go and Python for backend or CLI app development. Each language has its unique way of doing things—Haskell is a functional language, while Java is object-oriented, for example. I'm not the type of developer who is loyal to any particular language; I prefer to use the tool that best fits my requirements.

Previously, it was time-consuming to remember and find the best ways to build things in different languages. It was challenging to recall functions and algorithms, and memorizing them felt pointless. I’ve always focused more on understanding the 'whys' and the logic behind things.

Now, with Copilot, I no longer need to remember *how* to do things. For instance, if I need to extract a value from a string, I don't need to remember the exact regex or code block. I just write the function name, like:

```php
<?php
function extractVideoIdFromYoutubeEmbedCode()
```

and it happens:

```php
<?php
function extractVideoIdFromYoutubeEmbedCode($html){
    $pattern = '/<iframe\s+([^>]+)>.*?<\/iframe>/i';
    $updatedHtml = preg_replace_callback($pattern, function ($matches) {
        $attributesString = $matches[1];
        preg_match_all('/(\w+)=["\']([^"\']*)["\']/', $attributesString, $attrMatches, PREG_SET_ORDER);
        $attributes = [];
        foreach ($attrMatches as $attr) {
            $attributes[$attr[1]] = $attr[2];
        }
        $src = $attributes['src'];
        $id = explode('/',$src);
        $id = end($id);
        return $id;
    }, $html);
    return $updatedHtml;
}
```

Sometimes it suggests weird code blocks, but mostly it works well. It's like having a superpower. AI rules!

I wrote this post to encourage the use of AI tools and to dispel fears that AI will take your jobs. Really, just learn how to use AI tools efficiently and integrate them into your tool stack. You'll be safe, even against multi-agent AI tools.
