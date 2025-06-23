# Eco Marketplace Dashboard

**Capstone Project – Coding Camp DBS Foundation 2025**

## 📌 Deskripsi Proyek

Eco Marketplace Dashboard adalah aplikasi web berbasis dashboard yang dikembangkan sebagai bagian dari program capstone dengan tema **Green Economy and Green Jobs**. Tujuan utama aplikasi ini adalah menyediakan antarmuka manajemen yang efisien bagi admin untuk memantau data produk, pengguna, dan penjualan dari platform **Eco Marketplace**, yang berfokus pada produk-produk ramah lingkungan.

Dashboard ini dirancang dengan fokus pada **efisiensi**, **kemudahan penggunaan**, dan **keberlanjutan** dalam mendukung transformasi digital berwawasan lingkungan.

## 🧑‍💻 Peran

**Fullstack Developer**  
Bertanggung jawab dalam pengembangan frontend dan backend menggunakan teknologi modern berbasis JavaScript/TypeScript.

## 🚀 Teknologi yang Digunakan

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Express.js + TypeScript](https://expressjs.com/)
- **Database:** [MySQL](https://www.mysql.com/) dengan [Prisma ORM](https://www.prisma.io/)
- **HTTP Client:** Axios

---

## 📂 Fitur Utama

- Manajemen Data Produk
- Monitoring Penjualan
- Pengelolaan Data Pengguna
- Dashboard Analitik Sederhana
- Autentikasi dan Role-based Access (opsional)

---

## 🛠️ Instalasi dan Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/fajarfauzian/Final-Coding-Camp-DBS.git
cd Final-Coding-Camp-DBS
cd eco-market-backend
npm install

Konfigurasi .env
Buat file .env dan sesuaikan:

DATABASE_URL="mysql://username:password@localhost:3306/db_market(bebas)"
PORT=2000

Lalu jalankan Prisma:
npx prisma generate
npx prisma migrate dev

Jalankan server backend:
npm run dev

Setup Frontend:

cd eco-market-frontend
npm install

Konfigurasi .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:2000

Jalankan frontend:
npm run dev

Akses dashboard di: http://localhost:3000

👥 Tim Proyek
Fajar Fauzian – Fullstack Developer
Muhammad Yazid Wiliadi - Frontend Developer
Albi Ariza Syafiq - Fullstack Developer
Dinda Mei Sabela - Frontend Developer
Muhammad Zakki Mubarroq - Machine Learning Engineer
Hirzi Dian Alfianzah - Machine Learning Engineer

🌱 Kontribusi terhadap Green Economy
Aplikasi ini dikembangkan sebagai bagian dari inisiatif untuk mendukung ekosistem digital berkelanjutan, dengan memberikan alat bantu bagi pengelola pasar produk ramah lingkungan.

