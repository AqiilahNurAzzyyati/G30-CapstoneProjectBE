const express = require('express');
const router = express.Router();
const db = require('./db'); // Modul koneksi database
const bcrypt = require('bcrypt');

// Rute untuk pendaftaran pengguna
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Hash kata sandi sebelum menyimpannya
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Terjadi kesalahan dalam pendaftaran:', err);
            res.status(500).json({ error: 'Terjadi kesalahan dalam pendaftaran' });
            return;
        }

        // Simpan data pengguna ke dalam database
        const sqlInsertUser = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
        db.query(sqlInsertUser, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Terjadi kesalahan dalam pendaftaran:', err);
                res.status(500).json({ error: 'Terjadi kesalahan dalam pendaftaran' });
                return;
            }

            res.status(201).json({ message: 'Pendaftaran berhasil' });
        });
    });
});

// Rute untuk login pengguna
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const sqlCheckUser = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheckUser, [email], (err, result) => {
        if (err) {
            console.error('Terjadi kesalahan dalam login:', err);
            res.status(500).json({ error: 'Terjadi kesalahan dalam login' });
            return;
        }

        if (result.length === 0) {
            res.status(401).json({ error: 'Email atau kata sandi salah' });
        } else {
            const user = result[0];

            // Periksa apakah kata sandi cocok
            bcrypt.compare(password, user.password_hash, (err, passwordMatch) => {
                if (err) {
                    console.error('Terjadi kesalahan dalam login:', err);
                    res.status(500).json({ error: 'Terjadi kesalahan dalam login' });
                    return;
                }

                if (passwordMatch) {
                    // menghasilkan token atau mengatur sesi pengguna
                    res.status(200).json({ message: 'Login berhasil' });
                } else {
                    res.status(401).json({ error: 'Email atau kata sandi salah' });
                }
            });
        }
    });
});

module.exports = router;