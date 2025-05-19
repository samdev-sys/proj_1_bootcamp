const mongoose =require('mongoose');

const uri='mongodb://localhost:27017/miBaseDeDatos'

mongoose.connect( uri,{
    useNewUrlParser :true,
    useUnifiedTopology :true    
})

.then(()=>console.log ('conexion Exitosa a MongoDB'))
.catch(err =>console.error('Error al conectar:',err));

module .exports =mongoose;