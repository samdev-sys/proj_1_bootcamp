const mysql = require('mysql2');

const config = {
  host: process.env.MYSQLHOST || 'localhost',
  port: process.env.MYSQLPORT || 3306,
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'taskflow',
  connectTimeout: 10000
};

if (process.env.MYSQL_CA_CERT) {
  config.ssl = {
    ca: process.env.MYSQL_CA_CERT,
    rejectUnauthorized: false
  };
}

const db = mysql.createConnection(config);

db.connect(err => {
  if (err) {
    console.error('⚠️  Error de conexión a MySQL:', err.message);
    console.log('   El servidor continuará sin base de datos.');
  } else {
    console.log('✅ Conectado a MySQL en', config.host);
  }
});

db.on('error', err => {
  console.error('⚠️  Error en conexión MySQL:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('   Intentando reconectar...');
  }
});

module.exports = db;
