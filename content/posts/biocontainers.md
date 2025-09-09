+++
title = "Biocontainers"
date = "2017-10-11T15:00:56-04:00"
nostr_id = "nevent1qvzqqqr4guq3gamnwvaz7tmjv4kxz7fwv4khyefw0puh5qgkwaehxw309aex2mrp0yhxummnw3ezucnpdejqqg8360srsm7hu3t9mhman8tmczmqsvnx9vvae0zk5et7y977ulzt5qzgtwl6"
+++

Biyoinformatik çalışmak istediğinizde en dik yokuşlardan birisi kullanacağınız yazılımların kurulumu, konfigurasyonu, çalıştırılması süreçleridir. Aldığınız eğitim ne olursa olsun, kullanmak istediğiniz uygulamalara bağlı olarak linux öğrenmeniz gerekebilir, uygulama derlemeyi öğrenmeniz gerekebilir, kullanacağınız uygulamaların bağımlı olduğu uygulamaları bilip kurmanız ve ayarlamanız gerekebilir.

BioContainers tüm bu süreçleri ortadan kaldıran, Biyoinformatik uygulamaları özelinde, Docker Containerlerı hazırlayan, paylaşan bir topluluk.

Konuya tamamen yabancı iseniz devam etmeden önce Docker konusunda Gökhan Şengün'ün yazmış olduğu yazıları öneriyorum.

https://gokhansengun.com/docker-nedir-nasil-calisir-nerede-kullanilir/


Docker’ın ne olduğunu az çok biliyorsanız BioContainers’ı anlamanız sorun olmayacaktır. Zira BioContainers ihtiyacınız olan uygulamaları docker imajları olarak sunuyor. Geniş bir destekçi kitlesi var, kubernetes üzerine deploy edilebiliyor. İhtiyacınız olan bir uygulamanın halihazırda container hali yoksa siz oluşturup katkı yapabilir yahut Github üzerindeki reposuna bir istek açarak oluşturulmasını talep edebilirsiniz.

Registry’si üzerinde 3000'den fazla uygulamanın container’ı oluşturulmuş durumda. Blast’dan fastqc’ye, bwatools’dan kraken’e kadar çoğu uygulama mevcut.

Eres Biyoteknoloji olarak bir sonraki Yeni Nesin Dizileme eğitimimizden itibaren eğitim içeriklerine BioContainers’ı da dahil ederek sağladığımız eğitimi bir adım daha ileri taşıyoruz.

Eres olarak BioContainers’ı hayata geçirmiş olan tüm ekibe teşekkür ediyoruz. Ayrıca sürekli repolarını takip etmeye başladık, ekibimiz de artık BioContainers’a katkı yapmaya başlıyor.

İlk deneme olarak Aliscore v2.0 sürümünün container’ını oluşturduk. Kullanmak isterseniz şuradan ulaşabilirsiniz.

Aliscore Container’ını kullanmak için önce kendi bilgisayarınıza çekmeniz gerekiyor, şu komutla çekebilirsiniz:

```
docker pull eresbiotech/aliscore
```

Container’ı bilgisayarınıza çektikten sonra hızlı bir deneme için örnek fasta dosyasını kullanabilirsiniz, şurada bir tane hazırladık.


nile.fasta adıyla istediğiniz bir dizine kayıt edebilirsiniz. 


Fasta dosyamızı Aliscore’a aşağıdaki şekilde container’ımızı kullanarak verebiliyoruz:

`docker run -v $(pwd):/data/ eresbiotech/aliscore Aliscore.02.2.pl -i /data/example.fasta`

$(pwd) terminalde o an çalışmakta olan dizini veriyor. -v parametresi ile o an çalışılan dizini (içerisinde örnek fasta dosyamız var) container içerisindeki /data/ dizinine bağlıyoruz. Sonrasında Aliscore dökümanında belirtilen şekilde Aliscore’u kullanabiliyoruz.

BioContainers konusunda tüm sorularınızı biocontainers’ın github adresinde issue oluşturarak sorabilirsiniz. Bana sormak istediğiniz her konu için emre@eres.tech adresine eposta gönderebilirsiniz.

Eres Biyoteknoloji olarak eğitimlerimizden haberdar olmak için facebook ve twitter üzerinde bizi takip edebilirsiniz.
