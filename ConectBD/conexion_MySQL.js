const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl:{
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem')),
    rejectUnauthorized: true
  }
});

db.connect(err => {
  if (err) {
    console.error('❌ Error de conexión:', err);
  } else {
    console.log('✅ Conectado a MySQL en aiven');
  }
});
console.log('📦 Base de datos seleccionada:', process.env.MYSQLDATABASE);

module.exports = db;
