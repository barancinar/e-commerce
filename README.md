# E-Commerce Fullstack Projesi

Bu proje, modern bir e-ticaret uygulamasının hem backend (ASP.NET Core Web API) hem de frontend (React + Vite + Material UI) tarafını içerir. Kullanıcı yönetimi, JWT authentication, ürün kataloğu, sepet işlemleri ve daha fazlası ile tam işlevsel bir altyapı sunar.

---

## İçerik

-   [Özellikler](#özellikler)
-   [Teknolojiler](#teknolojiler)
-   [Kurulum](#kurulum)
-   [Kullanım](#kullanım)
-   [Proje Yapısı](#proje-yapısı)
-   [Ekran Görüntüleri](#ekran-görüntüleri)

---

## Özellikler

-   Kullanıcı kayıt ve giriş (JWT ile kimlik doğrulama)
-   Ürün kataloğu ve detay sayfası
-   Sepet yönetimi (girişli ve misafir kullanıcı desteği)
-   Sipariş öncesi ürün ekleme/çıkarma
-   Modern ve responsive arayüz (Material UI)
-   Hata yönetimi ve toast bildirimleri
-   Admin paneli (isteğe bağlı)
-   Swagger/OpenAPI ile API dokümantasyonu

---

## Teknolojiler

**Backend:**

-   ASP.NET Core Web API
-   Entity Framework Core (SQLite)
-   Identity (Kullanıcı ve rol yönetimi)
-   JWT Authentication

**Frontend:**

-   React 19 + Vite
-   Material UI (MUI)
-   React Router v7
-   Redux Toolkit
-   React Hook Form
-   Axios
-   React Toastify

---

## Kurulum

### 1. Backend (.NET API)

```bash
cd API
dotnet restore
dotnet ef database update   # Veritabanını oluşturur ve günceller
dotnet run
```

API varsayılan olarak `https://localhost:5173` veya `http://localhost:5173` adresinde çalışır.

### 2. Frontend (React)

```bash
cd Client
npm install
npm run dev
```

React uygulaması varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## Proje Yapısı

```
e-commerce/
│
├── API/                # ASP.NET Core Web API projesi
│   ├── Controllers/
│   ├── Data/
│   ├── Entity/
│   ├── DTO/
│   ├── Services/
│   ├── appsettings.Development.json
│   └── Program.cs
│
├── Client/             # React (Vite) projesi
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── router/
│   │   ├── store/
│   │   └── api/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Kullanım

-   Kayıt ol ve giriş yap.
-   Ürünleri incele, sepete ekle/çıkar.
-   Sepetini görüntüle ve yönet.
-   Admin olarak yeni ürün ekle (isteğe bağlı).

---

## Ekran Görüntüleri

> Buraya uygulamanın ana sayfası, ürün detay, sepet ve giriş/kayıt ekranlarından ekran görüntüleri gelecek.

---

**Not:**  
`.gitignore` dosyası sayesinde `bin/`, `obj/`, `node_modules/`, `Client/build/`, `.env` gibi gereksiz veya hassas dosyalar git'e eklenmez.  
Başka bir bilgisayarda projeyi çalıştırmak için yukarıdaki kurulum adımlarını takip etmen yeterlidir.

---

Her türlü soru ve önerin için iletişime geçebilirsin!
