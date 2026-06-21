# Kubernetes DaemonSet ve Kullanımı Özeti

Bu özet, **Türkçe Kubernetes** kanalının **"Daemonset ve Kullanımı"** videosunda anlatılan temel kavramları, mimari yapıyı ve pratik kullanım senaryolarını içermektedir.

---

## 1. DaemonSet Nedir?
Kubernetes'te bir **DaemonSet (DS)**, kümedeki (cluster) **tüm düğümlerde (nodes) veya belirlenen belirli düğümlerde** bir Pod'un tam olarak bir kopyasının (replicas) her zaman çalışmasını garanti eden bir kontrolcüdür (controller).

* Kümeye yeni bir node eklendiğinde, DaemonSet otomatik olarak o node üzerinde de ilgili Pod'u ayağa kaldırır.
* Bir node kümeden çıkarıldığında, üzerindeki DaemonSet Pod'u çöp toplayıcı (garbage collector) tarafından temizlenir.
* Bir DaemonSet silindiğinde, onun tarafından oluşturulmuş olan tüm Pod'lar da temizlenir.

---

## 2. Tipik Kullanım Senaryoları (Use Cases)
DaemonSet'ler genellikle her sunucuda arka planda (daemon) çalışması gereken altyapısal servisler için kullanılır:

1.  **Log Toplama (Log Collection):** Her node'daki container loglarını merkezi bir yere toplamak için kullanılır.
    * *Örnekler:* `fluentd`, `logstash`, `fluent-bit`.
2.  **Sistem ve Performans İzleme (Monitoring / Metrics):** Sunucu kaynaklarını (CPU, RAM, Disk) izleyen ajanların çalıştırılması.
    * *Örnekler:* `Prometheus Node Exporter`, `Datadog agent`, `New Relic agent`.
3.  **Ağ ve Güvenlik Altyapısı (Cluster Networking):** Küme içi ağ iletişimini veya güvenliğini sağlayan araçlar.
    * *Örnekler:* `calico`, `flannel`, `kube-proxy` (arka planda benzer mantıkla çalışır).

---

## 3. DaemonSet ile Deployment Arasındaki Farklar

| Özellik | Deployment | DaemonSet |
| :--- | :--- | :--- |
| **Pod Dağılımı** | Pod'lar schedule algoritmalarına göre herhangi bir node'a (veya tek bir node'a toplu şekilde) dağılabilir. | Her node'da (veya seçilen her node'da) **kesinlikle tam 1 adet** Pod çalışır. |
| **Replica Sayısı** | `replicas: 3` gibi elle veya HPA ile dinamik olarak belirlenir. | Elle bir sayı verilmez; replica sayısı kümedeki aktif node sayısına bağlıdır. |
| **Kullanım Amacı** | Web uygulamaları, API'ler, mikroservisler (stateless uygulamalar). | Altyapı araçları, loglama, izleme ve network ajanları. |

---

## 4. Belirli Node'ları Hedefleme (Node Selection)
Varsayılan olarak DaemonSet tüm düğümlerde çalışır. Ancak sadece belirli özelliklere (örneğin sadece SSD barındıran veya sadece GPU içeren sunucular gibi) sahip düğümlerde çalışması isteniyorsa şu mekanizmalar kullanılır:

* **`nodeSelector`:** Pod şablonunun (Pod template) içine eklenerek, yalnızca belirtilen etiketlere (labels) sahip node'ların seçilmesini sağlar.
* **`nodeAffinity`:** `nodeSelector`'a göre çok daha esnek kurallar (örneğin "şu etikete sahip olsun ama bu etikete sahip olmasa da olur" gibi esnek veya katı kurallar) tanımlamaya izin verir.

---

## 5. apps/v1 Geçişindeki Kritik Kurallar (Hatırlatma)
Güncel Kubernetes sürümlerinde (`apps/v1`) bir DaemonSet tanımlanırken şu iki alanın **birebir eşleşmesi (match)** zorunludur:
1.  `spec.selector.matchLabels`
2.  `spec.template.metadata.labels`

Eğer bu etiketler eşleşmezse Kubernetes mimarisi DaemonSet'in hangi Pod'ları kontrol edeceğini anlayamaz ve geçersiz nesne hatası (`Invalid value`) fırlatır.