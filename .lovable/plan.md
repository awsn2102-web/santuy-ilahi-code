# Plan: Mini Game Random di Challenge #1

## Tujuan
Mengubah challenge #1 ("60-Detik Self Intro") menjadi **Random Mini Game** — kuis cepat melawan waktu, di mana pemain menjawab sebanyak mungkin soal acak dan mendapat skor benar/salah serta XP.

## Perubahan

### 1. Data challenge (`src/data/mockData.ts`)
- Ganti challenge id 1 menjadi: **"Random Quiz Rush"** — ikon baru, deskripsi singkat, XP dinamis.

### 2. Halaman game baru (`/mini-game`)
- Timer countdown (durasi 5 menit, bisa dikonfirmasi).
- Soal acak pilihan ganda (contoh: pertanyaan seputar public speaking, pengetahuan umum, matematika cepat).
- Setiap jawaban langsung lanjut ke soal berikutnya tanpa jeda.
- Counter live: jumlah **benar** dan **salah** di bagian atas.
- Waktu habis → layar hasil:
  - Total benar / salah / akurasi
  - XP yang didapat (misal: benar = +10 XP, salah = 0)
  - Tombol "Main Lagi" dan "Kembali ke Challenges"
- High score tersimpan di localStorage (offline-friendly).
- Desain konsisten dengan tema SpeakUpQuest (unggu/pink/gold, animasi, font yang sama).

### 3. Routing & navigasi
- Daftarkan route `/mini-game` di `App.tsx`.
- Card challenge #1 di halaman Challenges mengarah ke `/mini-game` (challenge lain tetap ke `/practice`).

## Catatan teknis
- Frontend-only, tanpa backend; state game pakai React hooks + localStorage.
- Bank soal acak disimpan di `src/data/mockData.ts` (20–30 soal, di-shuffle tiap sesi).

## Yang perlu dikonfirmasi
- Durasi default 5 menit — sesuai contoh kamu.
- Tema soal: campuran (public speaking + pengetahuan umum + hitungan cepat).
