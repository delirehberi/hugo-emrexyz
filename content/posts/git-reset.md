+++
title = "Git Reset"
date = "2014-11-16T13:33:58-05:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqspxf8a2qtvmemxnepl4dua9ptdtm7emx8ce27elsd3nnqm2y8vl6g5tqh8z"
type = "toml"
+++

Git üzerinde çalışıyorsunuz. Herşey müthiş. Kod yazılıyor, commitler, pushlar. Ooo süper dimi ?

Herşey güzel giderken yanlış bir commit yaptığınızı farkettiniz. Örneğin upload klasörünü repoya eklediniz ( neredeyse 100MB :s ) sonrada commit ettiniz. Git rm yapsanız bile repoya yapıştı lanet şey.

Ne yapacaksınız ?

Yerel depoyu silip sunucudan temiz halini çekebilirsiniz tabi. Peki ya gönderilmeyen son değişiklikler ?

Kodu kopyalayın bence, sonra çekin temiz repoyu, tekrar yapıştırın falan. Çözersiniz bi şekilde...

Ya da...

Git reset diye birşeyin olduğundan haberiniz olsun. Evet `git reset` komutu bu işe yarıyor. Yaptığınız bir yanlışı düzeltmek için git reset'i kullanabilirsiniz.

Git reset'in kullanımına [Git Dökümanından](http://git-scm.com/docs/git-reset) ulaşabilirsiniz. Gayet basittir. Orada yazanların dışında, reset içinde kullanmak için hangi HEAD e geri döneceğinize `git reflog` komutu ile karar verebilirsiniz. Yerel depoda yapılan tüm işlemler sıralı olarak orada bulunur.

Git reset'i kullanarak reponuzu temiz tutmuş olursunuz.


`Stay Clear`

`git reset --hard HEAD{2}`

`:*`
