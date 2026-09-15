---
title: Adım Adım Nostr'a Giriş Rehberi
date: '2026-09-15T08:49:08-04:00'
slug: adim-adim-nostr-giris-rehberi
hero_image: >-
  https://image.nostr.build/905666f9455b18b6339bbdce75a08e4d9732560d3101a9ed086deae6febdec40.jpg
tags:
  - nostr
  - nostrturkiye
  - nostrorgtr
  - turkce
  - primal
  - amber
  - nostrich
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqs28xm0pgjpw6rdwpwnaxpkdquswtvu5a49xckz8sv7u80fzhxx8usmhfn23
description: >-
  Hiç bilmeyenler için en yalın dille Nostr'a giriş rehberi: Mobilde Primal,
  masaüstünde Nostrich ile hesap açma, nsec koruma ve Amber kullanımı.
---
Nostr dünyasına hoş geldiniz. Bu yazıyı okuyorsanız muhtemelen adını sağda solda duydunuz ama nereden başlayacağınızı tam kestiremiyorsunuz. Hiç dert etmeyin. Bu rehberin tek bir amacı var: **Teknik hiçbir terime boğulmadan, 5 dakika içinde ilk paylaşımınızı yapmanızı sağlamak ve hesabınızı güvene almak.**

Detaylara geçmeden önce akıllardaki en büyük soruları hemen aradan çıkaralım:

1. **Nostr nedir?** En basit tabiriyle: **E-posta gibi çalışır ve engellenemez.** Nasıl ki Hotmail kullanan biri Gmail kullanan birine e-posta gönderebiliyorsa ve hiçbir şirket dünyadaki tüm e-posta trafiğini tek bir tuşla kapatamıyorsa, Nostr da öyledir. Tek bir patronu, şirketi veya merkezi yoktur; kimse canı istedi diye hesabınızı kapatamaz, sizi sansürleyemez.
2. **Karanlık bir yer mi?** Kesinlikle hayır. Nostr bir "dark web", yeraltı dünyası veya suç örgütlerinin yeri değildir. Fikir olarak Bitcoin camiasındaki geliştiricilerden çıktı; ancak Bitcoin'e veya herhangi bir kripto paraya göbekten bağlı değildir. Kripto paranız olmasına gerek yoktur; para yatırmazsınız, tamamen ücretsiz, şeffaf ve normal insanların fikir paylaştığı güvenli bir iletişim alanıdır.

Nostr'ın felsefesini, teknik mimarisini veya arkasındaki merak ettiğiniz tüm derin detayları öğrenmek isterseniz **[nostr.org.tr](https://nostr.org.tr)** sayfasına göz atabilirsiniz. Biz şimdi doğrudan işe koyuluyoruz.

---

## Bilmeniz Gereken Tek Şey: İki Tane Anahtarınız Var

Nostr'da alışık olduğunuz e-posta/şifre ikilisi veya telefon numarasıyla kayıt olmak yoktur. Bir hesap açtığınızda sistem size sadece iki tane kod (anahtar) verir:

```text
+-------------------------------------------------------------+
|  Açık Adres (npub)      -->  Herkes görür, sizi takip eder   |
|  Gizli Anahtar (nsec)   -->  Sadece sizde kalır, paylaşılmaz |
+-------------------------------------------------------------+
```

* **Açık Adresiniz (`npub` ile başlar):** Bu sizin **IBAN numaranız** veya profil linkiniz gibidir. Herkese gönderebilirsiniz. İnsanlar sizi bu kodla aratıp bulur ve takip eder.
* **Gizli Anahtarınız (`nsec` ile başlar):** Bu sizin **banka kasanızın tek anahtarıdır**. **ASLA ve ASLA kimseyle paylaşılmaz.** Bir yönetici, moderatör veya destek ekibi dahil hiç kimse sizden bunu isteyemez. İsterse dolandırıcıdır. Kaybederseniz *"şifremi unuttum"* butonu yoktur; hesabınız tamamen gider.

Şimdi hazırsanız ister telefondan ister bilgisayardan başlayalım. Hangisi kolayınıza geliyorsa o yolu seçin.

---

## 1. Yol: Mobilden Başlamak (iPhone & Android) — Primal İle

Telefonda Twitter benzeri, pürüzsüz ve çok hızlı bir deneyim için **Primal** uygulamasını kullanacağız. Hem iPhone hem Android için mevcuttur.

1. **İndirin:** App Store (iPhone) veya Google Play Store'dan (Android) **Primal** uygulamasını aratıp indirin.
2. **Hesap Oluşturun:** Uygulamayı açtığınızda karşınıza çıkan **"Create Account" (Hesap Oluştur)** butonuna dokunun.
3. **Profilinizi Belirleyin:** İsminizi, kullanıcı adınızı yazın ve bir profil resmi seçin (isterseniz bu adımları daha sonra da düzenleyebilirsiniz).
4. **Gizli Anahtarınızı (`nsec`) Alın (ÇOK ÖNEMLİ):**
   * Sol üstteki profil resminize dokunun ve **Ayarlar (Settings)** menüsüne girin.
   * **Hesap (Account)** > **Gizli Anahtarı Göster (Keys / Backup)** bölümüne gelin.
   * `nsec1...` ile başlayan uzun kodu kopyalayın. *(Bunu nereye saklayacağınızı birazdan anlatacağız).*
5. **İlk Paylaşımınızı Yapın:** Ana sayfada sağ alttaki mor **"+"** butonuna dokunun. İlk cümlenizi yazın (örneğin *"Selam Nostr!"*) ve **Post (Gönder)** butonuna basın.

Tebrikler, artık Nostr üzerindesiniz!

---

## 2. Yol: Bilgisayardan / Masaüstünden Başlamak — Nostrich İle

Bilgisayar başında vakit geçirmeyi seviyorsanız, Türkçe dil desteğine sahip **Nostrich** web istemcisi harika bir başlangıç noktasıdır.

1. **Siteye Girin:** Tarayıcınızdan **[nostrich.org](https://nostrich.org)** adresini açın.
2. **Türkçe Dil Seçeneği:** Tarayıcınız Türkçe ise site otomatik olarak Türkçe açılabilir. Açılmazsa; sol menünün en altındaki **More -> Settings -> Preferences** yolunu takip ederek arayüz dilini **Türkçe** yapabilirsiniz.
3. **Hesap Açın:**
   * Sol tarafta yer alan mor **"Oturum Aç" (Login)** butonuna tıklayın.
   * Karşınıza gelen pencerede alt kısımdaki **"Yeni Anahtar Oluştur"** seçeneğine tıklayın.
   * Sistem size özel `nsec1...` ile başlayan gizli anahtarınızı üretecektir. Bu anahtarı şifreleyerek veya şifrelemeden bilgisayarınıza indirebilir ya da kopyalayabilirsiniz.
   * Ardından **"Nostr Kullanmaya Başla"** butonuna basın.
4. **İlk Notunuzu Paylaşın:** Sol üstteki metin kutusuna dilediğiniz bir mesajı yazıp **"Gönder"** butonuna tıklayın. İlk notunuz tüm dünyadaki Nostr ağına dağıtıldı bile.

---

## Gizli Anahtarınızı (`nsec`) Nasıl Saklamalısınız?

Elinizdeki `nsec1...` kodu sizin her şeyinizdir. Peki bunu nereye koymalısınız?

### En Sağlam ve Güvenli Yollar:
* **Kâğıt ve Kalem:** Anahtarı bir kâğıda yazıp cüzdanınıza veya önemli evraklarınızın arasına koymak en güvenli yöntemlerden biridir; hiçbir internet korsanı çekmecenizdeki kâğıdı hackleyemez.
* **Şifre Yöneticileri:** 1Password, Bitwarden veya Apple Parolalar (Keychain) gibi şifreli bir kasa kullanıyorsanız oraya yeni bir kayıt açıp yapıştırın.
* **Bilgisayarda Güvenli Bir Dosya:** Bilgisayarınızda bir metin belgesine (`anahtarim.txt`) yapıştırıp güvendiğiniz bir klasörde saklayabilirsiniz.

### Pratik Ama Dikkat Edilmesi Gereken Yollar:
* **Kendine Mesaj Atmak:** Birçok insan pratik olduğu için bu kodu WhatsApp, Telegram veya Signal'de "Kendime Not / Kayıtlı Mesajlar" sohbetine atar. 
* *Bunu yapabilirsiniz;* ancak şunu aklınızdan çıkarmayın: Eğer telefonunuzun ekran kilidi açıkken başkasının eline geçerse ya da sohbet yedekleriniz bulutta korunmasız kalırsa anahtarınız başkalarının eline geçebilir. Bu yüzden mümkün oldukça şifreli bir yöneticiyi veya kâğıdı tercih edin.

---

## Telefon Farkı: iPhone (iOS) ve Android Kullanıcıları Ne Yapmalı?

Nostr'da harika bir kural vardır: **Hesabınız tek bir uygulamaya hapsolmaz.** İster Primal kullanın, ister Amethyst, ister Damus... Hepsinde aynı anahtarla oturum açtığınızda tüm takipçileriniz ve mesajlarınız karşınızda belirir.

Fakat iki işletim sistemi arasında küçük bir mantık farkı vardır:

* **iPhone (iOS) Kullananlar:** Apple'ın güvenlik yapısı gereği uygulamalar arka planda birbirleriyle doğrudan haberleşemez. Primal'de açtığınız hesap Apple'ın güvenli kasasında (Keychain) saklanır. İleride Damus gibi başka bir iOS Nostr uygulaması denemek isterseniz, sakladığınız `nsec` kodunuzu kopyalayıp o uygulamanın giriş ekranına yapıştırmanız yeterlidir.
* **Android Kullananlar:** Android kullanıcılarının elinde çok büyük bir koz var: **Amber**.

---

## Android Kullanıcıları İçin Süper Güç: Amber Nedir ve Nasıl Kurulur?

Her yeni uygulama denemek istediğinizde en gizli şifrenizi (`nsec`) oraya buraya kopyalayıp yapıştırmak riskli hissettirebilir. İşte **Amber** tam bu işe yarar.

Amber, telefonunuzda duran **dijital bir çelik kasadır**. Gizli anahtarınızı sadece Amber'e verirsiniz; diğer hiçbir Nostr uygulaması anahtarınızı göremez.

```text
+-------------------+       İmza İsteği       +-------------------+
|  Nostr Uygulaması  |  -------------------->  |   Amber (Kasa)    |
|  (Amethyst vb.)   |  <--------------------  |   nsec BURADA!    |
+-------------------+         Onay            +-------------------+
```

### Kurulum Adımları:
1. Google Play Store'dan (veya GitHub / F-Droid üzerinden) **Amber** uygulamasını indirin.
2. Amber'i açın, **"Mevcut Anahtarı İçe Aktar" (Import Key)** seçeneğine dokunun.
3. Kopyaladığınız `nsec1...` kodunu buraya yapıştırıp onaylayın.
4. Artık gizli anahtarınız güvenli bir zırhın içine girdi.

---

## Başka Bir Uygulamaya Nasıl Giriş Yapılır?

Farklı bir Nostr istemcisi keşfetmek istediğinizde önünüzde üç basit yol vardır:

### Yol 1: Android'de Amber ile Giriş Yapmak (En Temiz ve Güvenli Yol)
1. Yeni indirdiğiniz herhangi bir Nostr uygulamasını açın (örneğin Amethyst veya web üzerinden bir istemci).
2. Giriş seçeneklerinden **"Amber ile Giriş" (Login with Amber / External Signer / Harici İmzacı)** seçeneğine dokunun.
3. Karşınıza Amber ekranı gelir: *"Bu uygulama hesabınızla giriş yapmak istiyor, onaylıyor musunuz?"*
4. **Onayla (Approve)** butonuna bastığınız anda bitti! Gizli anahtarınızı o uygulamaya tek bir harf dahi yazmadan güvenle giriş yaptınız.

### Yol 2: Bilgisayardaki Bir Web Sitesine Amber ile Bağlanmak (QR Kod / Bunker)
Bilgisayarınızda bir Nostr web sitesi kullanmak istiyorsunuz ama şifrenizi bilgisayarın tarayıcısına yazmak istemiyorsunuz diyelim:
1. Web sitesinde oturum açma kısmında **"Nostr Connect / Bunker / QR ile Giriş"** seçeneğini seçin.
2. Ekranda bir QR kod belirecektir.
3. Telefonunuzdaki **Amber** uygulamasını açın, kamera simgesine dokunup bilgisayar ekranındaki o QR kodu taratın.
4. Telefonunuz bilgisayara bağlanır. Bilgisayarda bir şey paylaştığınızda telefonunuza *"Onaylıyor musunuz?"* bildirimi gelir, tek dokunuşla onaylarsınız. Şifreniz telefonunuzdan hiç çıkmaz.

### Yol 3: Doğrudan `nsec` ile Giriş Yapmak (Klasik Yol)
iPhone kullanıyorsanız veya Amber kullanmak istemiyorsanız:
1. Uygulamanın giriş ekranında **"Oturum Aç / Giriş Yap (Login)"** butonuna tıklayın.
2. Sakladığınız `nsec1...` anahtarınızı ilgili kutuya yapıştırıp giriş yapın.

---

## Kimi Takip Edebilirsiniz? (Akışınızı Canlandırın)

Hesabınızı açtınız ama ilk anda ana akışınız boş görünecektir. Nostr'da insanları ve hesapları bulmak çok kolaydır: İstemcinizin arama (büyüteç) kısmına, tıpkı bir e-posta adresi yazar gibi aşağıdaki adresleri yazıp aratabilir ve takip edebilirsiniz:

* **Nostr Türkiye Topluluğu:** `topluluk@nostr.org.tr` (Nostr Türkiye'nin resmi hesabı. Hem bu hesabı hem de bu hesabın takip ettiği kişileri takip listenize ekleyerek saniyeler içinde zengin bir Türkçe akışa kavuşabilirsiniz).
* **Beni Takip Edin:** `delirehberi@emre.xyz` (Nostr üzerindeki kişisel hesabım; aklınıza takılan soruları not olarak bana iletebilirsiniz).
* **Hazır Haber ve İçerik Botları:**
  * `bilim@rehber.dev` (Güncel bilim paylaşımları)
  * `teknoloji@rehber.dev` (Teknoloji dünyasından gelişmeler)
  * `sanat@rehber.dev` (Sanat ve kültür notları)

> **Küçük Bir İpucu:** Siz de isminizin yanında karmaşık kodlar yerine `adiniz@rehber.dev` şeklinde havalı ve doğrulanmış özel bir ad görünmesini isterseniz, **[rehber.dev](https://rehber.dev)** üzerinden giriş yapıp ücretsiz olarak kendi adınızı alabilirsiniz. Bunun nasıl yapıldığını başka bir yazıda tüm detaylarıyla anlatacağız.

---

## Özet ve Altın Kurallar

1. **`nsec` anahtarınız evinizin tapusudur:** Kimseye söylemeyin, ekran görüntüsü alıp ortalıkta bırakmayın.
2. **Özgürsünüz:** Tek bir hesaba sahipsiniz ama bu hesabı yüzlerce farklı uygulamada kullanabilirsiniz. Bir uygulamayı beğenmezseniz silin, diğerine geçin; arkadaşlarınız ve gönderileriniz sizi orada bekliyor olacak.
3. **Nostr topluluğuyla tanışın:** Sorular sormak, Türkçe yayın yapan insanları takip etmek ve ekosistemi derinlemesine keşfetmek için **[nostr.org.tr](https://nostr.org.tr)** adresine bekleriz.

Nostr'a hoş geldiniz, ilk notunuzda toplulukla selamlaşmayı unutmayın!
