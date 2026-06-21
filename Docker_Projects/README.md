# PATIKA DEPLOYMENT - DOCKER PROJELERI 🐳

*Bu depo (repository), Patika.dev bünyesindeki Deployment ve DevOps eğitimleri kapsamında geliştirilen Docker projelerini ve uygulamalarını içermektedir. Projeler, temel Dockerfile yapılandırmalarından çoklu konteyner mimarilerine (Docker Compose) kadar uzanan geniş bir yelpazeyi kapsamaktadır.*

--------------------------------------------------------------------------------
## 📌 İçindekiler
- [PATIKA DEPLOYMENT - DOCKER PROJELERI 🐳](#patika-deployment---docker-projeleri-)
  - [📌 İçindekiler](#-i̇çindekiler)
  - [🎯 Proje Amaçları](#-proje-amaçları)
  - [⚙️ Gereksinimler](#️-gereksinimler)
- [🚀 Kurulum ve Kullanım Kılavuzu](#-kurulum-ve-kullanım-kılavuzu)
  - [1️⃣ Tekli Konteyner Uygulamaları (Dockerfile)](#1️⃣-tekli-konteyner-uygulamaları-dockerfile)
  - [2️⃣ Çoklu Konteyner Uygulamaları (Docker Compose)](#2️⃣-çoklu-konteyner-uygulamaları-docker-compose)
- [🛠️ Faydalı Docker Komutları](#️-faydalı-docker-komutları)
- [🌟 En İyi Pratikler (Best Practices)](#-en-i̇yi-pratikler-best-practices)

--------------------------------------------------------------------------------
## 🎯 Proje Amaçları
Bu projelerin temel amacı, bir uygulamanın **yerel geliştirme ortamından canlı ortama (deployment)** taşınması sürecinde Docker teknolojisinin sunduğu avantajları uygulamalı olarak deneyimlemektir:

- Uygulama ve bağımlılıkların izole edilmesi → *“Benim makinede çalışıyordu”* sorununu ortadan kaldırmak  
- Hafif ve optimize edilmiş **Docker imajları (Image)** oluşturmak  
- **Docker Compose** ile mikroservis veya çoklu konteyner mimarilerini tek komutla ayağa kaldırmak  
- **Veri kalıcılığı (Data Persistence)** için Docker Volumes ve güvenli iletişim için Docker Networks yapılandırmalarını kavramak  

--------------------------------------------------------------------------------
## ⚙️ Gereksinimler
Projeleri yerel bilgisayarınızda çalıştırmak için aşağıdaki araçların kurulu olması gerekir:

- Docker Engine (**v20.10+ önerilir**)  
- Docker Compose (**v2.0+ önerilir**)  
- Git 

--------------------------------------------------------------------------------
# 🚀 Kurulum ve Kullanım Kılavuzu

Öncelikle bu depoyu yerel makinenize kopyalayın ve ilgili dizine geçiş yapın:

- `git clone https://github.com/SuleymanDD/Patika_Deployment.git`  
- `cd Patika_Deployment/Docker_Projects`


## 1️⃣ Tekli Konteyner Uygulamaları (Dockerfile)

Yalnızca bir Dockerfile içeren uygulamaları çalıştırmak için:

**A. İmajı Derleyin (Build):**
- `cd single-app`
- `docker build -t patika-single-app:1.0 .`

**B. Konteynerı Çalıştırın (Run):**
- `docker run -d -p 3000:3000 --name my-running-app patika-single-app:1.0`

**C. Uygulamaya erişim:**
👉 [http://localhost:3000](http://localhost:3000)

---

## 2️⃣ Çoklu Konteyner Uygulamaları (Docker Compose)

Veritabanı, Redis veya birden fazla servisin bir arada bulunduğu projeleri çalıştırmak için:

**A. İlgili proje dizinine girin:**
- `cd multi-container-app`

**B. Tüm servisleri başlatın:**
- `docker-compose up -d`

**C. Servislerin durumunu kontrol edin:**
- `docker-compose ps`

**D. Servisleri durdurun ve temizleyin:**
- `docker-compose down`

---

# 🛠️ Faydalı Docker Komutları

Projeleri yönetirken sıkça kullanılan bazı komutlar:

- `docker ps` → Çalışan aktif konteynerleri listeler  
- `docker ps -a` → Durdurulmuş olanlar dahil tüm konteynerleri listeler  
- `docker images` → Yerel makinedeki Docker imajlarını listeler  
- `docker logs <container_id>` → Belirli bir konteynerin log çıktısını gösterir  
- `docker exec -it <container_id> sh` → Konteyner içine etkileşimli terminal açar  
- `docker system prune -a --volumes` → Kullanılmayan imaj, konteyner ve hacimleri temizler  

---

# 🌟 En İyi Pratikler (Best Practices)

Bu projeler geliştirilirken aşağıdaki Docker standartlarına dikkat edilmiştir:

- **Multi-stage Builds** → İmaj boyutlarını minimumda tutmak için derleme ve çalışma ortamları ayrılmıştır  
- **Kullanıcı Yetkileri** → Root yerine kısıtlı yetkilere sahip kullanıcı ile çalıştırılmıştır 
- **Environment Variables** → Hassas veriler `.env` dosyaları üzerinden dinamik olarak yönetilmiştir  
  
<br>

*Skillcamp.dev de bulunan deployment adlı kurs kapsamında geliştirilmiş olan dosyalara bu repodan ulaşılabilir.*
