# 📦 Stockop (jStock) — Gudang Teknik

> Sistem manajemen stok untuk **Gudang Teknik Pelabuhan Belawan** (PT Pelindo Multi Terminal).
> Dibangun selama internship **Magenta MSIB** (Oct 2023 — Aug 2024).

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

- 👥 **Multi-user role** (admin / user)
- 📦 CRUD barang dengan kategori, satuan, lokasi
- 🔄 **Peminjaman barang** — request → approve → return workflow
- 📥 **Pengambilan barang** konsumable (cat, kawat las, mur baut, dll)
- 📊 Dashboard dengan stats real-time
- 📋 Excel export untuk laporan
- 🎨 **Responsive** desktop + mobile

## 🚀 Quick Start (Demo Mode)

```bash
cd client
npm install
npm run dev -- -p 3000

# Buka http://localhost:3000
# Demo login:
#   admin / admin123  → admin dashboard
#   user  / user123   → user view
```

**Demo mode:** Saat backend API tidak tersedia, app otomatis pakai dummy data (12 peminjaman + 11 pengambilan barang teknik realistis).

## 📂 Project Structure

```
jstockop-teknik/
├── client/                   # Next.js 14 (App Router)
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/
│   │   │   ├── (auth)/       # Login route group
│   │   │   ├── admin/        # Admin pages
│   │   │   └── users/        # User pages
│   │   └── dummyData.ts      # Demo fallback data
│   └── public/
└── server/                   # Backend API (hosted di Vercel)
```

## 🛠️ Tech Stack

**Frontend (client/):**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + NextUI components
- Axios (HTTP)
- Framer Motion (animations)
- React Toastify (notifications)
- React Icons

**Backend (server/):**
- Hosted di Vercel (separate deployment)

## 🔄 Recent Updates (Juni 2026)

- ✨ **Login responsive** — mobile-first design, modern gradient
- ✨ **Demo mode** — `admin/admin123` login tanpa backend
- ✨ **Dummy data** — 12 peminjaman + 11 pengambilan realistis
- ✨ **UI refactor** — sidebar bersih, stats cards, no more empty viewport
- 🐛 Fixed sidebar badge overflow (custom inline Counter)

## 👤 Author

**Jerrel Adriel A Hutahaean**
Fullstack Developer · Jakarta, Indonesia

- 🌐 Portfolio: [jerreladriel.github.io](https://jerreladriel.github.io)
- 💼 LinkedIn: [jerrelhutahaean](https://www.linkedin.com/in/jerrelhutahaean)

---

📚 **Full documentation** di [Portfolio Documentation](https://github.com/JerrelAdriel/JerrelAdriel.github.io/blob/main/DOCUMENTATION.md).
