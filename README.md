# desain-web — Horizon Landing

Kerangka landing page dengan komponen **Horizon Hero Section** (Three.js + GSAP)
dari [21st.dev](https://21st.dev/r/lovesickfromthe6ix/horizon-hero-section).

Stack:

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS 3**
- **Three.js** + **GSAP** (untuk hero 3D animation)
- Struktur folder ala **shadcn/ui** (`src/components/ui/`) — siap ditambah komponen lain via `npx shadcn@latest add ...`

---

## 1. Prasyarat

Pastikan sudah terpasang:

- **Node.js** versi 18 atau lebih baru — cek dengan `node -v`
- **npm** (sudah ikut Node) — cek dengan `npm -v`

Kalau belum ada Node.js, download dari [nodejs.org](https://nodejs.org/) (LTS).

---

## 2. Clone & Install

```bash
git clone https://github.com/ericmulyono2/desain-web.git
cd desain-web
npm install
```

`npm install` akan otomatis memasang semua dependency yang dibutuhkan:

| Package                  | Fungsi                                          |
| ------------------------ | ----------------------------------------------- |
| `react`, `react-dom`     | Library UI                                      |
| `three`, `@types/three`  | Render scene 3D (bintang, gunung, nebula)       |
| `gsap`                   | Animasi judul, scroll trigger                   |
| `tailwindcss`            | Utility-first CSS                               |
| `vite`                   | Dev server + bundler                            |
| `typescript`             | Type-safety                                     |

---

## 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser. Halaman akan otomatis reload setiap kamu ubah file.

---

## 4. Build untuk Production

```bash
npm run build
```

Output ada di folder `dist/` — tinggal di-upload ke hosting statis (Vercel, Netlify, Cloudflare Pages, Nginx, dsb).

Preview hasil build secara lokal:

```bash
npm run preview
```

---

## 5. Struktur Folder

```
desain-web/
├── index.html                    # Entry HTML (font Inter di-load di sini)
├── package.json                  # Dependencies + scripts
├── tailwind.config.js            # Konfigurasi Tailwind
├── postcss.config.js
├── tsconfig.json                 # Konfigurasi TypeScript
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                # Konfigurasi Vite + alias "@" -> src
└── src/
    ├── main.tsx                  # Entry React, mount ke #root
    ├── App.tsx                   # Halaman utama (taruh section baru di sini)
    ├── index.css                 # @tailwind base/components/utilities + global style
    ├── lib/
    │   └── utils.ts              # Helper cn() untuk gabung className
    └── components/
        └── ui/
            └── horizon-hero-section.tsx   # Komponen hero (Three.js + GSAP)
```

---

## 6. Cara Pakai Komponen Hero

Sudah dipasang otomatis di `src/App.tsx`. Mau pakai di file lain? Begini:

```tsx
import HorizonHeroSection from "@/components/ui/horizon-hero-section";

export default function Page() {
  return (
    <main>
      <HorizonHeroSection />

      {/* Tambah section baru di bawah hero */}
      <section className="relative z-10 bg-black py-24 px-6 text-white">
        <h2 className="text-4xl font-bold">About</h2>
        {/* ... konten kamu ... */}
      </section>
    </main>
  );
}
```

**Catatan penting:**

- Hero ini memakan **3 layar** (3 section, total ~300vh) karena pakai scroll-based camera animation.
- Canvas Three.js di-render dengan `position: fixed` di belakang konten. Section baru di bawah hero harus pakai `bg-...` (background solid) supaya tidak transparan.
- Body **tidak boleh** punya `overflow: hidden` — animasi kamera mengikuti scroll.

---

## 7. Menambah Komponen shadcn/ui Lain

Folder `src/components/ui/` sudah mengikuti konvensi shadcn. Untuk menambah komponen dari [ui.shadcn.com](https://ui.shadcn.com) atau [21st.dev](https://21st.dev), kamu bisa:

**A. Manual (paling aman)** — copy file `.tsx` dari registry ke `src/components/ui/`, lalu install dependency-nya:

```bash
npm install <nama-package>
```

**B. Via CLI shadcn** — pertama init dulu (sekali):

```bash
npx shadcn@latest init
```

Lalu add komponen:

```bash
npx shadcn@latest add button
npx shadcn@latest add https://21st.dev/r/.../...
```

---

## 8. Tips Performa

Komponen hero cukup berat di perangkat low-end (5000 bintang + bloom pass). Kalau perlu di-tune:

- Buka `src/components/ui/horizon-hero-section.tsx`
- Cari `const starCount = 5000;` — turunkan ke `2000` untuk mobile
- Cari blok `UnrealBloomPass` — bisa di-skip dengan kondisi `if (window.innerWidth > 768)`

---

## 9. Scripts yang Tersedia

| Command          | Keterangan                                |
| ---------------- | ----------------------------------------- |
| `npm run dev`    | Jalankan dev server (hot reload)          |
| `npm run build`  | Build production ke folder `dist/`        |
| `npm run preview`| Preview hasil build secara lokal          |

---

## 10. Troubleshooting

**`npm install` lambat / gagal di Indonesia**  
Coba pakai registry mirror:

```bash
npm install --registry=https://registry.npmmirror.com
```

**Build error `Cannot find module 'three/examples/...'`**  
Sudah di-handle — repo ini pakai path modern `three/addons/...` yang kompatibel dengan Three.js 0.169+.

**Hero hitam tanpa animasi**  
Pastikan browser support WebGL: buka [get.webgl.org](https://get.webgl.org). Hardware acceleration di Chrome harus ON (Settings → System → Use hardware acceleration).

---

## Lisensi

Pribadi / belum ditentukan. Komponen hero asli dari [lovesickfromthe6ix on 21st.dev](https://21st.dev/r/lovesickfromthe6ix/horizon-hero-section).
