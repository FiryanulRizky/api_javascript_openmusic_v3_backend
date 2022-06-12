# Restful api untuk Aplikasi Open Music v3.0

# Studi Kasus
- Mengembangkan restful api untuk aplikasi OpenMusic dari sisi backend.
- Api ini telah dikembangkan secara berangsur dan saat ini sudah dalam versi akhir yang memiliki fitur menambahkan lagu, membuat playlist, memasukan lagu ke dalam playlist, autentikasi dan autorisasi user, kolaborasi/membagikan playlist kepada pengguna lain, fitur server-side caching untuk mengurangi pekerjaan database, ekspor daftar lagu yang berada di playlist, dan upload gambar untuk sampul album.
- Pengembangan versi sebelumnya bisa cek disini : [Versi 1](https://github.com/FiryanulRizky/api_javascript_openmusic_v1_backend), [Versi 2](https://github.com/FiryanulRizky/api_javascript_openmusic_v2_backend)

# Tools Development
- Node.js v17.2.0
- HAPI js Plugin v20.2.1
- JOI Plugin v17.6.0 (Data Validation)
- RDBMS PostgreSQL v14.2 (Sudah Mendukung Migrasi)

# Uji Postman
Dikarenakan masih sebatas berjalan di sisi backend, maka pengujian restful api dilakukan dengan aplikasi Postman (untuk berkas pengujian ada di folder PostmanTest, lakukan import dan jalankan pengujian otomatis). Berikut adalah hasil pengujian yang telah dilakukan sejauh ini :

![Capture](https://user-images.githubusercontent.com/60762912/171091728-4a2e834c-0464-40a3-830e-efb3b28976e3.PNG)
