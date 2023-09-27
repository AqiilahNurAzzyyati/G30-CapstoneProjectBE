const mysql = require('mysql2');

// Buat koneksi ke server MySQL
const connection = mysql.createConnection({
    host: 'localhost',       
    user: 'root',            
    password: '447733',    
    database: 'login_crud'      
});

// Koneksikan ke MySQL
connection.connect((err) => {
    if (err) {
        console.error('Terjadi kesalahan saat menghubungkan ke MySQL:', err);
        throw err;
    }
    console.log('Terhubung ke MySQL');
});

module.exports = connection;