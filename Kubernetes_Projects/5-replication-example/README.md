# Kubernetes Replication Yöntemlerine Genel Bakış Özeti

Bu özet, **Türkçe Kubernetes** kanalının **"Replication Yöntemlerine Genel Bakış"** videosunda anlatılan, uygulamaların sürekliliğini ve ölçeklenebilirliğini sağlamak için kullanılan yöntemleri içermektedir.

---

## Kullanılmış Olan Komutlar

````yaml
    REPLICATION CONTROLLER
    kubectl apply -f rc.yaml
    kubectl get rc
    kubectl get pods
    kubectl delete rc hello-rc

    REPLICASET
    kubectl apply -f rs.yaml
    kubectl get rs
    kubectl get pods
    kubectl delete rs hello-rs
    
    DEPLOYMENT
    kubectl apply -f deploment.yaml
    kubectl get deployments
    kubectl get pods
    kubectl delete deployment hello-dep
````

---

## 1. Replication (Çoğaltma) Nedir?
Kubernetes'te bir uygulamanın (Pod) sadece bir kopyasının çalışması risklidir. Uygulama hata verirse, çökerse veya çalıştığı node (sunucu) arızalanırsa uygulama erişilemez olur. Replication, uygulamanın birden fazla kopyasını çalıştırarak **yüksek erişilebilirlik (high availability)** ve **yük dengeleme (load balancing)** sağlar.

---

## 2. Tarihsel Gelişim ve Yöntemler

### A) ReplicationController (Eski Yöntem)
Kubernetes'in ilk dönemlerinde kullanılan yöntemdir.
* **Görevi:** Tanımlanan sayıda Pod'un (replica) kümede her zaman çalışır durumda olmasını garanti eder.
* **Durumu:** Günümüzde artık kullanımı önerilmemektedir. Yerini daha gelişmiş olan `ReplicaSet`'e bırakmıştır.

### B) ReplicaSet (Modern Yöntem)
`ReplicationController`'ın yerini alan, daha esnek ve güçlü bir kontrolcüdür.
* **En Büyük Farkı:** `Label Selector` (etiket seçici) desteğidir. `ReplicationController` sadece isim bazlı veya basit bir eşleşme kullanırken, `ReplicaSet` çok daha karmaşık ve set bazlı (set-based) etiket seçimi yapabilir.
* **Görevi:** Deployment nesnelerinin arkasındaki "işçi" mekanizmadır. Pod'ları izler ve eksik olanları hemen oluşturur.

### C) Deployment (Üst Seviye Yönetim)
Doğrudan `ReplicaSet` oluşturmak yerine, günümüzde **`Deployment`** kullanılması standarttır.
* **Neden Deployment?** `ReplicaSet` statik bir yapıdadır. Ancak `Deployment` kullandığınızda, uygulamayı güncellemek (Rolling Update), eski sürüme dönmek (Rollback) ve daha akıllı ölçekleme yapmak çok daha kolaydır.
* **İlişki:** Bir `Deployment` oluşturduğunuzda, arka planda Kubernetes aslında sizin için bir `ReplicaSet` yaratır. Siz Deployment ile uğraşırsınız, o sizin yerinize `ReplicaSet`'i yönetir.

---

## 3. Replication Mekanizmasının Temel Avantajları
* **Self-Healing (Kendi Kendini İyileştirme):** Bir Pod silinirse veya Node çökerse, kontrolcü hemen durumu fark eder ve hedeflediğiniz (desired) sayıya ulaşmak için yeni Pod'lar oluşturur.
* **Scaling (Ölçekleme):** Trafik arttığında replica sayısını (`replicas: 1` -> `replicas: 5`) saniyeler içinde artırarak performansı koruyabilirsiniz.
* **Rolling Updates:** Yeni bir versiyona geçerken Pod'ları sırayla güncelleyerek kesinti yaşanmamasını (zero downtime) sağlar.

---

## 4. Özet ve Tavsiye
* `ReplicationController`'ı artık tamamen unutun.
* `ReplicaSet`'i arka planı anlamak için bilin ama günlük işlerinizde doğrudan kullanmayın.
* **Her zaman `Deployment` kullanın.** Uygulamalarınızın canlı kalmasını, versiyon yönetimini ve ölçeklenmesini en sağlıklı şekilde `Deployment` yönetir.