# SERVER PRIA JAWA — Website Komunitas

Website statis (HTML/CSS/JS vanilla) untuk komunitas Discord
**SERVER PRIA JAWA**, bertema Kerajaan Jawa + Gaming Sosial.
Bisa langsung di-host di GitHub Pages, Netlify, atau Vercel — tidak
perlu build step apapun.

## Struktur folder

```
server-pria-jawa/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/   -> logo, favicon, foto staff
    ├── gallery/  -> foto galeri (foto1.jpg, foto2.jpg, dst.)
    └── music/    -> playlist (track1.mp3, track2.mp3, dst.)
```

## 1. File/folder yang perlu kamu isi manual

| Yang diisi | Lokasi | Catatan |
|---|---|---|
| Logo komunitas | `assets/images/logo.png` | Dipakai di navbar, hero, footer. Bentuk bulat (akan otomatis di-crop jadi lingkaran). |
| Favicon | `assets/images/favicon.png` | Idealnya 512×512 atau 32×32, hasil crop dari logo. |
| Foto Owner | `assets/images/staff-owner.jpg` | Foto Riii4yy. |
| Foto Admin | `assets/images/staff-admin.jpg` | Foto Iel. |
| Foto Moderator | `assets/images/staff-mod.jpg` | Foto Vympel. |
| Foto galeri | `assets/gallery/foto1.jpg`, `foto2.jpg`, dst. | Tinggal timpa file dengan nama yang sama. Tambah foto baru? Tambahkan barisnya di array `gallery` dalam `script.js`. |
| Musik | `assets/music/track1.mp3`, `track2.mp3`, dst. | Tinggal timpa file dengan nama yang sama. Tambah lagu baru? Tambahkan barisnya di array `playlist` dalam `script.js` dan beri judulnya. |

Selama file belum ditambahkan, halaman **tidak akan rusak** — logo/foto
hanya akan disembunyikan otomatis, dan player musik akan menampilkan
pesan "File musik belum tersedia".

## 2. Cara mengaktifkan musik kalau ada masalah autoplay

Browser modern (Chrome, Safari, Firefox) memblokir autoplay audio
dengan suara. Website ini sudah menyiasati dengan:

1. Audio diputar otomatis dalam keadaan **muted** saat halaman dibuka.
2. Muncul banner emas kecil di pojok kanan atas: **"Klik untuk
   nyalakan musik"**.
3. Begitu banner (atau bagian manapun di halaman) diklik, audio
   langsung unmute dan lanjut main dengan suara.

Kalau musik tetap tidak bunyi setelah diklik:
- Pastikan file mp3 di `assets/music/` sudah ada dan namanya cocok
  dengan yang tertulis di array `playlist` pada `script.js`.
- Cek volume slider di mini player (pojok kanan bawah) tidak di posisi 0.
- Beberapa browser mobile (Safari iOS) butuh interaksi sentuh langsung
  di tombol player, bukan klik di luar elemen — tombol play/pause di
  hero section atau mini player akan selalu bekerja.

## 3. Cara update angka `totalMemberManual`

Buka `script.js`, cari baris ini di bagian atas fungsi statistik member:

```js
const totalMemberManual = 0; // <-- ganti angka ini sesuai jumlah member asli
```

Ganti `0` dengan jumlah total member server kamu saat ini, lalu simpan.
Angka **Member Online** tidak perlu diisi manual — itu sudah otomatis
terambil real-time dari Discord Widget API
(`presence_count` dari endpoint widget.json server kamu).

> Catatan: kalau widget Discord server di-disable, fetch akan gagal dan
> halaman otomatis fallback ke angka 0 supaya tidak error. Pastikan
> **Server Widget** diaktifkan di Discord: *Server Settings → Widget →
> Enable Server Widget*.

## 4. Cara menambah staff baru (termasuk mengisi slot Wira/Helper)

Staff ditulis langsung di `index.html`, di bagian section
`<section id="staff">`. Setiap staff adalah satu blok:

```html
<div class="staff-card staff-card--mod">
  <span class="staff-card__badge staff-card__badge--orange">MODERATOR</span>
  <div class="staff-card__avatar" data-img="assets/images/staff-mod.jpg">
    <span class="staff-card__emoji">⚔️</span>
  </div>
  <h3 class="staff-card__name">Vympel</h3>
  <p class="staff-card__alias">Moderator</p>
  <p class="staff-card__role">Senopati 『 MODERATOR 』</p>
</div>
```

**Untuk mengisi slot Wira (Helper) yang masih kosong:**
1. Cari blok dengan class `staff-card--empty` (badge "HELPER", style
   garis putus-putus).
2. Ganti isinya seperti contoh di atas: emoji, foto (`data-img`), nama,
   alias, dan role tetap `Wira 『 HELPER 』`.
3. Hapus class `staff-card--empty` dan tombol "Mau jadi Helper? Daftar
   di sini" jika slot sudah terisi.
4. Tambahkan foto staff baru ke `assets/images/` dengan nama file yang
   kamu pakai di `data-img`.

**Untuk menambah staff baru (role lain):**
1. Copy salah satu blok `<div class="staff-card ...">...</div>`.
2. Ganti badge warna (`staff-card__badge--gold/pink/orange`, atau buat
   warna baru di `style.css` pada bagian `.staff-card__badge--`).
3. Ganti emoji, nama, alias, role, dan `data-img`.
4. Tempel di dalam `.staff-grid`, di posisi urutan yang diinginkan.

---

Semua warna situs diatur lewat CSS variables di bagian atas
`style.css` (`:root { --c-gold: ...; --c-black: ...; }`) — jadi kalau
mau ubah nuansa warna, cukup edit di satu tempat itu.
