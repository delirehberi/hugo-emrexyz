+++
title = "Git Reset"
lang = "tr"
categories = ["Yazılım"]
date = "2014-11-16T13:33:58-05:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqp9nkjapdwfjhxet53dzfvd"
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
