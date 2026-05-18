const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // sesuaikan dengan password MySQL kamu
  database: 'db_kerjasama'
});

db.connect((err) => {
  if (err) {
    console.error('Gagal koneksi DB:', err);
    return;
  }
  console.log('Database connected!');
});

module.exports = db;