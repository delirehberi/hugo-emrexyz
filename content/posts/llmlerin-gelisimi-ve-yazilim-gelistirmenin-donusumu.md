---
title: LLM’lerin Geleceği ve Yazılım Geliştirmenin Dönüşümü
lang: tr
categories:
  - Yazılım
description: 'LLM''lerin gelecegi uzerine ongoruler. '
date: '2025-12-11T09:08:03-05:00'
tags: []
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpp3nzcekxsmk2wgfgu0sw
---
Son birkaç yılda büyük dil modelleri (LLM’ler), yazılım geliştirme süreçlerini dramatik biçimde dönüştürmeye başladı. Kod tamamlama araçlarından otonom ajanlara, statik analizden güvenli sandbox ortamlarına kadar birçok yeni konsept artık günlük konuşmalarımızın parçası. Fakat bu dönüşüm aynı zamanda yeni sorular, yeni darboğazlar ve beklenmedik zorluklar da getiriyor.

Bu yazıda hem kendi deneyimlerimden hem de toplulukta farklı ortamlarda yapılan tartışmalardan yola çıkarak; LLM’lerin yazılım geliştirmede bugün nerede durduğunu ve gelecekte bizi nelerin beklediğini anlatmaya çalışacağım. Bunun için tabi ki yine Enis'le yaptığımız bir konuşmadan yola çıktım. 

Bu konuda 13 Aralık Cumartesi günü DevFest İzmir içerisinde de konuşacağım, vakti olanı beklerim. 


## Bugünkü LLM’ler: Çok iyi kod üretir, çok kötü karar verir

Herkesin ortak deneyimi şu:  

Bugünün modelleri, **yeni bir proje açtığınızda** müthiş bir üretkenlikle 1000 satır kod döktürebiliyor. Temiz sayfa, bilinen desenler, internette gördüğü milyonlarca örnek… Hepsi birleşince ilk taslak şaşırtıcı derecede iyi oluyor.

Ama proje ilerledikçe tablo değişiyor.

- Model, 1 satırlık basit bir input formatı hatasını **günlerce yakalayamıyor**.
    
- Doküman orada duruyor ama ona “bakması gerektiğini” **kendiliğinden anlayamıyor**.
    
- Hatta bazen çıkmaza girip A yöntemini deniyor → olmuyor → B yöntemini deniyor → o da olmuyor → ardından tekrar A’ya dönüyor.
    
- Kodu ezbere yazdığı için yeni bağlamda yaratıcı düşünmesi gerekirken “bildiğini” tekrar etmeye başlıyor.
    

Kısacası:  
**LLM çok kod yazar, ama neden yazdığını bilmez.**

Bugün elimizdeki modeller hâlâ istatistiksel örüntü makineleri.  

Reasoning var ama sınırlı; çoğu zaman “bu noktada durup dokümana bakmam gerekiyor” diye düşünecek bir öz bilinçleri yok.

Bu yüzden kod yazarken çoğu geliştirici kendini şu rolde buluyor:

> “Agent çalışıyor… ama 30 saniyede bir saçma bir şeyi bana soruyor. Kod yazmıyorum, bebek bakıyorum.”

Yakın gelecekte değişmesi gereken ilk şey işte bu.


## Secure Mode ve Sandbox: Asıl devrim burada olacak

Bugün birçok araç “secure mode” gibi özellikler eklemeye başladı.  
Ama bunlar hâlâ çok kısıtlı ve fazla interaktif. Her şeyi kullanıcıya soruyor; sonuçta işinizi kolaylaştırmıyor, zorlaştırıyor.

Oysa geliştiricilerin ihtiyacı çok net:

**LLM'e kendi başına takılabileceği izole bir çalışma ortamı vermek.**

- Kodu yazacak
    
- Derleyecek
    
- Testleri çalıştıracak
    
- Loglara bakacak
    
- Dokümana göz atacak
    
- StackOverflow/Docs tarzı bilgi tabanlarına danışacak
    
- Gerekirse 3 ayrı yöntem deneyip hangisinin işe yaradığını kendi kendine görecek
    

Ve tüm bunları bize sormadan yapacak.

Bir nevi “çalışan bir junior developer” gibi.

> “Ben yemeğe çıkıyorum, bu Haskell projesini haskell.nix ile derle.  
> 20 dakika dene. Olmuyorsa raporla.”

Bunun önündeki tek engel “güvenlik”.  
LLM’i internete, sisteme, dosyalara bağlamak riskli olduğu için şirketler ve ürünler aşırı temkinli davranıyor.

Ama **güvenli sandbox** konsepti olgunlaştığında – ki bu çok yakın – LLM’lerin verimliliği bugünle kıyaslanamayacak kadar artacak.



## Python’da Mükemmel, Haskell’de Şaşkın Olmasının Sebebi: Eğitim Verisi

Bugün modeller Python’da harikalar yaratıyor, çünkü Python’a dair devasa bir eğitim külliyatı var.  
Buna literatürde “Python Bias” bile deniyor.

Ama Haskell?  
Az proje, küçük ekosistem, daha soyut yapılar, tür sistemi derinliği…

LLM’in aklı doğal olarak buralarda çok daha çabuk karışıyor.

Bu yüzden gelecekte en kritik ilerlemelerden biri **dil ve ekosistem bazlı fine-tuning** olacak.  
Örneğin:

- “Haskell için optimize edilmiş LLM”
    
- “Rust için eğitimli ajan”
    
- “Nix ekosistemi için kendi kendine düzeltme yapabilen model”
    

Bugün genel modellerle elde edemediğimiz güvenilirliği ancak böyle sağlayabileceğiz.



## Sonuç: LLM devrimi başladı ama daha yolun ilk metresindeyiz

Bugünün modelleri, bazen 1000 satır kodu 1 dakikada yazıp tek satırlık bir input hatasını 1 saatte çözemeyen tuhaf yaratıklar.

Ama doğru ortamları, doğru araçları ve doğru güvenlik katmanlarını sağladığımızda; yazılım geliştirmenin doğası gerçekten dönüşecek.

- Kod yazmak bitmeyecek.
    
- Ama çalışmanın şekli, ritmi ve üretkenliği tamamen değişecek.
    

Ve bu dönüşümün merkezinde hâlâ insan olacak:  
Tasarım yapan, doğrulayan, yöneten, vizyon koyan.

LLM’ler ise çok güçlü, çok hızlı, ama hâlâ oldukça saf birer yardımcı olarak yanımızda yer alacak.
