+++
title = "Xss Cross Site Scripting"
lang = "tr"
categories = ["Yazılım"]
date = "2009-05-04T15:22:12-04:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqrpu8xuedvdex7umn94ekjar994ekxunfwp6xjmmwa3yp3m"
+++

Xss nedir? ne değildir ?

bunun cevabı zaten sık sık tekrar edildi. Birkez daha tekrar edelim ve kendi dökümanımızı yazalım.

Xss Cross site scripting ( çapraz site kodlaması ) anlamında kullanılır.Xss bir web sayfasının gönderdiği get veya post yöntemlerinden faydalanarak kod çalıştırma işlemidir.

Temsil-i Misal:
```
<html>
<head>
<title>Xss</title>
</head>
<body>
<h1> Xss </h1>
<br/>
<form name=”xss” action=”xssal.php” method=”get”>
Aranacak Kelime : <input type=”text” name=”xss”/><br/>
<input type=”submit” value=”Ara”/>
</form>
<!– Form oluşturduk öncelikle buraya kadar herşey normal xss çıkartacak bir durum yok –>
</body>
</html>
```

Yukarıdaki formu göndereceğimiz xssal.php yi oluşturalım..
```
<html>
<head>
<?php
$kelime = $_GET['xss'];
//Buraya dikkat burda hiç bir filtreleme yapmadan veriyi aldık.
?>
<title>
<?php echo $kelime; //İşte önemli hususlardan birisi daha.
//burada başlık kısmına aranan kelimeyi yazdırıyoruz. Üstelik filtresiz bir kelime :S
?>
</title>
</head>
<body>
<!– arama kodlarını yazmıyorum –>
Aranan ‘<?php echo $kelime; ?>’ kelimesi kayıtlarda bulunamadı..
<!– işte buyrun bi yere daha yazdırdık :S –>
<br />
Tekrar Ara: <br/>
<form name=”sada” action=”xssal.php” method=”get”>
Aranacak Kelime: <input type=”text” name=”xss” value=”<?= $kelime;?>”><br/>
<!– alın işte bir yere daha yazdırdık … –>
<input type=”submit” value=”ara”/>
</form>
</body>
</html>
```

birinci form ile bilgileri ikinci forma gönderiyoruz. bunda bi anormallik yok.
ikinci formda ise birinci formdan gelen bilgileri alıyoruz. üstelik filtresiz. filtresiz almak demek sql inj. açığı ve sayfada o kelimeyi üç farklı yerde yazdırmakta xss açığı demektir…

bu sayfayı açın. gönderim kısmına `"></title></head><script>alert(123);</script>` yazın…

ikinci sayfaya göndermek için tuşa bastığınızda karşınıza tam üç adet 123 uyarısı çıkacaktır. buda demektirki geçmiş olsun xss i yedik.

filtrelemiyosanız sayfaya yazdırmayın ve veritabanında arma yaptırtmayın.

sağlam halini yapalım o zaman smile.gif

gönderme işlemi aynı şekilde kalacak…

sadece alım işleminde değişiklik yapacağız…

```
<html>
<head>
<?php
$kelime = htmlspecialchars(strip_tags(addslashes($_GET['xss']));
// htmlspecialchars(strip_tags(addslashes   <- bunlar php nin filtreleme fonksiyonudur . html karakterlerini filtrelerler ve tırnak işaretleri önüne koyarlar…
?>
<title>
<?php echo $kelime;
?>
</title>
</head>
<body>
<!– arama kodlarını yazmıyorum –>
Aranan ‘<?php echo $kelime; ?>’ kelimesi kayıtlarda bulunamadı..
<br />
Tekrar Ara: <br/>
<form name=”sada” action=”xssal.php” method=”get”>
Aranacak Kelime: <input type=”text” name=”xss” value=”<?= $kelime;?>”><br/>
<input type=”submit” value=”ara”/>
</form>
</body>
</html>
```

yukarıdaki ise sağlam kod. deneyin görün sonucu smile.gif

biraz karışık oldu ama idare edin artık smile.gif
