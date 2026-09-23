---
title: Unix girdi cikti yonlendirme
lang: tr
categories:
  - Yazılım
description: null
date: '2019-09-22T20:00:00-04:00'
draft: false
tags: null
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqr36ku6tc94nkjunydykkx6ttw35j67t0dekx2mnyd9ex6egd9p34c
---


Bir önceki yazıda belirttiğim unix türevi sistemlerde efektif çalışma konusunun bir tık ilerisine girdi-çıktı yönlendirme konusunu koyabiliriz. Bahsettiğimiz pipe(|) işlemi aslında bir girdi-çıktı yönlendirme operatörüdür. Önce terminalde girdi-çıktı türlerine bakıp nasıl ve neden yönlendirebiliriz bir görelim.
<!--more-->
İlk bilmeniz gereken şey unix türevi sistemler üzerinde bulunan her şeyin birer dosya olduğudur. Tüm klasörler, linkler, cihaz bağlantıları vs birer dosyadır. Harddisk bir dosyadır, webcam bir dosyadır, ses kartı bir dosyadır. 

Her dosyanın ne olduğunu belirten bir `file descriptor` olarak ifade edilen  tanımlayıcısı vardır. Pozitif sayılardan oluşabilen bu değer dosyanın ne olduğunu belirtir. 3 adet standart file descriptor mevcuttur. 0,1,2 olarak belirtilmiş sayılar sırasıyla stdin, stdout, stderr olarak belirlenmiştir. 0 dosyanın (herşey dosya olduğu için girdi ve çıktılar da dosyadır) standart bir girdi olduğunu, 1 dosyanın standart çıktı olduğunu, 2 ise  dosyanın standart hata olduğunu gösterir.

Yani biz `cat` komutunu parametre vermeden çalıştırdığımızda sonuç olarak `stdin` türünde bir dosyamız oluyor. Standart girdi türü haliyle bizim veri girmemizi bekliyor. 

Eğer `echo "xyz"` komutunu çalıştırırsak `stdout` türünde bir dosya üretmiş oluyoruz. Ekrana `xyz` basmış oluyor.

Son olarak `ls /xyz` komutunu çalıştırdığımızda ise `stderr` türünde bir dosya üretmiş oluyoruz ve ekrana hata basılıyor.

Geçen yazıda gördüğümüz pipe üzerinden basit bir örnek yapabiliriz. `ls /var/log/syslog` ve `sed "s/syslog/xyz/"` komutlarını birleştirerek ufak bir işlem yaparsak sonuç olarak ekranda `/var/log/xyz` çıktısını göreceğiz. 

```
$ ls /var/log/syslog|sed "s/syslog/xyz/"
/var/log/xyz
```

Pipelining bu kadardı zaten. Bir çıktıyı al diğer uygulamaya girdi olarak ver. Fakat eğer `ls /var/log/emre.xyz|sed "s/syslog/xyz/"` komut çalıştırırsak ne olur? Hata verecek ve `sed` komutu çalışmayacak değil mi? Hayır, `sed` komutumuz her durumda çalışacak. Çünkü mantıksal bir işlem yapmıyoruz. Peki o zaman, `sed` komutu çalışıyor ise, hata mesajındaki bir şeyi değiştirebilir miyiz?

```
ls /var/log/emre.xyz|sed "s/syslog/xyz/"
ls: cannot access '/var/log/emre.xyz': No such file or directory
```
Hata mesajımızdaki cannot kısmını değiştirmek isteyelim örneğin. `ls /var/log/emre.xyz|sed "s/cannot/xyz/"` komutunu çalıştırmamız gerekecek.

```
ls /var/log/emre.xyz|sed "s/cannot/xyz/"
ls: cannot access '/var/log/emre.xyz': No such file or directory
```

Fakat o da ne? `sed` hata mesajını görmüyor. Çünkü `sed` in beklediği şey `stdout` fakat ekrandaki hata mesajı `stderr` türünde. Bu sebeple `sed` bu mesajı görmezden gelecek.

Peki nasıl yapacağız? İşte konumuza geldik. Bir türü diğerine yönlendirmemiz gerekecek.

Daha mantıklı bir senaryoda ise, yaptığınız tüm işlemlerin sonucunu bir dosyaya yazmak isteyebilirsiniz. Hata mesajını ya da başarılı işlemleri bir yere yazabilmek için de yine çıktı yönlendirme yapmanız gerekecek.


Girdi - çıktı yönlendirme yapabilmek için kullanabileceğiz 6 adet operatör mevcut. Tabi ki sadece 6 tane değil. Ancak biz 6 tanesinden bahsedeceğiz sık kullanılabilecek olanlar olarak. Hepsini hızlıca birer örnek ile göreceğiz. `>`,`<`,`>>`,`<<`,`<&`,`|` olmak üzere 6 adet operatör mevcut.

### Şuraya gönder operatörü >

`echo "hello world" > dosya.md` şeklinde kullanılıyor. Sol taraftan gelen `stdout` çıktısını `dosya.md` adında bir dosyaya yönlendiriyor. `stdout` bekleyen her yere yönlendirme yapabilirsiniz.

### Şuradan al operatörü <

`grep "awesome" < ls *.aww`  şeklinde kullanılıyor. Sağ taraftan gelen `stdout` verisini sol tarafa parametre olarak yönlendiriyor.

### Şuraya göm operatörü >>

`echo "hello" >> msgs.md` şeklinde kullanılıyor. Sol taraftaki çıktıyı sağ taraftaki dosyaya ekliyor. `>` tüm çıktıyı eski veri var ise üzerine yazarken `>>` üzerine yazmak yerine eski verinin yanına ilişitiriveriyor.

### Şuradan getir operatörü <<

```
grep 'dene' << MSG
> deneme
> dene
> densiz
> MSG
```

Şeklinde kullanılıyor. `stdin` kaynağına yönlendirmeyi sağlıyor. Operatörden sonra verilen kelimeyi görene kadar `stdin` sizden veri bekliyor, kelimeyi gördüğünde işleme başlıyor. Bu operatör en çok `bash` dosyaları yazarken işinize yarayacaktır.

### Şunla birleştir operatörü >&

`ls / 1>&2 |sed 's/bin/can/'` şeklinde kullanılıyor. Normalde `stdout` olarak verilen çıktıyı `stderr` olarak çeviriyor. Bunu hata verse de `stdout` olarak işlemek istediğiniz yerlerde kullanabilirsiniz. Yukarıda bahsettiğimiz `ls /var/log/emre.xyz|sed "s/syslog/xyz/"` komutundan dönen hata mesajını artık şu şekilde kullanabiliriz.

```
ls /var/log/emre.xyz 2>&1|sed "s/cannot/xyz/"
ls: xyz access '/var/log/emre.xyz': No such file or directory
```


### Şundan al buna ver |

Bunun üzerinden tekrar geçmeyeceğim. Sol taraftaki `stdout` u al sağ tarafa `stdin` olarak ver işlemi için kullanabileceğinizi zaten biliyorsunuz. 

