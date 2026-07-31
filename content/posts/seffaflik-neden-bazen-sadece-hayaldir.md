---
title: Şeffaflık Neden Bazen Sadece Bir Hayaldir?
date: '2026-07-31T11:45:38-04:00'
slug: seffaflik-neden-bazen-sadece-hayaldir
tags: []
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsr5jfczkzr68ufdzvfsyqvafpc5qj7nxlz2vavxymmql27hs72y5csx6zpp
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
