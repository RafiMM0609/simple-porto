# SPEC.md — Landing Page "Meja Kerja" (Desktop Only)

## 1. Overview

Landing page desktop yang memanfaatkan **foto meja kerja terintegrasi (full background sudah menyatu dengan laptop fisik di tengah meja)**.
Di atasnya:
- **Layar Laptop (`.laptop-screen`)**: Layer overlay presisi yang menimpa area layar laptop kosong/placeholder pada foto untuk menampilkan project aktif.
- **4 Mini Page**: Halaman lain dari project aktif yang melayang asimetris di sekitar laptop dengan efek kedalaman (depth).
- **Tombol Panah**: Navigasi ganti project yang tampil di layar laptop dan mini page.

**PENTING:**
- Versi mobile SUDAH JADI (< 1024px, Reels/TikTok feed). **JANGAN DIUBAH.**
- SPEC ini khusus untuk versi desktop.

---

## 2. Visual Reference & Background Asset

**Background:** Foto meja kerja terintegrasi (contoh: `assets/background.jpg` atau `assets/studio-desk-bg.jpg`).

**Karakteristik foto:**
- Meja kayu hangat dengan rak buku, tanaman hias, lampu meja, dan laptop fisik (MacBook-style) tepat di tengah.
- **Laptop dan bayangannya sudah menyatu alami di dalam foto** (kontak meja, cast shadow meja, refleksi meja kayu sudah photorealistic bawaan kamera).
- Layar laptop pada foto berupa area layar polos/abu-abu gelap (mockup placeholder) yang siap ditimpa elemen CSS `.laptop-screen`.
- Sumber cahaya foto: jendela di sebelah kanan atas (hangat, natural).
- Arah bayangan alami: jatuh ke kiri-bawah (~40° dari horizontal).

---

## 3. Layout & Arsitektur Layar Laptop

### 3.1 Overlay Layar Laptop (`.laptop-screen`)

Karena bodi laptop sudah ada di foto background, kita **tidak perlu** me-render frame bodi laptop PNG terpisah ataupun bayangan laptop buatan via CSS.

Cukup buat kontainer layar `.laptop-screen` dengan posisi absolute yang pas di atas bezel layar pada foto:

```css
.laptop-screen {
  position: absolute;
  top: var(--laptop-screen-top);
  left: var(--laptop-screen-left);
  width: var(--laptop-screen-width);
  height: var(--laptop-screen-height);
  border-radius: var(--laptop-screen-radius);
  background: var(--laptop-screen-bg);
  overflow: hidden;
  z-index: var(--laptop-screen-z);
}

.laptop-screen video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

*Opsional detail:* Lapisan tipis screen glare/sheen atau notch overlay di bagian atas tengah layar agar video tampak nyata berada di balik kaca bezel laptop.

### 3.2 Posisi Elemen Lain

- **Tombol Panah (Prev/Next)**: Berada di samping kiri dan kanan laptop (atau floating di area kontrol dekat laptop).
- **Mini Page 1**: Kiri depan (paling dekat, paling besar, tajam).
- **Mini Page 2**: Kiri belakang (lebih kecil, sedikit blur, melayang di atas rak/meja).
- **Mini Page 3**: Kanan depan (ukuran sedang, tajam).
- **Mini Page 4**: Kanan belakang (paling kecil, paling blur).

### 3.3 Prinsip Asimetris & Kedalaman (Depth)

- Ukuran dan skala berbeda per layer kedalaman.
- Sedikit rotasi/kemiringan halus (-1.5° s/d 1.5°).
- Overlap natural tanpa menutupi keyboard atau konten utama layar laptop.

---

## 4. Logic Interaksi

### 4.1 Laptop = Frame Utama
- Menampilkan 1 halaman utama dari project yang sedang aktif.
- Halaman default tiap project: **Dashboard**.
- Project dapat diganti melalui tombol panah (atau keyboard arrow).

### 4.2 Tombol Panah = Ganti Project
- Berada di samping area laptop.
- Fungsi: berganti antar project yang ditampilin di layar laptop.
- **Total project: 6 (dinamis, data-driven, mudah ditambah).**
- Contoh: HRIS → Ticketing → Analytics → eCommerce, dll.
- Saat project berganti:
  - Layar laptop transisi halus (fade / slide).
  - Ke-4 mini page ikut berganti otomatis sesuai data sub-halaman project aktif.

### 4.3 Mini Page = Halaman Lain dari Project Aktif
- **4 mini page** (jumlah tetap 4 kartu melayang).
- Menampilkan 4 sub-halaman lain dari project yang sedang aktif di laptop.
  - Contoh (Project HRIS):
    - Laptop: *Dashboard*
    - Mini Page 1: *Manajemen User*
    - Mini Page 2: *Login Page*
    - Mini Page 3: *Presensi & Absensi*
    - Mini Page 4: *Payroll System*
- **Mini page bisa diklik** → membuka Modal Popup.

### 4.4 Modal Popup (Video Theater)
- Muncul saat salah satu mini page diklik.
- Menampilkan konten halaman secara penuh dan detail.
- **Format konten: WEBM (video)** — animasi interaktif, bukan gambar statis.
- Terdapat overlay backdrop gelap di belakangnya.
- Penutupan modal: tombol close, klik area overlay backdrop, atau tombol `ESC`.
- Transisi: animasi fade + scale yang halus dan elegan.

---

## 5. Shadow Logic

### 5.1 Laptop
- **TIDAK PERLU bayangan CSS nempel meja (contact/core/ambient)** karena bayangan fisik laptop sudah terekam sempurna secara alami di foto background.
- Efek pada laptop hanya fokus pada:
  - Inner shadow / border bezel tipis pada `.laptop-screen` agar video menyatu dengan tepi frame foto.
  - Screen glare / pantulan cahaya sudut jendela kanan atas.

### 5.2 Mini Page (Melayang)
Mini page melayang di atas meja sehingga **wajib** memiliki bayangan dinamis yang konsisten dengan arah cahaya dari kanan atas:
- Arah bayangan: kiri-bawah (sudut ~40°).
- Implementasi: pseudo-element `::after` + `radial-gradient` + `blur()` + `transform`.
- Kartu yang lebih tinggi/jauh memiliki blur lebih lebar dan opasitas lebih lembut; kartu yang dekat memiliki bayangan lebih tegas.

---

## 6. Mode Siang / Malam

Mode siang/malam diimplementasikan melalui CSS variables dan overlay filter **tanpa mengganti foto background**:

| Variable | Siang (Day) | Malam (Night) |
|:---|:---|:---|
| `--overlay` | transparan | `rgba(20, 30, 60, 0.45)` |
| `--brightness` | 1.0 | 0.72 |
| `--shadow-opacity` | 0.35 | 0.50 |
| `--shadow-color` | coklat hangat / gelap | biru gelap malam |
| `--highlight` | kuning hangat jendela | biru dingin ambient |

- Dikontrol lewat atribut `[data-mode="night"]` pada tag `<body>` atau root.
- Arah bayangan tetap konsisten (kiri-bawah).
- Transisi antar mode berjalan mulus dan elegan.

---

## 7. Constraint

**JANGAN:**
- Mengubah versi mobile (feed Reels/TikTok mobile sudah jadi).
- Membuat elemen laptop chassis PNG terpisah atau membuat contact shadow laptop di meja (karena laptop sudah menyatu di foto).
- Mengganti file foto saat beralih ke mode malam (wajib pakai filter/CSS overlay).
- Membuat bayangan jatuh ke arah yang salah (harus konsisten ke kiri-bawah).
- Menggunakan font generic standar browser.
- Menuliskan angka/warna/durasi/easing secara hardcoded di dalam komponen (wajib via `variables.css`).
- Menggunakan gambar statis untuk konten mini page dan modal (harus WebM).

**HARUS:**
- Memposisikan `.laptop-screen` secara akurat di atas layar laptop pada background.
- Menjaga arah bayangan mini page konsisten dengan cahaya foto (~40° ke kiri-bawah).
- Menggunakan easing transisi yang elegan dan lembut sesuai aturan `RULES.md`.
- Menjaga arsitektur CSS modular dan terpusat di `variables.css`.
- Memastikan unit test CSS (`npm test`) tetap lolos 100%.

---

## 8. Acceptance Criteria

1. **Terasa Nyata & Alami**: Video di dalam laptop terasa seperti layar menyala asli pada meja kerja di dalam foto.
2. **Posisi Layar Presisi**: `.laptop-screen` menutup pas bidang layar laptop tanpa bocor atau miring.
3. **Navigasi Panah Responsif**: Tombol panah mengganti video di laptop dan meng-update ke-4 mini page.
4. **Mini Page Interaktif**: Ke-4 mini page menampilkan preview sub-halaman dan saat diklik membuka modal popup WebM.
5. **Modal Popup Elegan**: Membuka video WebM besar dengan backdrop gelap dan animasi halus.
6. **Mode Siang / Malam Berfungsi**: Transisi mulus antara mode terang dan temaram.
7. **Versi Mobile Utuh**: Tampilan mobile tidak terpengaruh oleh penyesuaian desktop.
8. **Nilai Terpusat**: Seluruh ukuran, posisi, warna, durasi, dan easing tersimpan di `variables.css`.

---

## 9. Struktur Data Project (JSON/JS)

```javascript
export const PROJECTS = [
  {
    id: "hris",
    name: "Apex HRIS",
    category: "HR & People Ops",
    defaultPage: "Dashboard",
    pages: [
      { id: "dashboard", name: "Executive Dashboard", webm: "./assets/previews/apex-crm.webm", type: "main" },
      { id: "users", name: "Manajemen User", webm: "./assets/previews/apex-crm.webm", type: "sub" },
      { id: "login", name: "Secure Portal Login", webm: "./assets/previews/apex-crm.webm", type: "sub" },
      { id: "absensi", name: "Presensi & Geolocation", webm: "./assets/previews/apex-crm.webm", type: "sub" },
      { id: "payroll", name: "Payroll & Compensation", webm: "./assets/previews/apex-crm.webm", type: "sub" }
    ]
  },
  // 5 project lainnya dengan skema serupa...
];
```

---

## 10. Variabel CSS (`css/variables.css`)

Semua konfigurasi penting disimpan di `variables.css` menggunakan format penamaan `--[komponen]-[properti]-[varian]`.

### 10.1 Posisi & Ukuran Layar Laptop (Overlay Foto)
```css
:root {
  /* Koordinat presisi overlay layar di atas foto meja */
  --laptop-screen-top: 26.8%;
  --laptop-screen-left: 32.7%;
  --laptop-screen-width: 34.6%;
  --laptop-screen-height: 41.2%;
  --laptop-screen-radius: 10px 10px 3px 3px;
  --laptop-screen-bg: #000000;
  --laptop-screen-z: 4;

  /* Screen Sheen & Glare Ambient Reflection */
  --laptop-screen-glare: linear-gradient(135deg, rgba(255, 245, 225, 0.08) 0%, transparent 45%);
}
```

### 10.2 Durasi & Easing Elegan (Sesuai RULES.md)
```css
:root {
  /* Easing Elegan & Halus */
  --ease-elegant: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-hover: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-hover-out: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  /* Durasi */
  --duration-hover: 0.35s;
  --duration-hover-out: 0.3s;
  --duration-transition-project: 0.5s;
  --duration-transition-minipage: 0.35s;
  --duration-transition-modal: 0.4s;
  --duration-transition-mode: 0.6s;
}
```

### 10.3 Posisi Asimetris 4 Mini Page
```css
:root {
  /* Mini Page 1 (Kiri Depan - Besar & Tajam) */
  --minipage-1-top: 22%;
  --minipage-1-left: 8%;
  --minipage-1-scale: 1.0;
  --minipage-1-rotate: -1.2deg;
  --minipage-1-blur: 0px;
  --minipage-1-z: 6;

  /* Mini Page 2 (Kiri Belakang - Lebih Kecil & Soft Blur) */
  --minipage-2-top: 14%;
  --minipage-2-left: 20%;
  --minipage-2-scale: 0.85;
  --minipage-2-rotate: 1deg;
  --minipage-2-blur: 1.2px;
  --minipage-2-z: 5;

  /* Mini Page 3 (Kanan Depan - Sedang) */
  --minipage-3-top: 24%;
  --minipage-3-left: 72%;
  --minipage-3-scale: 0.92;
  --minipage-3-rotate: 1.4deg;
  --minipage-3-blur: 0px;
  --minipage-3-z: 6;

  /* Mini Page 4 (Kanan Belakang - Kecil & Soft Blur) */
  --minipage-4-top: 15%;
  --minipage-4-left: 83%;
  --minipage-4-scale: 0.78;
  --minipage-4-rotate: -1deg;
  --minipage-4-blur: 1.8px;
  --minipage-4-z: 5;
}
```

### 10.4 Shadow Mini Page Melayang
```css
:root {
  --light-angle: 40deg;
  --shadow-color-day: rgba(45, 30, 20, 0.35);
  --shadow-color-night: rgba(10, 18, 35, 0.55);

  /* Directional shadow cast to bottom-left */
  --minipage-shadow-offset-x: -16px;
  --minipage-shadow-offset-y: 18px;
  --minipage-shadow-blur: 24px;
}
```

### 10.5 Mode Siang / Malam
```css
:root {
  --overlay-day: transparent;
  --overlay-night: rgba(18, 26, 48, 0.48);
  --brightness-day: 1.0;
  --brightness-night: 0.72;
  --highlight-day: rgba(255, 230, 180, 0.35);
  --highlight-night: rgba(140, 190, 255, 0.25);
}

[data-mode="night"] {
  --overlay-active: var(--overlay-night);
  --brightness-active: var(--brightness-night);
  --shadow-color-active: var(--shadow-color-night);
  --highlight-active: var(--highlight-night);
}
```