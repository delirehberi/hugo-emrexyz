+++
title = "Php Heredoc Sozdizimi"
date = "2013-09-30T14:42:46-04:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsvhsrcnpzzfmwwaq6h3pwzr7he7x7pny7m08quw9v4gt8v6etnq5gjakt49"
type = "toml"
+++

PHP de karakter katarlarının kullanımında bilinen şekilde kullanılan 2 tür metin barındırma yöntemi mevcuttur.



```php
<?php
$degisken = “Değişken”;
$metin = “Çift tırnak içerisinde $degisken gönderilebilir.”;
$yeni_metin = ‘Tek tırnak $degisken tarzında tanımlamaları desteklemez.”;
```

2 Şekilde kullanım en yaygın kullanımdır. Tüm işlerimizi aslında görmeye yetecek olan bir yöntemdir bunlar. Lakin bazı durumlarda çift tırnak (“) yada tek tırnak (‘) ihtiyacımız çok olur. Bu durumda kaçış karakteri () kullanmamız gerekir. Eğer bunun başka tür bir çözümünü arıyorsanız HereDoc sözdizimi çok satırlı karakter katarlarında imdadınıza yetişecektir.
HereDoc sözdizimi «< karakterleri ile başlar. Herhangi bir karakter katarı eklenir başlangıç mahiyetinde. Alt satırdan itibaren de metnimiz girilir. Son satıra ise «< karakterlerinden sonra girdiğimiz karakter katarı girilip noktalı virgül ile bitirilir.

```php
<?php
$isim = "Emre";
$metin = <<<son
Metnimiz istediği kadar uzun olabilir
HTML karakterleri içerebilir. İsim = $isim şeklinde değişkenler barındılarabilir
Kaç satır yazarsak yazalım PHP yukarıda belirttiğimiz karakter katarını görene kadar
burayı metin olarak okuyacaktır.
Aynı zamanda bu metin içerisinde tek tırnak içerisinde kullanırken sıkıntı oluşturan
kaçış karakterleri de kullanılabilir.
SON;
echo $metin;
```

Dikkat etmeniz gereken iki husus. HereDoc başlangıç kısmında kullandığınız kelimenin sadece son da kullanılması gerektiği ve kesinlikle bir tab dahi boşluk bulunmaması gerektiğidir. Yani ;

```php 
<?php
$metin = <<<bitis
testasdasd
    bitis;
```
Şeklinde bir çalıştırma sonunda  `Parse error: syntax error, unexpected $end in **** ` şeklinde bir hata almanız kaçınılmazdır. Bitiş karakterinin tabsız olarak yazılmış olması gerekmektedir.

Not: Bu kullanım PHP 4 den önceki sürümlerde çalışmaz !
