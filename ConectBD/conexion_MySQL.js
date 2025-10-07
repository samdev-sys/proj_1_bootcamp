const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl:{
    ca:process.env.MYSQL_CA_CERT,
    rejectUnauthorized:true
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
