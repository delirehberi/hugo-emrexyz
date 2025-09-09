+++
title = "Xss Cross Site Scripting"
date = "2009-05-04T15:22:12-04:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqgpwqlq70tgdapmcen7nvxhycazp3l98j4anxlmc02v7w6vtvu22gsntl8yg"
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
