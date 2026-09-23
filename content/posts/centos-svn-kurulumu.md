+++
title = "Centos Svn Kurulumu"
lang = "tr"
categories = ["Yazılım"]
date = "2013-10-15T14:39:55-04:00"
nostr_id = "naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqzd3k2mn5daej6umkdckkkatjw4k82mt462a52w"
+++

Svn kullanıyorsanız kendinize private bir svn sunucusu kurmak isteyebilirsiniz. Bunun için yapmanız gereken adımları anlatmaya çalışacağım. Hem benim içinde bir not olmuş olacak.

Sunucuya ssh üzerinden bağlandıktan sonra aşağıdaki komut ile subversion’ı yüklüyorum.

`yum install subversion`

Ardından svn e bağlanırken kullanacağım kullanıcıyı oluşturuyorum. Komut aşağıda.

`/usr/sbin/adduser svn`

Buradaki svn benim kullanıcı adım.

Sonrasında oluşturacağımız dizinlere ulaşım izni olsun diye kullanıcı değiştirip bu kullanıcıya geçiyoruz.

`su svn`

Artık svn kullanıcısı ile depo dosyalarımızı oluşturalım.

`mkdir /home/svn/repositories`

Sonrasında depo klasörümüze geçip bir svn reposu oluşturalım.

```
cd /home/svn/repositories
svnadmin create deneme
```

Artık deneme adında bir repomuz var. Her repo için oluşturacağımız ayarları ilk olarak bu repoda oluşturarak öğrenelim. Repo klasörüne girip conf klasöründe ki snvserve.conf dosyasında bir kaç ayar değiştirelim. Dosya içerisindeki anon-access , auth-access,password-db komutlarının önündeki # işaretlerini kaldırıp kaydedip kapatalım.

Anon-Access anonim okuma izni verir. Eğer tamamiyle özel kullanacak iseniz buraya değer olarak none yazabilirsiniz.

Auth-access yazma izni için şifre istemek içindir.

Password-db ise şifrelerininiz tutulacağı dosyayı belirler. Şimdi o dosyayı nano ile açalım. passwd dosyası repo klasörümüzün conf klasörü içerisinde yer alıyor. yani aynı yerde.

Bu dosya içerisinde kullanıcıadı = şifre şeklinde her satıra bir kullanıcı belirleyebilirsiniz.

Son olarak svn server’ımızı çalıştırıp uzaktan erişime açalım. Komut aşağıda :

`svnserve -d -r /home/svn/repositories`

Artık bir svn server’ımız mevcut. Depoları `svn://svnkullanıcısı@host/depoadı` şeklinde çekebiliriz. Yani bizim site için olsa idi `svn://svn@emre.xyz/deneme` dediğimde eğer anonim erişime kapalı yapmışsak ( anon-access = none ) kullanıcı adı ve şifre isteyecektir, bu bilgileri passwd içerisine zaten yazmıştık.

Hayırlı uğurlu olsun.
