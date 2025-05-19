const { connection } = require('mongoose');
const mysql= require('mysql2');

const conexion =mysql.createPool({
    host : 'localhost',
    user:'user',
    password:'',
    database:'por definir',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

conexion.connect((err)=>{
    if (err){
        console.error('Error de conexion:', err.stack);
        return;
    }
    console.log('Conectado a MySQL como ID', connection.threadId);
});

connection.end();