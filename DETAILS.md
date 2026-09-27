# DETAILS.md — Detail Visual & Adjustment

**Current Version:** v1.5
**Last Updated:** 2026-09-27

---

## Changelog

### v1.5 (current)
- Hapus breadcrumb & traffic light dari mini page
- Bersihin mini page dari elemen browser

### v1.4
- Fix border mini page (terlalu tebal)
- Fix shadow mini page (terlalu solid)
- Tambah kesan tipis di mini page

### v1.3
- Fix shadow mini page (kurang tegas)
- Geser mini page kiri (nutupin buku)
- Fix tombol panah (highlight)
- Fix judul & tag (kurang nyatu)

### v1.2
- Tambah shadow dinamis mini page
- Tambah highlight mini page
- Color grade mini page
- Tambah backdrop filter judul & badge

### v1.1
- Fix mini page (shadow, perspektif, color grade)
- Fix tombol panah
- Fix layar laptop
- Fix judul & badge

### v1.0
- Initial spec

---

## 1. Mini Page — Prioritas Utama

### 1.1 Border (v1.4)

**Masalah:** Border terlalu tebal, mini page keliatan kayak "kartu tebal".

**Fix:**
```css
.mini-page {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}
```

**Aturan:**
- Border **1px atau 0.5px** — jangan lebih
- Warna **rgba(255, 255, 255, 0.1)** — tipis banget
- Radius **8px** — jangan terlalu bulat
- Jangan pakai border tebal (>2px) — bikin keliatan kayak frame

### 1.2 Shadow (v1.4)

**Masalah:** Shadow terlalu solid dan deket, mini page keliatan "ditempel".

**Fix:**
```css
.mini-page {
  box-shadow: 
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    -15px 20px 30px rgba(0, 0, 0, 0.4),
    -5px 8px 15px rgba(0, 0, 0, 0.3);
}
```

**Aturan:**
- Blur: **25-30px** (lebih blur)
- Opacity: **0.3-0.4** (lebih transparan)
- Jarak: **15-20px** X, **20px** Y (kiri-bawah)
- Arah: **kiri-bawah** (konsisten sama cahaya jendela)
- Tambah **inner shadow** tipis buat kesan tipis

### 1.3 Background (v1.4)

**Masalah:** Background solid, mini page keliatan "berat".

**Fix:**
```css
.mini-page {
  background: rgba(20, 25, 40, 0.95);
  /* atau gradient tipis */
  background: linear-gradient(180deg, rgba(25, 30, 45, 0.95), rgba(15, 20, 35, 0.95));
}
```

**Aturan:**
- Background **semi-transparan** (opacity 0.95)
- Atau **gradient tipis** dari atas ke bawah
- Jangan solid penuh

### 1.4 Perspektif (v1.1)

**Masalah:** Mini page tegak lurus 100%, padahal meja miring.

**Fix:**
- Mini page kiri: `transform: perspective(1000px) rotateY(5deg)`
- Mini page kanan: `transform: perspective(1000px) rotateY(-5deg)`

**Aturan:**
- Cukup **3-7 derajat** — jangan overdo
- Sesuaikan sama vanishing point foto

### 1.5 Color Grade (v1.1)

**Masalah:** Warna mini page terlalu cerah/saturasi tinggi.

**Fix:**
```css
.mini-page {
  filter: sepia(0.1) brightness(0.95) saturate(0.9);
}
```

### 1.6 Highlight (v1.1)

**Fix:**
```css
.mini-page::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 220, 150, 0.15), transparent);
  pointer-events: none;
}
```

### 1.7 Hapus Breadcrumb & Traffic Light (v1.5)

**Masalah:** Mini page punya traffic light (3 titik) dan breadcrumb (`productzero.io/...`) yang bikin:
- Salah konteks (ini preview halaman, bukan window macOS)
- Berat visual
- Nggak fungsional
- Inkonsisten sama laptop

**Fix:**
- ❌ Hapus traffic light (3 titik merah-kuning-hijau)
- ❌ Hapus breadcrumb / URL bar
- ❌ Hapus window controls
- ❌ Hapus tab browser
- ✅ Sisakan **konten halaman aja**

**Aturan:**
- Mini page = **preview halaman**, bukan **screenshot browser**
- Cuma nampilin **kontennya**, bukan **frame browser**-nya

### 1.8 Posisi (v1.3)

**Masalah:** Mini page kiri depan nutupin buku di rak.

**Fix:**
- Geser sedikit ke kanan
- Atau kecilin sedikit
- Biar nggak nutupin buku

---

## 2. Tombol Panah (v1.3)

**Masalah:** Kurang keliatan, warnanya gelap, nggak ada shadow.

**Fix:**
```css
.arrow-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    -4px 6px 12px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 220, 150, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
}

.arrow-button:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 
    -6px 8px 16px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(255, 220, 150, 0.2);
  transform: scale(1.1);
}
```

**Aturan:**
- Arah shadow: **kiri-bawah** (konsisten)
- Posisi: kiri & kanan laptop
- Vertikal: sejajar tengah laptop

---

## 3. Layar Laptop (v1.3)

**Masalah:** Konten di layar keliatan "digital", nggak nyatu sama frame.

### 3.1 Refleksi

```css
.laptop-screen::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  pointer-events: none;
}
```

### 3.2 Glow

```css
.laptop-screen {
  box-shadow: inset 0 0 30px rgba(255, 220, 150, 0.05);
}
```

### 3.3 Color Grade

```css
.laptop-screen video,
.laptop-screen img {
  filter: sepia(0.05) brightness(0.95);
}
```

---

## 4. Judul "Discover Our Web Products" (v1.3)

**Masalah:** Keliatan kayak elemen HTML yang ditempel.

**Fix:**
```css
.section-title {
  font-family: [font yang sesuai, bukan generic];
  color: #ffffff;
  text-shadow: 
    -2px 3px 8px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 220, 150, 0.1);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 5. Tag (All Products, SaaS & CRM, dll) (v1.3)

**Masalah:** Keliatan "ditempel", nggak ada shadow.

**Fix:**
```css
.tag {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  box-shadow: 
    -2px 3px 8px rgba(0, 0, 0, 0.3),
    0 0 15px rgba(255, 220, 150, 0.05);
  padding: 6px 12px;
  color: #ffffff;
}
```

---

## 6. Judul Project "Aura AI v2.0" (v1.2)

**Fix:**
```css
.project-title {
  font-family: [font yang sesuai, bukan generic];
  color: #ffffff;
  text-shadow: 
    -2px 3px 8px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(255, 220, 150, 0.1);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 7. Badge "productzero" (v1.2)

**Fix:**
```css
.brand-badge {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 100;
  filter: drop-shadow(-2px 3px 6px rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.2);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 8. Toggle Mode (v1.2)

**Fix:**
```css
.mode-toggle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 
    -3px 4px 10px rgba(0, 0, 0, 0.3),
    0 0 15px rgba(255, 220, 150, 0.1);
  padding: 8px 12px;
}
```

---

## 9. Prioritas Perbaikan

| Prioritas | Item | Versi | Status |
|:---|:---|:---|:---|
| 🔴 Tinggi | Hapus breadcrumb & traffic light | v1.5 | 🚧 |
| 🔴 Tinggi | Border mini page (terlalu tebal) | v1.4 | 🚧 |
| 🔴 Tinggi | Shadow mini page (terlalu solid) | v1.4 | 🚧 |
| 🔴 Tinggi | Shadow mini page (kurang tegas) | v1.3 | 🚧 |
| 🟡 Sedang | Mini page kiri nutupin buku | v1.3 | 🚧 |
| 🟡 Sedang | Tombol panah highlight | v1.3 | 🚧 |
| 🟡 Sedang | Judul & tag kurang nyatu | v1.3 | 🚧 |
| 🟢 Rendah | Layar laptop refleksi | v1.3 | 🚧 |

---

## 10. Constraint

**JANGAN:**
- Overdo shadow (nanti keliatan kayak di-paint)
- Perspektif terlalu ekstrem (>10°)
- Color grade terlalu kuat (nanti keliatan aneh)
- Pakai font generic
- Border tebal (>2px)
- Shadow solid (harus blur)
- Background solid (harus semi-transparan)
- Traffic light / breadcrumb di mini page

**HARUS:**
- Arah bayangan konsisten (kiri-bawah)
- Sudut cahaya konsisten (~40°)
- Color grade tipis (5-10%)
- Border tipis (1px)
- Shadow blur (bukan solid)
- Background semi-transparan
- Mini page = preview halaman (bukan screenshot browser)
- Semua nilai pakai CSS variable di `variables.css`

---

## 11. Catatan Teknis

- **Scope:** cuma versi desktop
- **Background:** gambar gabungan `workspace.png` (meja + laptop + shadow)
- **Layar laptop:** area solid gelap di gambar, di-overlay konten via CSS
- **Shadow laptop:** di-bake ke gambar (bukan CSS)
- **Shadow mini page:** pseudo-element CSS (karena melayang)
- **Mapping mini page:** mapRange + easeOutQuad
- **CSS variable:** siang/malam + semua nilai penting
- **Konten modal:** webm (video)
- **Project:** 6 saat ini, dinamis
- **Halaman default:** Dashboard
