---
title: 'jotstr.com Yayında: Nostr Üzerinde Sahibi Olduğun Bir Blog'
date: '2026-10-05T12:58:57-04:00'
slug: jotstr-yayinda
l: tr
tags:
  - jotstr
  - nostr
  - mcp
  - türkçe
  - proje
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqpe4x7arnw3ez67tp095kuerpts7zvc
description: >-
  Birkaç hafta önce haberini verdiğim blog platformu jotstr.com artık yayında.
  Kendi adresinle hemen yazmaya başlayabilir, blogunu istersen yapay zekâ
  asistanınla da yönetebilirsin.
---
Birkaç hafta önce [Yeni bir blog platformu!](https://delirehberi.jotstr.com/yeni-bir-blog-platformu) başlıklı yazıda, üzerinde çalıştığım bir blog uygulamasından bahsetmiş ve birkaç ekran görüntüsü paylaşıp kaçmıştım. Son kontroller bitti, markalama tamamlandı: **jotstr.com artık yayında!**

Bu yazıda jotstr'ın ne olduğunu, nasıl kullanılacağını ve beni en çok heyecanlandıran özelliğini, yani blogunu yapay zekâ asistanınla yönetebilmeni anlatacağım.

## jotstr nedir?

jotstr, kendine ait bir blogu birkaç tıkla edinmeni sağlayan bir platform. Bir kullanıcı adı seçiyorsun, `kullaniciadin.jotstr.com` adresin hazır oluyor ve yazmaya başlıyorsun. Kurulum, sunucu, tema derdi yok.

İşin arka tarafında ise **Nostr** protokolü var. Yazdığın her yazı, sana ait anahtarla imzalanmış bir Nostr uzun-form makalesi (NIP-23) olarak yayınlanıyor. Bunun pratikte anlamı şu:

- **Yazıların sana ait.** Platforma değil, senin anahtarına bağlılar.
- **Kilitli değilsin.** Yazıların Nostr relay'lerinde duruyor; uzun-form içeriği destekleyen başka Nostr istemcileri de onları okuyabiliyor.
- **Platform kapansa bile** içeriğin relay'lerde yaşamaya devam ediyor.

[Owner, Not User](https://delirehberi.jotstr.com/owner-not-user) yazısında anlattığım fikrin somut hâli bu: kullanıcı değil, sahip olmak.

Üstelik jotstr **tamamen ücretsiz** ve **tamamen Türkçe destekli**.

## Neler yapabiliyorsun?

![jotstr editör ekranı](https://blossom.ditto.pub/530126e9c29c985c3e150a1d184a4ea09492d7230689ea895f07d18767f570c3.png)

- **Markdown editör:** Sade, dikkat dağıtmayan bir yazma ekranı.
- **Kendi adresin:** `kullaniciadin.jotstr.com`, istersen kendi alan adın.
- **Yorumlar:** Okuyucuların Nostr hesaplarıyla yorum yapabiliyor.
- **Tepkiler ve zap'ler:** Beğeniler, emoji tepkileri, paylaşımlar ve Lightning ile zap'ler. Zap tutarları doğrulanarak gösteriliyor.
- **İstatistikler:** Her yazının ve blogunun genel etkileşimini tek ekranda görebiliyorsun.
- **Yazı silme:** İstemediğin bir yazı için silme talebi gönderebiliyorsun. Küçük ama önemli bir not: Nostr'da silme bir *talep*tir. Bu talebi dikkate alan relay'ler ve istemciler yazıyı gizler, ama başka yerlere çoktan kopyalanmış içerik kalabilir. Merkeziyetsizliğin doğası bu.

![jotstr dashboard](https://blossom.primal.net/3eff1e55358e35614b89056dc31477b7c85ee689f13d691f0869342c6d47e594.png)

## Nasıl başlarım?

İki yol var:

**1. Zaten bir Nostr hesabın varsa:** Hesabını bir bunker (nsec.app, Amber gibi uzaktan imzalayıcılar) üzerinden bağla ve kullanıcı adını al. Gizli anahtarın hiçbir zaman jotstr'a gitmez; her imza bunker uygulamanda senin onayınla atılır.

**2. Nostr'a yeni başlıyorsan:** jotstr senin için yeni bir hesap oluşturur. Burada çok önemli bir uyarı var: **gizli anahtarın (nsec) sana yalnızca bir kez gösterilir.** jotstr onu saklamaz. Güvenli bir yere kaydet; kaybedersen hesabını geri getirmenin yolu yok.

Nostr'un temellerini öğrenmek istersen [Adım Adım Nostr'a Giriş Rehberi](https://delirehberi.jotstr.com/Wpp10fj9sT7rmL1wutJ9w) yazıma göz atabilirsin.

## En sevdiğim kısım: MCP ile blogunu yapay zekâ asistanınla yönet

jotstr'ın bir **MCP sunucusu** var. MCP (Model Context Protocol), Claude gibi yapay zekâ asistanlarının dış araçları standart bir şekilde kullanabilmesini sağlayan bir protokol. Kısacası, asistanına jotstr'ı bağladığında blogunla ilgili işleri sohbet ederek yapabiliyorsun.

MCP destekleyen bir istemciye şu adresi bağlayıcı olarak eklemen yeterli:

```
https://jotstr.com/mcp
```

Sonrasında asistanın şunları yapabiliyor:

- Yeni yazı yayınlamak ya da mevcut bir yazıyı güncellemek
- Yazılarını listelemek, istatistiklerini ve yorumlarını getirmek
- Yazı silme talebi göndermek
- Kullanıcı adı müsait mi diye bakmak ve almak

**Güvenlik tarafı:** Bunker ile bağlandığında gizli anahtarın ne yapay zekâya ne de jotstr'a gider. Asistan yalnızca imza *talep eder*; her imza bunker uygulamanda senin onayını bekler. Yani kontrol hep sende.

### Gerçek bir örnek

Bu yazıyı hazırlarken tam olarak bunu yaptım. Claude'a bunker adresimi verdim, hesabımı bağladı ve `delirehberi.jotstr.com` adresinin zaten bana ait olduğunu doğruladı. Ardından son 20 yazımın istatistiklerini istedim: hangi yazının kaç tepki ve yorum aldığını tek tabloda gösterdi. Bu sırada "Cloudflare OS, is it worth?" yazısının yanlışlıkla iki kez yayınlandığını fark etti. Tek cümleyle kopyayı sildirdim; silme talebi imzalanıp relay'lere gönderildi.

Hepsi tek bir sohbette, hiçbir panele girmeden oldu. Hatta bu yazının taslağı da aynı sohbette hazırlandı.

![Claude ile jotstr sohbeti](https://blossom.primal.net/e29ceacc8d69900fc253d17258d101caf1cbeb972c2ca0e53d67daffeb63a1a8.png)

## Neden önemli?

[İnternet değişiyor](https://delirehberi.jotstr.com/GUnwamkhVxxxWSs-4D_pO). İçeriğimizin platformların insafına kaldığı dönemden, gerçekten sahip olduğumuz bir yapıya geçiş yavaş yavaş gerçekleşiyor. jotstr bu geçişi yazanlar için kolaylaştırmaya çalışıyor: protokol arkada güçlü, ama önde sadece yazı var.

Bu da [nostr.org.tr](https://nostr.org.tr) ile Türkiye'de Nostr'u büyütme çabamın bir parçası. Türkçe içerik üretenlerin bu ekosistemde rahatça yer alabilmesini istiyorum.

## Hadi başla

- **jotstr.com**'a gir, kullanıcı adını al ve ilk yazını yaz.
- Fikirlerini, hata bildirimlerini ve önerilerini bu yazıya yorum olarak bırak.
- Türkiye'deki Nostr topluluğuna katılmak için [nostr.org.tr](https://nostr.org.tr)'ye uğra.

Yazıyı beğendiysen zap'lerin her zaman başımın üstünde: `delirehberi@emre.xyz` ⚡

Yazılarını okumak için sabırsızlanıyorum!
