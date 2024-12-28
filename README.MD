# Aplikasi Manajemen Member

Aplikasi web untuk mengelola data member organisasi.

## Fitur

- Menampilkan daftar member dengan paginasi
- Pencarian member
- Menambah member baru
- Mengubah data member
- Menghapus member
- Manajemen struktur organisasi (superior/atasan)

## Teknologi yang Digunakan

### Backend
- Java Spring Boot
- MySQL Database
- Swagger untuk dokumentasi API

### Frontend  
- Next.js
- TypeScript
- PrimeReact UI Components
- Tailwind CSS

## Struktur Data Member

Data member yang disimpan:
- ID
- Nama
- Email
- Nomor Telepon 
- Posisi/Jabatan
- Departemen
- URL Foto
- Superior/Atasan

## Cara Menjalankan Aplikasi

### Backend
1. Pastikan Java dan MySQL sudah terinstall
2. Buat database MySQL
3. Sesuaikan konfigurasi database di `application.properties`
4. Jalankan aplikasi dengan perintah:
