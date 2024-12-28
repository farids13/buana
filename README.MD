# Aplikasi Buana

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

### Frontend
1. Pastikan Node.js sudah terinstall
2. Clone repository
3. Masuk ke direktori frontend
4. Install dependencies:
```bash
npm install
```
5. Jalankan aplikasi dengan perintah:
```bash
cd FE
npm run dev:buana
```

### Backend
1. Pastikan Java dan PostgreSQL sudah terinstall
2. Buat database PostgreSQL
3. Sesuaikan konfigurasi database di `application.properties`
4. Jalankan aplikasi dengan perintah:

```bash
cd BE
mvn clean install
```

```bash
cd BE
mvn spring-boot:run
```

