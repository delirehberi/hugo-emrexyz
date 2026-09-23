+++
title = "Smarty Modifier Yapısı"
lang = "tr"
categories = ["Yazılım"]
date = "2013-10-14T14:40:43-04:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqzeek6ctjw3uj6mt0v35kv6t9wgkhjctsd9ekj600zuu"
+++

Selamlar,

Smarty tema motoru ile ilgili bu anlatıda smarty modifier mantığını ve nasıl yapıldığını anlatmaya çalışıyorum.

####Smarty Modifier Nedir ?####

Smarty tema motoru ile kullanılan, basit php işlemlerini yapmayı sağlayan fonksiyonlardır.

Modifier denen fonksiyonlar smarty ile tpl dosyaların içinde çok basitce \| (pipe) işaretiyle kullanılabilir. Örneğin bir integer değişkeni 2 ile çarpmak için yazılan bir modifier kullanılırken {$deger\|carpma:2} şeklinde basit bir yöntem uygulanabilir. $deger diye belirtilen değişkenin 4 olduğunu düşünürsek, hemen yanına \| (pipe) ile iliştirilmiş olan modifier adına göre -ki burada carpma adında bir modifier kullandık- işleme tabi tutar. $deger adlı değişken modifier’a ilk parametre olarak gider. Modifier adından sonra iki nokta ile belirtilen değişken ise ikinci parametre olarak modifier’a gönderilir. İki nokta işaretlerini kullanarak istenildiği kadar değer gönderilip, modifier üzerinden yakalanabilir.

Örnek olarak yazmak gerekirse :


```php 
<?php
function smarty_modifier_carpma($deger,$carpilacak_sayi) {
	$sonuc = $deger*$carpilacak_sayi;
	return $sonuc;
}

```

Görüldüğü gibi fazlasıyla basit. Dikkat edilmesi gereken tek şey, modifier’ı tanımlarken yazım kuralına dikkat edip, smarty_modifier_modifieradi şeklinde isimlendirmektir. Bir diğer dikkat edilecek husus ise istenen değeri yazdırmayarak return etmek gerektiğidir.

Modifierları nasıl smarty’ye dahil edeceğinize daha sonra değineceğim. Eğer isterseniz şuraya göz atabilirsiniz.
