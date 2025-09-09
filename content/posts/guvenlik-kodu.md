+++
title = "Guvenlik Kodu"
date = "2009-05-04T15:20:41-04:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsqgfjyw0fyyrrzxk092szer7dlujset4lfssxsthnx3e9682kakksxja674"
+++

Güvenlik kodu oluşturmanın zamanı geldi. Güvenlik dedikmi zaten flood dan korunmanın yöntemlerinin başında güvenlik kodu geliyor. hadi başlayalım…

Öncelikle bu işi yapabilmek için php bilmeniz lazım ( biliyosak niye öğretiyon diceniz haklısınız )

evet başlayalım.

Bu derste ne öğreneceğiz ??
Güvenlik Kodu Nedir ?
Güvenlik Kodu Neden Kullanılır ?
Güvenlik Kodu Nasıl Yapılır ?
Güvenlik Kodu Nasıl Kırılır ?
Kırılmayan Güvenlik Kodu Nasıl Yapılır ?
Niye Bu Kadar Detay Veriyorum ?

1- Bu Derste Ne Öğreneceğiz ?
–> Güvenlik kodu kullanarak siteleri korumayı öğreneceğiz. Sonrasında yaptığımız kodu kırıp yeni bi tane yöntem öğreneceğiz smile.gif
2- Güvenlik Kodu Nedir ?
–> Güvenlik kodu web sitelerini flood(sel) saldırılarından korumaya yönelik geliştirilmiş bir yöntemdir. Kod hatalı girildiği takdirde sistem hata verecektir. Bu sayede kimse sizi sel saldırılarına maruz bırakamayacaktır (!)
3- Güvenlik Kodu Neden Kullanılır?
–> Çünkü çok fazla lamer var etrafımızda. Onların giripte siteyi flood saldırıları ile yavaşlatması hiç birimizin hoşuna gitmez. Bu yüzdendirki güvenlik kodu oluşturuyoruz.
4- Güvenlik kodu nasıl yapılır?
–> İşin en cafcaflı kısmı işte burası. Malzemeleri hazırlayalım.
1- Localhost
2- Php Desteği
3- GD Kütüphanesi
4- Bi paket sigara
5- Bi bardak çay (Fincan değil bardak olmalı. İnce belli bardak olmazsa kod çalışmaz.)
İşe başlayalım ama bi çay alayım ben…

—-

Evet devam edelim bakalım…

Malzemeleri hazırladık sigaramızı yakalım başlayalım.
hemen formumuzu hazırlayalım.
form.php
```php
<?php
session_start(); //Oturumu başlat
$s =substr(strtoupper(md5(md5((rand(0,9999)*rand(0,9999))+rand(0,9999)))),0,5);  //Oh yarasın kodları bi güzel iç içe geçirdik. 2 rasgele sayıyı çarpıp bir diğer rasgele sayıyla toplayarak 2 defa md5 yapıp harfleri buyulttukten sonra ilk 5 karakterini aldık :)
$_SESSION['guvenlik_kodu']=$s;
echo '<html><head><title>Güvenlik Kodu</title></head><body>'; //Html taglarimizle forma başladık
echo '<form action="action.php" method="post" name="guvenlik_testi">'; //Form başlangıcımızı yaptık
echo 'Kullanıcı Adı:<input type="text" name="kullanici_adi"/><br/>'; //Kullanıcı adı alanı
echo 'Şifre: <input type="password" name="sifre"/><br/>'; //Sifre alanı
echo 'Güvenlik Kodu:<b>'.$s.'</b><br/>'; //Güvenlik Kodunu Kalınm Harflerle Yazdırdık
echo 'Güvenlik Kodu:<input type="text" name="guvenlik_kodu"/></br>'; //Güvenlik kodu Alanı
echo '<input type="submit" name="gonder" value="Giriş"/>'; //Giriş Butonu
echo '</form>'; //Form bitimi
echo '</body></html>'; //html Sayfamızın bitimi...
?>
```

Evet yukarıdaki kodlarla güvenlik kodumuzu (!) oluşturduk. yazdırdık. oturuma kaydettik. action.php de istedik. hadi action.php ye

action.php
```php
<?php
session_start();
$guvenlik_kodu = $_POST['guvenlik_kodu'];
$kullanici_adi =  $_POST['kullanici_adi'];
$sifre = $_POST['sifre'];
//Verilerimizi aldık.
if($guvenlik_kodu != $_SESSION['guvenlik_kodu']) {
echo ‘Guvenlik Kodu Hatalı!’;
exit();
} //Eğer güvenlik kodu hatalı girilmişse hata ver ve diğer satırları çalıştırmaya çalışma (exit();)
if($kullanici_adi == “wyrus” && $sifre == “wyrus”) {
echo ‘Giriş Başarılı’;
$_SESSION['giris'] = “Basarili”; //Oturumu oluşturduk!
//Diğer içerik
}elseif($kullanici_adi == “‘OR 1=1;” || $kullanici_adi == “‘OR 1=1;–”) {
echo ‘<script>alert(\’Hack Dersi 1 \n Sql Kullanmayan Bir Sistemde Asla Sql Açığı Aranmaz!\’);</script>’; //Eğer hacker gelmişse siteye ders anlatımı yapalım :)
}else{
echo ‘Kullanıcı Adı veya Şifre yanlış!’;
}
?>
```
İşte basit şekilli bir güvenlik kodu oluşturduk.

Güvenlik Kodu Nasıl Kırılır ? ‘dan sonraki kısımlarıda reklamlardan sonra anlatalım ki siteye hit gelsin dimi
