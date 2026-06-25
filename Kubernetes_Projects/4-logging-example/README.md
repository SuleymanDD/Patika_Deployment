# Kubernetes Cluster'da Loglama Özeti

Bu özet, **Türkçe Kubernetes** kanalının **"Cluster'da Loglama"** videosunda anlatılan temel kavramları, logların yaşam döngüsünü ve log yönetim stratejilerini içermektedir.

---

## Kullanılmış Olan Komutlar

````yaml
    kubectl create ns logging-ns

    kubectl create -f logger.yaml
    kubectl get pods --namespace=logging-ns
    kubectl describe pod logger-pod

    kubectl logs -n logging-ns --tail=5 logger-pod -c logger-container
    kubectl logs -f -n logging-ns --since=10s logger-pod -c logger-container

    kubectl create -f one-time.yaml
    kubectl get pods --namespace=logging-ns
    kubectl describe pod one-time-pod -n logging-ns

    kubectl logs  -n logging-ns --tail=5 one-time-pod -c one-time-container
    kubectl logs -f -n logging-ns --since=10s one-time-pod -c one-time-container

    kubectl get events --namespace=logging-ns
````

---

## 1. Loglama Neden Önemli?
Kubernetes dağıtık bir sistemdir. Bir uygulama hata verdiğinde, o uygulamanın hangi sunucuda (node) çalıştığını bulmak, içine girip logları okumak manuel olarak neredeyse imkansızdır. Loglama, sistemin "gözü kulağıdır"; hata ayıklama (debugging), performans analizi ve denetim için kritiktir.

---

## 2. Kubernetes'te Log Akışı
Kubernetes'te standart bir container, loglarını `stdout` (standart çıktı) ve `stderr` (standart hata) kanallarına basar.

* **Container Engine:** Container'ı çalıştıran araç (Docker, containerd vb.), bu logları yakalar ve yerel diskte bir dosyaya yazar.
* **Kubelet:** Node üzerinde çalışan `kubelet`, bu dosyaların yerini bilir ve `kubectl logs <pod-name>` komutu çalıştırıldığında bu logları diskten okuyup kullanıcıya gösterir.

---

## 3. Log Yönetim Stratejileri
Kubernetes'te logları yönetmek için üç ana yaklaşım vardır:

### A) Node Düzeyinde Log Toplama (En Yaygın)
Her node üzerinde bir **"Log Agent"** (log toplayıcı ajan) çalıştırılır. Bu ajan, node üzerindeki log dosyalarını sürekli takip eder (`tail` eder) ve bunları merkezi bir log sistemine gönderir.
* **Avantaj:** Her pod için ayrı bir ayar yapmaya gerek yoktur.
* **Araçlar:** `Fluentd`, `Fluent Bit`, `Logstash`.

### B) Sidecar Container Yöntemi
Her uygulamanın olduğu Pod'un içine, sadece logları yönetmek için ikinci bir "Sidecar" container eklenir.
* **Nasıl çalışır:** Ana uygulama logları bir dosyaya yazar, Sidecar container bu dosyayı okuyup dışarıya (merkezi sisteme) gönderir.
* **Kullanım Yeri:** Uygulama logları `stdout`'a basamıyorsa veya logların üzerinde özel bir işleme (formatlama, filtreleme) yapılması gerekiyorsa kullanılır.

### C) Uygulama Düzeyinde Loglama
Uygulamanın kendisinin logları bir ağ üzerinden doğrudan log yönetim sistemine göndermesidir.
* **Dezavantaj:** Uygulamanın içine log kütüphanesi gömmek zorunda kalırsınız; bu da uygulamayı dış sisteme bağımlı hale getirir. Genelde önerilmez.

---

## 4. Merkezi Log Yönetim Sistemi (Log Aggregator)
Dağıtık bir yapıda logların tek bir merkezde toplanıp indekslenmesi ve görselleştirilmesi gerekir. Endüstride en popüler yığın **EFK Stack**'tir:
* **E (Elasticsearch):** Logların depolandığı ve arama yapılabilen veritabanı.
* **F (Fluentd):** Logları toplayıp Elasticsearch'e taşıyan ajan.
* **K (Kibana):** Logları görselleştiren ve dashboard oluşturan arayüz.

---

## 5. Özet Tavsiye
1. Uygulamalarınızı logları her zaman `stdout` / `stderr`'e basacak şekilde tasarlayın.
2. Cluster genelinde log toplamak için **DaemonSet** olarak çalışan `Fluentd` veya `Fluent Bit` gibi ajanlar kullanın.
3. Topladığınız logları mutlaka Elasticsearch gibi merkezi bir sistemde indeksleyip Kibana üzerinden takip edin.