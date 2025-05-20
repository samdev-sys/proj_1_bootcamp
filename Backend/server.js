const express = require ('express');
const authRoutes =require('/auth');


const app = express();
app.use( express.json());
app.use (authRoutes);

app.listen(3000, ()=>{
    console.log ('servidor activo en puerto 3000');
});


