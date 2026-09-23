+++
title = "Php İle Dosya Bazlı Önbellekleme"
lang = "tr"
categories = ["Yazılım"]
date = "2013-10-20T14:38:32-04:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqypcxsupdd9kx2ttydaehjcfdvfsh5mrf94hkucn9d3kx26mvv4kk2ggjk9y"
+++

Selamlar,

Basit bir şekilde dosya bazlı önbelleklemeden bahsedeceğim. Eğer salt php kullanmıyorsanız bu işlem için smarty,zend,codeigniter vb şeylerin çok güzel özellikleri var. Ancak php’yi yazarım ben sadece diyorsanız, nasıl html cache yapacağınıza değinelim.

Uygulayacağımız mantık çok basit.

* Girilen adresi öğren
* Girilen adresi md5 e çevir md5(iletisim)
* Dosyalarına bir bak bakalım bu isimde bir dosya var mı ?
* Yok diyorsun madem hemen ob_start diyerek işlemleri not etmeye başla.
* Not ettiğin içeriği bir değişkene atayıp oradan da md5lenmiş ismi olan bir dosyaya yaz.
* Sonrasında içeriği göster.
* Sayfayı yenile
* 1. adıma kadar geldin baktın aynı isimde dosya var.
* O halde zamanı bir kontrol et bakalım ne zaman oluşturulmuş.
* Çok eski bir dosya diyorsan 4 adıma git.
* Dosyamız gayet yeni ise file_get_contents yapıp içeriği alalım.
* Ekrana basıp exit komutunu verelim.

Kodlarla anlatmak gerekirse .


```php 
<?php
$request = $_SERVER['REQUEST_URI']; //adım 1
$file_name = md5($request); //adım 2
$file = $_SERVER['DOCUMENT_ROOT'].'/cache/'.$file_name;
 //unutma dosyanın mantıklı bir yerde olması lazım. ve chmod ayarı 777 olsun.
if(is_file($file)){ //adım 3
    (int)$create_time = filectime($file);//adım 9
    (int)$time = time(); //şimdiki zaman adım 9
    $s = $time-$create_time; // bak bakalım adım 9
    if($s >(60*60*5)){//adım 9
        //create new file
        $opened_file = file_get_contents($file); //adım 11
        echo $opened_file;
        echo '';
        exit;//adım 12
    }
}
ob_start(); //adım 4

echo 'Bu kısımda tüm sitemizin içeriğini include falan etmişiz meğersem';

$full_page = ob_get_contents(); //adım 5
$fopen = fopen($file,'w+'); //adım 5
fwrite($fopen,$full_page); //adım 5
echo '';
?>
```

İş arasında bu kadar hızlı oluyor ancak.

Saygılar
