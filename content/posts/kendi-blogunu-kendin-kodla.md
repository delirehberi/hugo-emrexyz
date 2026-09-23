---
title: Kendi blogunu kendin kodla
lang: tr
categories:
  - Yazılım
description: null
date: '2020-09-14T20:00:00-04:00'
draft: false
tags: video
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqrf4k2mnydykkymr0va6kuafdddjkuerfdckkkmmyd3ssl9m9xv
---


Şimdiye kadar öğrendiğimiz konuları birleştirerek, üzerine bir kaç parça daha ekleyerek kendi blogunuzu yapabilirsiniz.
<!--more-->

Olabildiğince basit ve tam tutmaya çalışacağım. Yani fazladan iş kolaylaştırıcı ama kafa karıştırıcı paketler ve araçlar kullanmayacağım.

Önce development ortamımızı kuracağız, bunun için Docker kullanacağız, docker bilmiyorsanız [Gökhan Şengün'ün Docker dökümanlarını](https://gokhansengun.com/docker-nedir-nasil-calisir-nerede-kullanilir/) inceleyebilirsiniz.

Veritabanı olarak PostgreSQL kullanacağız.

HTTP server olarak Nginx kullanacağız.

3 adet Docker Container'ı ayarlayacağız Nginx, PHP ve Postgresql.

Bu containerlar sadece development ortamı için ayarlanmış olacaklar.

Ardından işimiz kolay olsun diye Makefile yazacağız.

Development ortamımız hazır olduktan sonra kodlamaya başlayacağız.

İlk yapacağımız şey Entity'lerimizi oluşturmak. Bu proje için ihtiyacımız olan tek entity Blog adındaki bir entity, kategori vb. hiç bir ek özelliği olmayacak.

Uygulamamızın bir kaç kısımdan oluşacak,
– anasayfada son eklenenden başlayarak blog içerikleri bulunacak
– blog başlığına tıklanınca, detay sayfası açılacak
– admin sayfasına girince yeni blog ekle, düzenle ve sil işlemlerini yapabileceğiz.

İlerleyen süreçlerde yeni konular öğrendikçe yeni özellikler ekleyerek blogumuzu geliştireceğiz. Tasarımsal hiç bir şeye odaklanmayıp bootstrap ile basit bir layout kullanacağım. Siz de kendi temanızı bulabilir yada benim kullandığımı kullanabilirsiniz.

Ayrıca projemizi geliştirirken git kullanacağız, kodları [github/delirehberi/kendi-blogunu-kendin-kodla](https://github.com/delirehberi/kendi-blogunu-kendin-kodla) reposundan ulaşabilirsiniz.

En son olarak da projemizi 5-10 dolarlık bir sunucuya nasıl kurabileceğinizi göstereceğim. SSH ile sunucuya bağlanıp kurulumu tamamlayacağız. Demo uygulamamızı ise youtube-demo.emre.xyz adresinden yayına alacağız.

Şu ana kadar çekilmiş olan videolar; 

[Bölüm 1- Geliştirme ortamı hazırlamak](https://www.youtube.com/watch?v=ECBGIWEjShY)
[Bölüm 2 - Önyüz ve altyapıyı hazırlamak](https://www.youtube.com/watch?v=g_s58-F8VpQ)
[Bölüm 3 - Admin panelini hazırlamak](https://www.youtube.com/watch?v=pnWeidq-FjA)

Her hafta yeni bir bölüm eklenecektir.

