const express = require('express');
const app= express();
const cors =require('cors');
const db=require('./ConectBD/conexion_MySQL');
const bodyParser = require('body-parser');

const PORT =3000;


app.get("/tasks/one/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT id_tarea, asunto, descripcion, Estado
    FROM tasks
    WHERE id_tarea = ?
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("Error al obtener tarea:", err);
      return res.status(500).json({ message: "Error al consultar la tarea" });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(rows[0]); // devolvemos solo la tarea
  });
});



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

app.post("/tasks", (req, res) => {
  const {
    user_id,
    asunto,
    descripcion,
    store_URL,
    tipo_archivo,
    fecha_de_creacion,
    Estado,
  } = req.body;

  // Validación básica
  if (!user_id || !asunto || !descripcion || !Estado) {
    return res.status(400).json({
      message: "Faltan campos requeridos: usuario, asunto, descripción o estado.",
    });
  }

  const sql = `
    INSERT INTO tasks (
      user_id, asunto, descripcion, store_URL, tipo_archivo, fecha_de_creacion, Estado
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id,
    asunto,
    descripcion,
    store_URL || "",
    tipo_archivo || "",
    fecha_de_creacion || new Date().toISOString().slice(0, 19).replace("T", " "),
    Estado,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al insertar tarea:", err);
      return res.status(500).json({ message: "Error interno al crear tarea." });
    }

    res.status(201).json({
      message: "Tarea creada correctamente",
      id_tarea: result.insertId,
    });
  });
});

app.get("/tasks/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT id_tarea, asunto, descripcion, Estado
    FROM tasks
    WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("Error al obtener tareas:", err);
      return res.status(500).json({ message: "Error al consultar las tareas" });
    }

    res.json(rows);
  });
});



app.put('/tasks/:id', (req, res) => {
  console.log("Cuerpo recibido:", req.body);

    const tasksId = req.params.id;
    const { user_id, asunto, descripcion, store_URL = "",
    tipo_archivo = "",
    fecha_de_creacion = new Date().toISOString().slice(0, 19).replace("T", " "),
    Estado
  } = req.body;
    if (!user_id || !asunto || !descripcion ||!Estado) {
        return res.status(400).send({ message: 'Faltan datos en la solicitud' });
    }

    const sql = 'UPDATE  tasks SET user_id=?, asunto=?, descripcion=?, store_URL=?, tipo_archivo=?, fecha_de_creacion=?, Estado=? WHERE id_tarea=?';
    const values = [
    user_id,
    asunto,
    descripcion,
    store_URL,
    tipo_archivo,
    fecha_de_creacion,
    Estado,
    tasksId
  ];
    
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al actualizar tarea:", err);
      return res.status(500).json({ message: "Error interno al actualizar tarea." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: `Tarea con ID ${tasksId} actualizada correctamente` });
  });
});


app.delete('/tasks/:id', (req, res)=>{
    const tasksId=  req.params.id;
    const sql='DELETE  FROM tasks WHERE id_tarea=?';

    db.query(sql,[tasksId],(err,result)=>{
        if(err) return res.status(500).send (err);
        if(result.affectedRows === 0 ) return  res.status(404).send({message:'tarea no encontrada'});

        res.send({ message: `tarea con ID ${tasksId} eliminado correctamente` });
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
  const sql = "SELECT id, url FROM urls WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});
// eliminar URLs
app.delete

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:3000')
})

if (require.main === module){
  const PORT = process.env.PORT || 3000 ;
  app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  })
}

module.exports = app;