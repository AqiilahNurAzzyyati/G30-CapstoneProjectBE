const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const db = require('./db'); // Modul koneksi database
const routes = require('./routes'); // Modul rute aplikasi
const bcrypt = require('bcrypt');

// Middleware untuk mengizinkan akses ke aset statis
app.use(express.static('public'));
// Middleware untuk mengurai JSON
app.use(bodyParser.json());

// show html
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/view/home.html')
})

// Menggunakan rute dari routes.js
app.use('/', routes);

// Middleware untuk menangani kesalahan (error handling)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan dalam server.');
});

// Jalankan server Anda
app.listen(port, () => {
    console.log('Server berjalan di http://localhost:${port}');
});