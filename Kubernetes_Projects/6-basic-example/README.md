# Kubectl ve İlk Deployment Özeti

Bu özet, **Türkçe Kubernetes** kanalının **"Kubectl ve İlk Deployment"** videosunda anlatılan `kubectl` kullanımını, ilk deployment oluşturma adımlarını ve Kubernetes nesne yönetiminin temel prensiplerini içermektedir.

---

## Kullanılmış Olan Komutlar

````yaml
    DEMO-ROLLOUT
    kubectl run hello-k8s --image=cilium/echoserver:1.10.3 --port=8080
    kubectl expose deployment hello-k8s --type=NodePort
    kubectl port-forward hello-k8s-[...] 8080:8080
    kubectl scale deployment.v1.apps/hello-k8s  --replicas=2

    CONTEXT
    kubectl config get-contexts
    kubectl config use-context docker-for-desktop
````

---

## 1. Kubectl Nedir?
`kubectl`, Kubernetes kümenizle iletişim kurmanızı sağlayan bir komut satırı aracıdır. Kubernetes API'sine istek gönderen bir elçi görevi görür. 
* **İşlevi:** Küme hakkında bilgi almak, nesneleri yönetmek, uygulamaları başlatmak, durdurmak ve izlemek için kullanılır.
* **Bağlantı:** Küme ile konuşabilmek için `~/.kube/config` dosyasındaki yapılandırma bilgilerini kullanır.

---

## 2. İlk Deployment Oluşturma (Imperative Yöntem)
Videoda, bir uygulamayı ayağa kaldırmanın en hızlı yolu olan "Imperative" (komut tabanlı) yöntem gösterilmektedir:

```bash
kubectl run hello-world --image=cilium/echoserver:1.10.3 --port=8080
```
Bu komut ile Kubernetes:
1. Bir **Deployment** nesnesi oluşturur.
2. Belirtilen imajı (image) çeker.
3. Uygulamayı bir Pod içinde çalıştırır.

---

## 3. Temel `kubectl` Komutları
Küme yönetimi sırasında en çok kullanılan komutlar:

* **`kubectl get pods`**: Mevcut tüm Pod'ları listeler.
* **`kubectl get deployments`**: Mevcut deployment'ları ve durumlarını gösterir.
* **`kubectl describe pod <pod-adi>`**: Bir Pod hakkında çok detaylı (olaylar, hatalar, yapılandırma) bilgi verir.
* **`kubectl logs <pod-adi>`**: Uygulamanın ürettiği çıktıları (logları) terminale döker.
* **`kubectl delete deployment <deployment-adi>`**: Bir deployment'ı ve onunla ilişkili olan her şeyi (pod'lar dahil) siler.

---

## 4. Kubernetes'te "Desired State" (İstenilen Durum) Kavramı
Bu videodaki en kritik kavramlardan biri **"Desired State"** (İstenilen Durum) mekanizmasıdır:
* Kubernetes'e "İşte bu durumda bir uygulama istiyorum" dersiniz.
* Kubernetes sürekli sistemi izler. Eğer çalışan bir Pod çökerse veya bir nedenden dolayı silinirse, Kubernetes bunu anında fark eder ve yeni bir Pod oluşturarak sistemi sizin istediğiniz duruma geri getirir.

---

## 5. Özet Tavsiye
* **Keşfetmek için `kubectl`:** Yeni başlayanlar için `kubectl` komutlarını bolca kullanıp neler olduğunu gözlemlemek (özellikle `describe` komutu ile) sistemi anlamanın en iyi yoludur.
* **Yönetim için `YAML`:** İlk deployment'ı komutla yapsanız da, gerçek dünyada mutlaka `YAML` dosyaları üzerinden çalışmayı öğrenmelisiniz (Declarative yöntem).