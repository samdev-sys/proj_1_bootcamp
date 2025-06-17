const express = require('express');
const cors =require('cors');
const db=require('./ConectBD/conexion_MySQL');
const bodyParser = require('body-parser');
const app= express();
const PORT =3000;


app.use (cors());
app.use(bodyParser.json());

app.use(express.static('public'));

// CRUD para users
app.post('/users',(req,res) =>{
    const { nombre,usuario, email,contraseña, pregunta, respuesta} =req.body;
    const sql = 'INSERT INTO users (nombre, usuario, email, contraseña, pregunta, respuesta) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [ nombre, usuario, email, contraseña, pregunta, respuesta], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Usuario registrado' });
});
});

app.get('/users', (req,res)=>{
    const sql='SELECT * FROM users';
    db.query(sql, (err, results)=>{
        if(err) return res.status (500).send (err);
        res.send(results);

    })
});
app.delete()



app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:3000')
})