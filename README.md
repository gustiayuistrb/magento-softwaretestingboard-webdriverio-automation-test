# magento-softwaretestingboard-webdriverio-automation-test

## Disclaimer
Sebelum menjalankan pengujian, harap diperhatikan bahwa URL website ini terkadang menampilkan iklan. Untuk pengalaman pengujian yang lebih baik, disarankan untuk menggunakan DNS anti-iklan, seperti *Adguard*, sebelum menjalankan tes.

## Proyek Automasi Pengujian
Proyek ini bertujuan untuk melakukan automasi pengujian pada website [Magento Software Testing Board - Fusion Backpack]
URL : (https://magento.softwaretestingboard.com/fusion-backpack.html). 
### Fitur yang Diuji

1. **Fitur Tambahkan ke Keranjang**
   - **Skenario 1:** Menambahkan produk ke keranjang dengan kuantitas valid.
     - **Test Case 1.1:** Tambahkan ke keranjang dengan kuantitas 1.
     - **Test Case 1.2:** Cek kuantitas dan informasi produk di detail sama dengan yang ada di keranjang.
   - **Skenario 2:** Menambahkan produk ke keranjang dengan kuantitas tidak valid.
     - **Test Case 2.1:** Tambahkan ke keranjang dengan kuantitas 0.
     - **Test Case 2.2:** Tambahkan ke keranjang dengan kuantitas -1.
     - **Test Case 2.3:** Tambahkan ke keranjang dengan kuantitas lebih dari yang tersedia (9999 dan 10000).
     - **Test Case 2.4:** Tambahkan ke keranjang dengan mengosongkan kuantitas.

2. **Review Produk**
   - **Skenario 1:** Mengakses tab ulasan produk.
     - **Test Case 1.1:** Menekan tab ulasan di bawah gambar produk.
     - **Test Case 1.2:** Menekan tombol jumlah ulasan di bawah nama produk.
   - **Skenario 2:** Mengirimkan ulasan produk.
     - **Test Case 2.1:** Mengirim ulasan dengan semua kolom input terisi.
     - **Test Case 2.2:** Mengirim ulasan dengan rating bintang 1.
     - **Test Case 2.3:** Mengirim ulasan dengan rating bintang 5.
     - **Test Case 2.4:** Mengirim ulasan tanpa rating.
     - **Test Case 2.5:** Mengirim ulasan tanpa nickname.
     - **Test Case 2.6:** Mengirim ulasan tanpa summary.
     - **Test Case 2.7:** Mengirim ulasan tanpa isi review.
     - **Test Case 2.8:** Mengirim ulasan tanpa mengisi input.

### Prasyarat
Sebelum menjalankan tes, pastikan Anda telah menginstal perangkat lunak berikut:
- [Node.js](https://nodejs.org/) (versi terbaru)
- [WebdriverIO](https://webdriver.io/)

### Struktur Proyek
   - **tests/ :** Berisi file pengujian untuk fitur Tambahkan ke Keranjang dan Review Produk.
   - **pageobjects/ :** Berisi kelas untuk mengelola interaksi dengan halaman web.
   - **wdio.conf.js :** Berisi konfigurasi untuk WebdriverIO.

### Instalasi
1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/repo-name.git
2. Masuk ke direktori proyek:
   ```bash
   cd repo-name
3. Install dependensi yang diperlukan:
   ```bash
   npm install
4. Untuk menjalankan tes automasi, gunakan perintah berikut:
   ```bash
   npx wdio run wdio.conf.js
  atau
  ```bash
   npm run wdio



