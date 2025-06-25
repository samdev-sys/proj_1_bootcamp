const express = require('express');
const cors =require('cors');
const db=require('./ConectBD/conexion_MySQL');
const bodyParser = require('body-parser');
const app= express();
const PORT =3000;

app.use (express.json());
app.use (cors());

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// CRUD para users
app.post('/users',(req,res) =>{
    const { nombre,usuario, email,password, pregunta, respuesta} =req.body;
    const sql = 'INSERT INTO users (nombre, usuario, email, password, pregunta, respuesta) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [ nombre, usuario, email, password, pregunta, respuesta], (err, result) => {
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
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { nombre, usuario, email, password, pregunta, respuesta } = req.body;

    if (!nombre || !usuario || !email || !password || !pregunta || !respuesta) {
        return res.status(400).send({ message: 'Faltan datos en la solicitud' });
    }

    const sql = 'UPDATE users SET nombre=?, usuario=?, email=?, password=?, pregunta=?, respuesta=? WHERE id=?';
    db.query(sql, [nombre, usuario, email, password, pregunta, respuesta, userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Usuario no encontrado' });

        res.send({ message: `Usuario con ID ${userId} actualizado correctamente` });
    });
});
app.delete('/users/:id', (req, res)=>{
    const userId=  req.params.id;
    const sql='DELETE  FROM users WHERE id=?';

    db.query(sql,[userId],(err,result)=>{
        if(err) return res.status(500).send (err);
        if(result.affectedRows === 0 ) return  res.status(404).send({message:'usuario no encontrado'});

        res.send({ message: `Usuario con ID ${userId} eliminado correctamente` });
    });
});

// CRUD para tasks

app.post('/tasks',(req,res) =>{
    const { user, asunto, descripcion, store_URL, tipo_archivo, fecha_de_creacion, Estado} =req.body;
    const sql = 'INSERT INTO tasks (user, asunto, descripcion, store_URL, `tipo_archivo`, fecha_de_creacion, Estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ user, asunto, descripcion, store_URL, tipo_archivo, fecha_de_creacion, Estado], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'tarea creada' });
});
});

app.get('/tasks', (req,res)=>{
    const sql='SELECT * FROM tasks';
    db.query(sql, (err, results)=>{
        if(err) return res.status (500).send (err);
        res.send(results);

    });
});
app.put('/tasks/:id', (req, res) => {
    const tasksId = req.params.id;
    const { user, asunto, descripcion, store_URL, tipo_archivo, fecha_de_creacion, Estado } = req.body;

    if (!user || !asunto || !descripcion || !store_URL || ! tipo_archivo || !fecha_de_creacion || !Estado) {
        return res.status(400).send({ message: 'Faltan datos en la solicitud' });
    }

    const sql = 'UPDATE  tasks SET user=?, asunto=?, descripcion=?, store_URL=?, tipo_archivo=?, fecha_de_creacion=?, Estado=? WHERE id_tarea=?';
    db.query(sql, [user, asunto, descripcion, store_URL, tipo_archivo, fecha_de_creacion, Estado, tasksId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'la tarea no existe' });
        res.send({ message: `tarea con ID ${tasksId} actualizada correctamente` });
    });
});
app.delete('/tasks/:id', (req, res)=>{
    const userId=  req.params.id;
    const sql='DELETE  FROM tasks WHERE id_tarea=?';

    db.query(sql,[userId],(err,result)=>{
        if(err) return res.status(500).send (err);
        if(result.affectedRows === 0 ) return  res.status(404).send({message:'tarea no encontrada'});

        res.send({ message: `tarea con ID ${userId} eliminado correctamente` });
    });
});

// validacion de usuarios
app.post('/login',(req,res)=> {
    console.log('Datos recibidos:', req.body);
    const {user,password}=req.body;

    const sql ='SELECT *FROM users WHERE usuario =? AND password=?';
    db.query(sql,[user,password],(err,results)=>{
        if (err) return res.status (500).json({error:'Error en el servidor'});
        if(results.length >0){
            res.json({success: true, message:'Inicio se sesion correcto', user:results[0]});
        }else{
            res.json({success:false,message:'usuario o password incorrecta'});
        }
    });
});
// CRUD URLS

// guardar urls
app.post('/urls', (req, res) => {
  const { userId, url } = req.body;
  if (!userId || !url) {
    return res.status(400).json({ message: 'faltan datos' });
  }

  const checkUser = "SELECT id FROM users WHERE id = ?";
  console.log("Insertando URL:", url, "para userId:", userId);

  db.query(checkUser, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    const insert = "INSERT INTO urls (url, user_id) VALUES (?, ?)";
    console.log("Intentando guardar:", { url, userId });
    db.query(insert, [url, userId], (err2) => {
      if (err2) {
  console.error("Error MySQL al insertar:", err2);
  return res.status(500).json({ message: err2.message });
}

      res.status(200).json({ message: "guardado con éxito" });
    });
  });
});

// GET: mostrar URLs
app.get('/urls/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT url FROM urls WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});
// eliminar URLs
app.delete('/urls/:id',(req,res)=>{
    const {id}=req.params;
    const sql= "DELETE FROM urls WHERE id =?";
    db.query(sql, [id],(err,result)=>{
        if(err) return res.status (500).json({error:err});
        if(result.affectedRows===0){
            return res.status(404).json({message:'URL no encontrada'});
        }
        res.status(200).json({message:'URL eliminada correctamente'});
    });
});

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:3000')
})