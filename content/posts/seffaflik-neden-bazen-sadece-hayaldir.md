---
title: Şeffaflık Neden Bazen Sadece Bir Hayaldir?
lang: tr
categories:
  - Yaşam
date: '2026-07-31T11:45:38-04:00'
slug: seffaflik-neden-bazen-sadece-hayaldir
tags: []
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpquxyvpkvyck2eg8r3f9t
---
Geçen gün davaları takip ederken aklımda beliren güzel bir proje vardı. Türkiye'de süregelen siyasi davaların veritabanı.  

Aslında teknik olarak her şeyi kurguladım. Mimarisinden veritabanına, sansüre karşı alınacak önlemlere kadar her detay hazırdı. Ama klavyenin başına geçtiğimde hissettiğim o ağır yorgunluk ve "Buna gerçekten değecek mi?" sorusu beni durdurdu.

Bu yazı, hayata geçiremediğim bir "açık veri" projesinin ve onu neden yapamadığımın kısa bir hikayesi.

## Dijital Bir Hafıza Odası

Planım basitti ama bir o kadar da iddialıydı: Son 20 yılda siyasiler hakkında yürütülen soruşturmaları, açılan davaları ve hukuki süreçleri tek bir çatı altında toplayan açık kaynaklı bir veritabanı kurmak.
Güzel bir arayüz, düzgün bir api. Hem gazetecilerin hem de halkın sorgulamaları daha iyi değerlendirebileceği, takip edebileceği bir platform. 

Amacım kimseyi yargılamak veya hedef göstermek değildi tabi ki. Sadece karmaşık haber akışları arasında kaybolan bilgileri derlemek, kategorize etmek ve sıradan vatandaşın "Kim, ne zaman, hangi suçlamayla karşılaştı ve sonuç ne oldu?" sorusuna tarafsız bir yanıt bulabilmesini sağlamaktı. İnsanların dışarıdan veri ekleyebildiği, ancak bu verilerin bağımsız kaynaklarla (haber ajansları, mahkeme kararları) teyit edildikten sonra yayına alındığı dinamik bir platform hayal ettim.

## Sansüre Direnen Bir Mimari

Teknik olarak projeyi oldukça modern ve yıkılmaz bir altyapı üzerine kurmayı planlamıştım. Hızlı ve güvenli bir sunucu mimarisi hazırlayacak, kullanıcı dostu bir arayüzle verileri sunacaktım.

Hatta işi bir adım ileri götürüp, engellemeleri tamamen anlamsız kılacak bir yapı tasarladım. Sitedeki her bir kayıt, aynı zamanda **Nostr** adı verilen merkeziyetsiz bir ağa da kopyalanacaktı. Yani günün birinde platforma bir erişim engeli gelse bile, veriler dünya çapındaki binlerce bağımsız sunucuya dağılmış olacağı için asla silinemeyecekti. Bu, dijital ve yok edilemez bir arşiv demekti.

## Neden Vazgeçtim?

Peki her şey bu kadar hazır ve heyecan vericiyken neden vazgeçtim? Tahmin edeceğiniz gibi içinde bulunduğumuz siyasi ve hukuki atmosferin ağırlığı yüzünden.

Böyle bir şeffaflık projesi yapmak, ne yazık ki sadece iyi niyetle yola çıkıp kod yazmakla bitmiyor:

- **Kişisel Veriler:** Haber sitelerinde boy boy yer alan kamuya mal olmuş davaları derlediğinizde bile kendinizi bir anda "kişisel verileri ihlal etmekle" suçlanırken bulabilirsiniz.
    
- **Sorumluluk Yükü:** Dışarıdan gelen bir veriyi teyit ederken gözden kaçacak ufacık bir hata, sizi iftira veya "adil yargılamayı etkilemeye teşebbüs" gibi ağır suçlamalarla baş başa bırakabilir.
    
- **Sansür Stresi:** Kurduğunuz sistem ne kadar merkeziyetsiz olursa olsun, günün sonunda hukuki tebligatların geleceği adres sizin kapınızdır.
    

> Şeffaflık adına atılan adımların, bir anda suç unsuru gibi değerlendirilebilme ihtimali, insanın yaratma hevesini temelden sarsıyor.

## Enerji Meselesi

İşin hukuki boyutu bir yana, bir de görünmeyen bir duvar var: **Mental yorgunluk.**

Böyle bir platformu yönetmek; sürekli tetikte olmayı, trollerle uğraşmayı, gelen tehditleri savuşturmayı ve bitmek bilmeyen bir stresin içine girmeyi gerektiriyor. Ülkedeki genel atmosfer zaten yeterince yorucuyken, kalan kısıtlı enerjimi böylesine riskli ve yıpratıcı bir mücadeleye harcamak istemediğimi fark ettim.

Belki bir gün iklim değişir, açık verinin ve şeffaflığın bir tehdit değil, demokrasinin gereği olarak görüldüğü zamanlar gelir. O zaman bu projeyi tozlu raflardan indirip hayata geçiririm. Ama şimdilik, bu sadece zihnimde kalacak güzel bir "sivil teknoloji" hayali.

Sağlıcakla kalın.
