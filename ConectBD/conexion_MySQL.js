
const mysql= require('mysql2');

const conexion =mysql.createConnection({
    host : '127.0.0.1',
    port:'3307',
    user:'root',
    password:'',
    database:'001_app',
    
})

conexion.connect((err)=>{
    if(err)  {
        console.error('❌ Error de conexión:', err.stack);
        return;
    }
    console.log('🟢 Conectado a MySQL en el puerto 3307');
});


module.exports=conexion;