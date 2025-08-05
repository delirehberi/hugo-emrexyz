+++
title = 'Sed İle Bul Değiştir'
date = 2015-08-29T14:27:21-04:00
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
