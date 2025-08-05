+++
title = 'Git Reset'
date = 2014-11-16T14:33:58-04:00
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

