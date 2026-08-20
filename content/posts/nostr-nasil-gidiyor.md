---
title: Nostr Nasıl Gidiyor?
date: '2026-08-19T20:01:42-04:00'
slug: nostr-nasil-gidiyor
tags: []
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqs8zjxy4gawkk6n8f93r2vsrr3cm3s47um298sxwdz6hka9aphzlkc6dvjeu
description: Nostr maceramın özeti
---
Birkaç yıl önce **Jack (Jack Dorsey)**[^1] sayesinde **[Nostr protokolünü](https://nostr.com/)**[^2] keşfetmiştim. O günden bu yana aktif olarak kullanıyorum. Zaten yıllardır dağıtık sosyal ağlara ilgim vardı. **[ActivityPub](https://activitypub.rocks/)**[^3] denedim bir süre. Bir şeyler oturmadı. O sırada Jack Twitter içerisinde **[ATProto](https://atproto.com/)**[^4]'ya başladı, ancak orada da bir şeyler oturmuyordu. Daha öncelerindeki yöntemleri kullanmaya bile yeltenmemiştim zaten.

Web doğası gereği dağıtık bir yapıyken internetin bu kadar merkezileşmesi hep beni rahatsız ediyordu. Tabii ki birçok başka insanı da. Bunun başlıca sebebi sosyal medya platformlarıydı. Ziyaretçi defterleriyle başlayan furya, forumlara, oradan Friendfeed benzeri duvarlara, MySpace benzeri platformlara, sonrasında **Facebook** ve **Twitter**'a evrildi. Facebook ve Twitter'dan önce bloglar ile daha dağıtık bir yapıda olan internet bir anda merkezileşmeye başladı. 

Dağıtık yapının bakım maliyetleri, oturmamış sistemler nedeniyle, her zaman olduğu gibi insanlık kolaya kaçıp merkezileşmeyi seçti. Facebook ve Twitter giderek büyüdü ve yamacında pek çok farklı platform da hep aynı yöntemle *merkezi platformlara* dönüştüler. 

İnsanların geç fark ettiği şeylerden birisi *merkezi gücün her daim manipüle etme gücüne sahip olmasıydı* ki bu da zaten zamanla Facebook ve Twitter davalarıyla ve benzer davalarla da ortaya çıktı. 

Ayrıca bu merkezi sistemlerin hiçbirisinde **hesap sahipliği** diye bir şey yoktu ve her birimiz aslında ücret ödemeyen (veya verimizle ücretlerini ödediğimiz) kiracılardan farklı değildik. Zaman geçtikçe ne ev sahipleri insanları kovmaya başlayınca da gördük. Şu anda sadece devlet karşıtı paylaşımlar yaptığınızda bile bu merkezi platformlardan bir anda kapı dışarı ediliyorsunuz ve *ne verilerinize ne de başka hiçbir şeye dair sahiplik hakkınız bulunmuyor.* 

Aslında boktan bir sistemin içinde yaşadık uzunca bir süre, hâlâ da bu sistem devam ediyor. 

Benim yakaladığım dönemden ActivityPub bunu çözmeye en yakın adaylardandı. Hatta Meta içerisindeki bazı kişiler bunu fark etmiş olacak ki **[Threads](https://www.threads.net/)** adındaki Instagram'ın metin tabanlı versiyonuna da ActivityPub desteği eklediler. Ancak , Fediverse **[Fediverse](https://fediverse.info/)**[^5] (ActivityPub ağı)'in bir kısmı (Fediblock hareketi) Threads'i *persona non grata* ilan etti, ancak Mastodon'un kurucusu Eugen Rochko ve en büyük sunucu olan `mastodon.social` gibi yapılar Threads'i memnuniyetle karşıladı. 

ActivityPub ve ATProto en iddialı protokoller olsa da *çok karmaşık kalıyorlardı* bir sosyal ağ protokolü için; bu sebeple zaten ActivityPub pek çok şeyden feragat ediyordu. Örneğin uçtan uca şifrelemeyi bile protokol dışı bırakmıştı. ATProto ise kompleks yöntemler kullandığı için istenileni tam sunamadı henüz. 

Fakat, Bitcoin camiasından gelen Nostr adındaki protokol, işlerin o kadar da karmaşık olmasına gerek olmadığını, websocket protokolü üzerinden paşalar gibi çalışan sadece **[NIP-01](https://github.com/nostr-protocol/nips/blob/master/01.md)**[^6] kurallarını mecburi kılan bir şey önerdi. *Kimseye ait olmayan, en yeni yetme yazılımcının bile ürün çıkartabileceği bir protokol* ortaya çıktı. 

İnsanların çoğu Bitcoin camiası tarafından bu kadar benimsendiği için Nostr protokolüne önyargılı olsa da ben çok sevdim. Basitliğiyle resmen beni büyüledi. Önceleri sadece metin tabanlı sosyal medya araçlarını kullanarak Nostr ağına dahil oldum. **[Primal](https://primal.net/)**[^7]'ı kullanıyorum hâlâ. **[Amethyst](https://github.com/vitorpamplona/amethyst)**[^8] denedim beğenmedim, **[Damus](https://damus.io/)**[^9] fazla iOS enerjisi barındırdığı için sevmedim. 

Zamanla protokolün potansiyelinin ne kadar büyük olduğunu keşfettikçe, sosyal etkileşim ile alakalı ne kadar şey varsa Nostr'ın desteklemesini arzu eder hâle geldim. Önce **[NIP-05](https://github.com/nostr-protocol/nips/blob/master/05.md)**[^10] ile kullanıcı adımı doğruladım, sonra tarayıcıya eklenti yükleyerek giriş yapmayı öğrendim, ardından çeşitli istemciler (**[Coracle](https://coracle.social/)**[^11], [Primal](https://primal.net), **[Ditto](https://soapbox.pub/ditto/)**[^12]) denedim. Denedikçe daha çok sevdim. 

Bir noktada blog içeriklerimi de Nostr ağında tutabileceğimi fark ettim ve **[hugo2nostr](https://github.com/delirehberi/hugo2nostr)** eklentisi ile bütün yazılarımı Nostr ağına dağıttım. Ardından **[nosflare](https://github.com/Spl0itable/nosflare)**[^13] kullanıp kendi rölemi kurdum. Derken olay giderek daha da büyüdü. 

*Artık blog yazıp sosyal medyada paylaşmama gerek yok, zaten oradalar.* E o zaman yorum sistemimi de oraya bağlayayım. Böylece herhangi bir Nostr istemcisi ile yazılarım da okunabilir ve onlara cevap yazılırsa da yorum olarak sitemde de görünür, orada da görünür. Benim blog oldu sana Nostr istemcisi. 

Ardından Nostr içeriklerim için kendime [nostr.emre.xyz](https://nostr.emre.xyz)'yi kurdum, sadece blog yazılarım değil normal içeriklerim de Nostr'da olmayanlar için de görünür olsun diye. 

O da yetmedi tabii. Daha fazla kurcaladım. 

**[Zap](https://nostr.how/en/zaps)**'ları[^14] keşfettim. O da ne, Bitcoin ağı üzerinde kurulmuş **[Lightning Ağı](https://lightning.network/)**[^15] Nostr protokolü ile göbekten bağlı çalışabiliyor. Yani mikro ödemeler aracısız gönderilip alınabiliyor. Hemen bir **[Alby](https://getalby.com/)**[^16] hesabı ile bir cüzdan, sonra evdeki Raspberry Pi 3'e bir **[Alby Hub](https://getalby.com/hub)**[^17] kurulumu. Artık sosyal medya paylaşımlarım veya yazılarım beğenilirse mikro ödemeler alabilir ve başkalarına da mikro ödemeler yapabilir hâle geldim. 

Ancak o kadar büyük bir potansiyel ki bitmek bilmiyordu. Çok daha fazla uzatmayacağım ama hızlıca listelemem gerekirse, **[ngit](https://gitworkshop.dev/)**[^18] ile git repolarımı Nostr ağı üzerinde tutuyorum, **[zap.store](https://zap.store)**[^19] ile mobil uygulamaları Nostr ağı üzerinden indirip tutuyorum, torrentleri Nostr üzerinden alıp indiriyorum, özel mesajlaşmaları Nostr üzerinden yapıyorum ve daha pek çok güzel şey. 

Bu süreçte **[bunker.workouse.com](https://bunker.workouse.com)** ve **[bridge.workouse.com](https://bridge.workouse.com)** gibi iki güzel proje de yaptım. Burada bahsetmeyi unuttuğum pek çok yerde de yine Nostr protokolünden faydalanıyorum. 

Yakın zamanda İzmir'de Nostr protokolünü Türkiye'ye yayabilmek adına bir topluluk da kurmayı deneyeceğim. Dahil olmak için mail atabilirsiniz. 

Çok uzattım. Nostr ağına en kolay yoldan dahil olmak için önerim [Primal](https://primal.net/) uygulamasını indirin ve Twitter yerine kullanın, beni de `delirehberi@emre.xyz` diye aratıp bulabilirsiniz. Bilgisayardan da **[ditto.io](https://ditto.io)** üzerinden kullanabilirsiniz. Unutmayın, bir hesap oluşturduğunuzda **[nsec](https://nostr.how/en/keys)**[^20] adında bir şifreye sahip olacaksınız, onu canınız gibi korumanız önemli. Uygulamalara onunla giriş yapıp kendiniz olduğunuzu ispatlayacaksınız. 

Zamanla protokolün ne kadar farklı uygulamalarda ne kadar güzellik sunduğunu görerek daha da aşık olabilirsiniz. Ağabey ben bir şey okurken altını çizme işini bile bu protokolle hallediyorum. *Her şeyi tek hesapla hallediyorum. Hepsi de engellenemeyen ve silinemeyen bir yapıda yaşamaya devam ediyor.* 

Nostr hakkında daha sık yazacağım, takipte ve sağlıcakla kalın.

---

### Kavramlar Sözlüğü (Yeni Başlayanlar İçin)

[^1]: **Jack Dorsey:** Twitter'ın eski CEO'su. Nostr'ın kurucusu olmamakla birlikte (kurucusu "fiatjaf" takma adlı geliştiricidir), protokolün en büyük destekçisi ve fonlayıcısıdır.
[^2]: **Nostr:** Merkezi bir sunucuya bağlı olmayan, sansüre dirençli açık kaynaklı iletişim ve sosyal ağ protokolü.
[^3]: **ActivityPub:** Mastodon gibi merkeziyetsiz sosyal ağların birbirleriyle haberleşmesini sağlayan ağ protokolü.
[^4]: **ATProto:** Bluesky tarafından geliştirilen, açık kaynaklı alternatif bir merkeziyetsiz sosyal ağ protokolü.
[^5]: **Fediverse:** ActivityPub gibi protokolleri kullanarak birbirine bağlanan bağımsız sunuculardan oluşan geniş ağ.
[^6]: **NIP-01:** (Nostr Implementation Possibilities) Nostr protokolünün temel kurallarını belirleyen mecburi standartlar bütünü.
[^7]: **Primal:** Nostr ağına bağlanmak için kullanılan, Twitter benzeri çok hızlı ve popüler bir istemci (uygulama).
[^8]: **Amethyst:** Nostr ağı için geliştirilmiş, zengin özelliklere sahip popüler bir Android uygulaması.
[^9]: **Damus:** "Twitter katili" olarak da anılan, Nostr ağı için geliştirilmiş popüler bir iOS/Apple istemcisi.
[^10]: **NIP-05:** Nostr ağında hesapların (örn: isim@domain.com şeklinde) gerçek kişilere ait olduğunu doğrulamaya yarayan standart.
[^11]: **Coracle:** Kullanıcıların Nostr ağındaki verilerini özelleştirmesine olanak tanıyan gelişmiş bir web istemcisi.
[^12]: **Ditto:** Nostr ağı ile çalışan açık kaynaklı alternatif bir sosyal medya istemcisi.
[^13]: **nosflare:** Nostr mesajlarını ileten "röle" (relay) sunucularını Cloudflare üzerinde düşük maliyetle ve sunucusuz çalıştırmayı sağlayan yazılım.
[^14]: **Zap:** Nostr ağında kullanıcıların birbirlerine anında gönderdiği Bitcoin / Lightning bahşişleri (mikro ödemeler).
[^15]: **Lightning Ağı (Network):** Bitcoin üzerinde çalışan, hızlı ve düşük komisyonlu 2. katman ödeme ağı.
[^16]: **Alby:** Bitcoin Lightning ağını tarayıcınıza veya uygulamalara entegre eden açık kaynaklı servis.
[^17]: **Alby Hub:** Kendi Lightning cüzdanınızı ve Bitcoin düğümünüzü (node) kendi cihazınızda çalıştırmanızı sağlayan sistem.
[^18]: **ngit:** Geliştiricilerin kod projelerini doğrudan merkeziyetsiz Nostr ağında barındırmasını ve yönetmesini sağlayan araç.
[^19]: **zap.store:** Nostr tabanlı, geliştiricilere kripto parayla bahşiş bırakılabilen izinsiz/merkeziyetsiz mobil uygulama mağazası.
[^20]: **nsec (Nostr Secret Key):** Nostr ağındaki dijital kimliğinizin gizli anahtarı. Şifreniz gibidir, kaybederseniz hesabınıza erişemezsiniz, kimseyle paylaşılmamalıdır.
