+++
title = "Gravatar"
lang = "tr"
categories = ["Yazılım"]
date = "2013-10-12T14:41:51-04:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqppnhyctkv96xzustn2rzf"
+++

Bilenler bilir, gravatar.com a üye olduğunuzda wordpress alt yapısına sahip tüm bloglarda ve bazı sitelerde mail adresinizden tanınırsınız ve avatarınız otomatik olarak gravatar üzerinden çekilir. Bunun nasıl yapıldığından bahsedeceğim birazcık. Gravatar’dan kullanıcınızın avatar’ını çekmek sanıldığı kadar sıkıntılı bir işlem değildir. Kullanıcınızın mail adresine sahip olmanız gravatar üzerindeki avatarını çekebilmeniz için yeterlidir.


Gravatar sistem olarak oldukça basit bir yapıda çalışır. Mail adresinizi alır ve md5 formatında bir id’ye dönüştürüp hesabınızla eşleştirir. Resim bağlantısını buna göre oluşturmanız durumunda avatarı çekmek sıkıntı olmayacaktır. Başlayalım… İlk bilmemiz gereken şey gravatarın ortak yoludur.

Şöyledir : `http://www.gravatar.com/avatar/` bu adresin sonuna mail hash’ini vermeniz size avatarı döndürecektir. `http://www.gravatar.com/avatar/e4e0baaebb52de68319ade9e0865bbb6` Bu adresteki mail hashini oluşturmak ise son derece kolaydır. Teorik olarak;

E-Posta adresindeki tüm boşlukları silin (trim)

Tüm harfleri küçük boy yapın (strtolower)

Elinizdeki temiz veriyi md5 formatına çevirin(md5)


```php
<?php
$email='test@gmail.com';
$url = 'http://www.gravatar.com/avatar/';
$hash = md5(strtolower(trim($email)));
$image = $url.$hash;
echo "<img src='{$image}'/>";
?>
```

Gördüğünüz üzere bu şekilde gravatar üzerindeki test@gmail.com üzerindeki mail adresine tanımlı avatarı çekmiş olduk. Avatar boyutu ön tanımlı olarak 80px olacaktır. Eğer avatar boyutunu değiştirmek isterseniz adres sonuna ?s= parametresine boyut vermeniz yeterlidir. http://www.gravatar.com/avatar/e4e0baaebb52de68319ade9e0865bbb6?s=40Artık 40px boyutunda bir avatar döndürülecektir. Boyut dışında 2 değer daha gönderebilirsiniz.

d değişkeni alabileceği değerler [ 404 | mm | identicon | monsterid | wavatar ]

r değişkeni alabileceği değerler [ g | pg | r | x ]

Son iki değerde aynı şekilde url üstünden gönderilebilmektedir. Gravatar’ın hakim olduğu bir dünya düşlüyorum :)

Kullanın, kullandırtın. Saygılar.
