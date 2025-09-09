---
title: Kendi blogunu kendin kodla
description: null
date: '2020-09-14T20:00:00-04:00'
draft: false
tags: video
nostr_id: >-
  nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqz9rhwden5te0wfjkccte9ejxzmt4wvhxjmcprpmhxue69uhhyetvv9ujuumwdae8gtnnda3kjctvqyxhwumn8ghj7mn0wvhxcmmvqyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqppamhxue69uhkummnw3ezumt0d5q3vamnwvaz7tmjv4kxz7fwdehhxtnnda3kjctvqyd8wumn8ghj7ctjw35kxmr9wvhxcctev4erxtnwv4mhxqg7waehxw309akkcuewv94kgetwd9azuetyw5h8gu30dehhxarjqqsp4x482xjnmgczepckk7yy47vrg6xqt0kfmeucswqwxumnhxe69tg4qqcws
type: yaml
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

