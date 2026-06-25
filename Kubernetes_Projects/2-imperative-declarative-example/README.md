# Kubernetes Imperative ve Declarative Yöntemler Özeti

Bu özet, **Türkçe Kubernetes** kanalının **"Imperative ve Declarative Yöntemler"** videosunda anlatılan yönetim yaklaşımlarını, aralarındaki farkları ve en iyi kullanım senaryolarını içermektedir.

---

## Kullanılmış Olan Komutlar

````yaml
  kubectl create ns logging-ns
  kubectl run hello-k8s --image=cilium/echoserver:1.10.3 --port=8080

  kubectl create -f gcr-deployment
````

---

## 1. Giriş: Kubernetes Nesnelerini Yönetmek
Kubernetes kümesindeki kaynakları (Pod, Deployment, Service vb.) oluşturmak, güncellemek veya silmek için iki temel felsefi yaklaşım kullanılır: **Imperative (Emredici)** ve **Declarative (Bildirimsel)**.

---

## 2. Imperative (Emredici) Yöntem
Imperative yaklaşımda, Kubernetes'e **"ne yapması gerektiğini ve bunu nasıl yapacağını"** adım adım komutlarla söylersiniz. Bilgisayara doğrudan canlı müdahale etmek gibidir.

* **Nasıl Çalışır:** Genellikle `kubectl` CLI araçları ve doğrudan komut satırı parametreleri kullanılır.
* **Örnek Komutlar:**
  * `kubectl run nginx --image=nginx` (Doğrudan bir pod oluşturur)
  * `kubectl scale deployment/nginx-deployment --replicas=5` (Replica sayısını doğrudan günceller)
  * `kubectl expose deployment/nginx-deployment --port=80` (Bir servisi dışarı açar)

### Avantajları:
* Çok hızlıdır; tek bir satırda anında sonuç alırsınız.
* Öğrenmesi kolaydır, YAML yazma veya dosya yönetme zahmeti yoktur.
* Geçici testler, hızlı hata ayıklama (debugging) ve deneysel çalışmalar için mükemmeldir.

### Dezavantajları:
* Yapılan değişikliklerin bir geçmişi (history) tutulmaz.
* Otomasyona veya CI/CD süreçlerine uygun değildir.
* Kümenin durumunu (state) takip etmek zordur; biri komutla bir şeyi değiştirdiğinde bunu diğer ekip üyeleri göremez.

---

## 3. Declarative (Bildirimsel) Yöntem
Declarative yaklaşımda, Kubernetes'e adımları söylemek yerine **"ulaşmak istediğiniz nihai hedefi (istenilen durumu - desired state)"** bir dosya içinde beyan edersiniz. Kubernetes arka planda mevcut durumu inceler ve sizin istediğiniz duruma eşitlemek için ne gerekiyorsa kendisi yapar.

* **Nasıl Çalışır:** Nesne tanımları genellikle `YAML` veya `JSON` dosyalarında saklanır ve `kubectl apply` komutuyla sisteme gönderilir.
* **Örnek Komut:**
  * `kubectl apply -f nginx-deployment.yaml`

### Avantajları:
* **Kod Olarak Altyapı (Infrastructure as Code - IaC):** Sistem mimariniz tamamen dokümante edilmiş olur.
* **Versiyon Kontrolü:** YAML dosyalarını Git (GitHub/GitLab) üzerinde saklayabilir, kimin ne zaman hangi değişikliği yaptığını takip edebilirsiniz (GitOps altyapısı).
* **Kendi Kendini İyileştirme (Self-Healing):** Kubernetes, canlı sistem dosyadaki tanımla uyuşmadığında (örneğin bir pod çöktüğünde) durumu otomatik olarak düzeltir.
* Canlı sistem mimarileri ve prodüksiyon (production) ortamları için tek standarttır.

### Dezavantajları:
* Küçük ve anlık bir değişiklik için bile YAML dosyası yazmak veya düzenlemek gerektiğinden imperative yönteme göre daha yavaştır.
* Öğrenme eğrisi biraz daha diktir (YAML sözdizimi, girintiler, API sürümleri vb.).

---

## 4. Karşılaştırma Özeti

| Özellik | Imperative (Emredici) | Declarative (Bildirimsel) |
| :--- | :--- | :--- |
| **Odak Noktası** | Değişikliğin *nasıl* yapılacağı (Adım adım komutlar) | Hedeflenen durumun *ne* olduğu (YAML beyanı) |
| **Ana Komutlar** | `kubectl run`, `create`, `scale`, `expose` | `kubectl apply -f <dosya>` |
| **Dosya Kullanımı** | Genellikle dosya kullanılmaz, parametreyle yönetilir | Kesinlikle YAML/JSON dosyaları kullanılır |
| **Kullanım Yeri** | Lokal testler, anlık sorgular, hızlı müdahale | Proje canlı ortamları, CI/CD süreçleri, GitOps |
| **Değişiklik Takibi** | Yok (Hafızada veya loglarda kalır) | Yüksek (Git geçmişi üzerinden takip edilebilir) |

---

## 5. Öneri ve Sonuç
Videoda vurgulanan en iyi pratik şudur: **Lokal geliştirme yaparken veya hızlıca bir şeyi test ederken Imperative komutları kullanın. Ancak projenizi canlıya (production) taşırken veya ekip halinde çalışırken mutlaka Declarative (YAML dosyaları) yöntemini tercih edin.**