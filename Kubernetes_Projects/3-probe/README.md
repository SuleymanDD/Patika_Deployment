# Kubernetes Pod Yaşam Döngüsü ve Probe'lar Özeti

Bu özet, **Türkçe Kubernetes** kanalının **"Pod Yaşam Döngüsü ve Probe'lar"** videosunda anlatılan Pod'ların durum yönetimini, sağlık kontrollerini (Probes) ve kendi kendini iyileştirme mekanizmalarını içermektedir.

---

## 1. Pod Yaşam Döngüsü (Pod Lifecycle) ve Durumları
Kubernetes'te bir Pod oluşturulduğunda, yaşamı boyunca belirli aşamalardan (Phases) geçer. `kubectl get pods` komutunu çalıştırdığınızda karşınıza çıkan temel durumlar şunlardır:

* **Pending (Beklemede):** Pod tanımı Kubernetes sistemine kabul edilmiş ancak bir veya daha fazla container henüz oluşturulmamıştır. Genellikle Pod'un schedule edilmeyi (uygun bir node bulunmasını) beklediği veya imajın (`image pull`) indirilme aşamasında olduğu durumdur.
* **Running (Çalışıyor):** Pod bir node'a atanmış ve içindeki tüm container'lar oluşturulmuştur. En az bir container şu anda aktif olarak çalışıyor, başlama veya yeniden başlama aşamasındadır.
* **Succeeded (Başarıyla Tamamlandı):** Pod içindeki tüm container'lar görevlerini başarıyla (Exit Code: 0 ile) tamamlamış ve bir daha yeniden başlatılmayacaktır. (Örn: Tamamlanan Kubernetes Job'ları).
* **Failed (Hata Aldı/Başarısız):** Pod içindeki container'lardan en az biri başarısızlıkla (Exit Code sıfırdan farklı bir değerle) sonlanmıştır ve sistem tarafından durdurulmuştur.
* **Unknown (Bilinmiyor):** Pod'un durumu genellikle node ile `kube-apiserver` arasındaki iletişim koptuğunda (network sorunları vb.) alınamaz ve bu duruma düşer.

---

## 2. Sağlık Kontrolleri: Probe Nedir?
Kubernetes'te container'ların sadece "çalışıyor" görünmesi, uygulamanın gerçekten sağlıklı hizmet verdiği anlamına gelmez. Örneğin bir Node.js veya Java uygulaması çalışıyor olabilir (Process canlıdır) ama arkada veritabanına bağlanamadığı için gelen isteklere `500 Internal Server Error` dönüyor olabilir.

Kubernetes, uygulamaların iç sağlığını kontrol etmek için **Probe (Sonda)** mekanizmalarını kullanır. `kubelet` aracı, container'ları periyodik olarak kontrol eder.

---

## 3. Temel Probe Türleri

Videoda uygulamaların sağlığını denetlemek için kullanılan iki kritik probe türü ele alınmaktadır:

### A) Liveness Probe (Canlılık Kontrolü)
* **Amacı:** Container'ın hala canlı ve sağlıklı çalışıp çalışmadığını kontrol eder.
* **Davranışı:** Eğer Liveness Probe başarısız olursa (yani uygulama kilitlendiyse veya yanıt vermiyorsa), Kubernetes o container'ın öldüğüne karar verir ve `restartPolicy` kuralına göre container'ı **otomatik olarak yeniden başlatır (restart)**. Uygulamanın kendi kendini iyileştirmesini (self-healing) sağlar.

### B) Readiness Probe (Hazırlık Kontrolü)
* **Amacı:** Container'ın gelen ağ isteklerini (trafik) kabul etmeye hazır olup olmadığını kontrol eder.
* **Davranışı:** Eğer Readiness Probe başarısız olursa, Kubernetes container'ı **kapatmaz veya yeniden başlatmaz**. Bunun yerine, o Pod'u ilgili **Service'in endpoint listesinden çıkarır**. Yani uygulamaya dışarıdan trafik gönderilmesini engeller. Uygulama ne zaman tekrar hazır olursa, trafiği yeniden yönlendirir. (Örn: Uygulama ayağa kalkarken büyük bir veriyi hafızaya yüklüyorsa o esnada hazır değildir).

---

## 4. Probe Kontrol Yöntemleri (Eylemler)
Kubernetes bir Probe'un başarılı olup olmadığını anlamak için container içinde 3 farklı yöntem çalıştırabilir:

1.  **HTTP Get İsteyi (`httpGet`):** Container'ın belirlenen bir portuna ve endpoint'ine (Örn: `/healthz`) HTTP isteği atılır. Dönen durum kodu `200` ile `400` arasındaysa başarılı sayılır.
2.  **TCP Soket Bağlantısı (`tcpSocket`):** Container üzerindeki belirli bir portun açık olup olmadığı kontrol edilir (Örn: Port 3000 veya 8080). Bağlantı kurulabiliyorsa başarılıdır.
3.  **Komut Çalıştırma (`exec`):** Container içinde özel bir komut (Örn: `cat /tmp/healthy`) koşturulur. Komutun çıkış kodu `0` ise container sağlıklı kabul edilir.

---

## 5. Örnek Probe YAML Tanımı

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: probe-example-pod
spec:
  containers:
  - name: my-app
    image: nginx:latest
    # Canlılık Kontrolü
    livenessProbe:
      httpGet:
        path: /index.html
        port: 8080
      initialDelaySeconds: 15 # Container başladıktan kaç saniye sonra kontrol başlasın
      periodSeconds: 10       # Kaç saniyede bir kontrol edilsin
    # Hazırlık Kontrolü
    readinessProbe:
      httpGet:
        path: /index.html
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
```