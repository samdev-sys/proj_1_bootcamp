require('dotenv').config();


const express = require('express');
const app= express();
const cors =require('cors');
const db=require('./ConectBD/conexion_MySQL');
const bodyParser = require('body-parser');
const multer =require("multer");
const upload= multer({dest:"uploads/"});


const PORT =process.env.PORT|| 3000;


app.use (express.json());
app.use (cors());

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});



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



// CRUD para users
app.post('/users', upload.single("foto"), (req, res) => {
  try {
    const { nombre, usuario, email, password, pregunta, respuesta } = req.body;
    const imagen = req.file;

    // Validación de campos obligatorios
    const camposFaltantes = [];
    if (!nombre) camposFaltantes.push("nombre");
    if (!usuario) camposFaltantes.push("usuario");
    if (!email) camposFaltantes.push("email");
    if (!password) camposFaltantes.push("password");
    if (!pregunta) camposFaltantes.push("pregunta");
    if (!respuesta) camposFaltantes.push("respuesta");

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        message: "Faltan datos obligatorios",
        campos: camposFaltantes
      });
    }

    // Validación de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email no válido" });
    }
    

    // Nombre de archivo si se envió imagen (opcional)
    const nombreFoto = imagen?.filename || null;

    const sql = `
      INSERT INTO users (nombre, usuario, email, password, pregunta, respuesta, foto)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, usuario, email, password, pregunta, respuesta, nombreFoto];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("🛑 Error al registrar usuario:", err.code, err.sqlMessage);
        return res.status(500).json({ message: "Error interno al registrar usuario" });
      }

      res.status(201).json({ message: "Usuario registrado exitosamente" });
    });

  } catch (error) {
    console.error("🔥 Error general:", error.message);
    res.status(500).json({ message: "Error al procesar la solicitud" });
  }
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


// actalizar tarea
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
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son obligatorios"
    });
  }

  const sql = 'SELECT * FROM users WHERE usuario = ? AND password = ?';

  db.query(sql, [user, password], (err, results) => {
    if (err) {
      console.error("🛑 Error en el login:", err);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }

    if (results.length > 0) {
      const userData = results[0];
      res.json({
        success: true,
        message: "Inicio de sesión correcto",
        user: {
          id: userData.id,
          usuario: userData.usuario,
        }
      });
    } else {
      res.json({
        success: false,
        message: "Usuario o contraseña incorrecta"
      });
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
app.delete('/urls/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM urls WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "URL no encontrada" });

    res.status(200).json({ message: `URL con ID ${id} eliminada correctamente` });
  });
});



if (require.main === module){
  const PORT = process.env.PORT || 3000 ;
  app.listen(PORT, () =>{
    console.log(`Servidor corriendo en ${BASE_URL},${PORT}`);
  })
}

// get para genPass

app.get("/generar-contraseña", (req,res) =>{
  const password= genSecPass();
  res.json({password});
});


// correo de recuperacion
app.post('/recuperar', (req, res) => {
  const { email, usuario } = req.body;

  if (!email || !usuario) {
    return res.status(400).json({ message: 'faltan datos' });
  }

  const sql = 'SELECT * FROM users WHERE email = ? AND usuario = ?';
  db.query(sql, [ email, usuario], (err, results) => {
    if (err) {
      console.error("Error al consultar el usuario", err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Aquí podrías enviar un correo con la nueva contraseña
    // Por simplicidad, solo devolvemos un mensaje
    res.json({ message: 'Se ha enviado un correo con las instrucciones para recuperar la contraseña' });
  });
});

module.exports = app;