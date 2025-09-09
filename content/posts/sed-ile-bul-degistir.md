+++
title = "Sed İle Bul Değiştir"
date = "2015-08-29T14:27:21-04:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqs89cpvn624xklk9amu8235g2g2j2vuyjq9np8hymmzwvy33qy0hfq5xq3q8"
type = "toml"
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
