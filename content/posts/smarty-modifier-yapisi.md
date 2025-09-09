+++
title = "Smarty Modifier Yapısı"
date = "2013-10-14T14:40:43-04:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqgxxexvnluhz4lq0ewhy0mm08jucu24rtng2qer5vzzuuy99mcekegnpram0"
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
