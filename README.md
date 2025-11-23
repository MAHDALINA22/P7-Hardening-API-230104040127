📘 Praktikum 7 — Web Service Engineering (WSE) 20251
Hardening API: Security + Logging + Monitoring
Nama: Mahdalina
NIM: 230104040127
Kelas: Isi kelas kamu (misal: TI-4B)
## 1️⃣ Deskripsi Singkat

Praktikum ini meningkatkan keamanan dan observabilitas RESTful API hasil UTS dengan menambahkan:

Middleware keamanan (Helmet, CORS restriction, Rate Limit)

Logging request menggunakan Morgan

Monitoring API melalui /api/health, /api/info, dan /api/metrics

Global Error Handler

Handler 404 Not Found

Struktur modular (Routes, Controllers, Middleware)

Variabel environment menggunakan .env

API ini sudah siap untuk digunakan pada production-level minimal.

## 2️⃣ Teknologi dan Library
Kategori	Tools
Runtime	Node.js 18+
Framework	Express.js
Keamanan	Helmet, CORS, express-rate-limit
Logging	Morgan
Env Config	Dotenv
Monitoring	/health, /info, /metrics
Dokumentasi	Postman, README.md
## 3️⃣ Instalasi & Cara Menjalankan
Clone repository
git clone <repo-kamu>
cd <nama-folder>

Install dependencies
npm install

Buat file .env

Isi seperti berikut:

PORT=3000
NODE_ENV=development
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MIN=1
ALLOWED_ORIGINS=http://localhost:5173

Jalankan server
npm start


Akses API melalui:
👉 http://localhost:3000

## 4️⃣ Struktur Folder
project/
│── app.js
│── server.js
│── package.json
│── .env
│── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── logs/
└── README.md

## 5️⃣ Endpoint API
📌 CRUD Resource (articles)
Method	Endpoint	Deskripsi
GET	/api/articles	Mendapatkan semua data
GET	/api/articles/:id	Mendapatkan data berdasarkan ID
POST	/api/articles	Menambah data baru
PUT	/api/articles/:id	Mengubah data berdasarkan ID
DELETE	/api/articles/:id	Menghapus data berdasarkan ID
📌 Informasi Service
Method	Endpoint	Deskripsi
GET	/api/info	Metadata API & identitas service
📌 Monitoring
Method	Endpoint	Deskripsi
GET	/api/health	Mengecek status API, uptime, env
GET	/api/metrics	Memory usage, OS info, uptime
📌 Error Handling
Method	Endpoint	Deskripsi
ANY	endpoint tidak dikenal	Handler 404 Global
ERROR	internal server error	Global Error Handler
## 6️⃣ Cuplikan Kode Penting
✔ Endpoint /api/info
app.get("/api/info", (req, res) => {
  res.status(200).json({
    service: "Article API Service",
    version: "1.0.0",
    author: "Mahdalina (230104040127)",
    env: process.env.NODE_ENV || "development",
    time: new Date(),
  });
});

✔ 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

✔ Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

## 7️⃣ Screenshot Wajib (Total 9)

GET all articles

GET article by ID

POST (tambah data)

PUT (update data)

DELETE data

GET /api/info

GET /api/health

404 Error (endpoint salah)

500 Error (simulasi global error handler)

## 8️⃣ Link Repository GitHub

👉 https://github.com/username/repo-mahdalina

(isi nanti setelah upload)

## 9️⃣ Kesimpulan

Melalui praktikum ini, API berhasil diperkuat dengan:

Middleware keamanan modern

Pembatasan request (rate-limiting)

Logging terstruktur

Monitoring service real-time

Sistem error handling yang rapi

Pemisahan konfigurasi menggunakan .env

API kini lebih aman, terawasi, dan siap untuk digunakan di lingkungan yang lebih serius.
