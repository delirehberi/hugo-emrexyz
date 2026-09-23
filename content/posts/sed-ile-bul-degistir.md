+++
title = "Sed İle Bul Değiştir"
lang = "tr"
categories = ["Yazılım"]
date = "2015-08-29T14:27:21-04:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqz3ek2epdd9kx2ttzw4kz6er9va5hxarfwgdmlq5w"
+++

Bu akşam büyük boyutlu bir veritabanında bul ve değiştir yapmam gerekti. Bi kaç sefer benzer dosyalarda değişiklik yapmak için sublime ile açıp, yüklenmesini bekliyordum 5-10dk civarı. Ara-Bul işlemi sırasında da baya bi sıkıntı yaşıyordum.


Sonra dedim ki:

 - Hey adamım bu lanet olasıca işlem için neden sed kullanmıyorsun ?


Kullandım rahatladım.


Sed bir *S*tream *Ed*itor. Ben büyük bir veritabanı çıktısında veri değiştirmek için aşağıdaki şekilde kullandım. Tabi tek amacı bu değil.  Sed'i elinizdeki veriyi düzenlemek için kullanabilirsiniz.


Bul ve değiştir işlemi şöyle oluyor efenim;

```bash
   sed -i 's/(regex)/g' dosya.sql
```

altnot:

	s: substitution - değiştir
	g: global - dosyanın heryerinde

Mac için i parametresi farklı bir amaç güdüyor. Bunun yerine E parametresiyle dosyayı verin, i parametresi ise yedek dosyanızı alsın.
```bash
   sed -i _bak -E 's/echo/print/g' ~/command.md
```
