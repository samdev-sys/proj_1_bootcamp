const express =require ('express');
const crypto =require('crypto');
const  conexion=require('./db');
const enviarCorreoRec=require('./sendemail');
const {exec} = require("child_process");
const { error } = require('console');


const router= express.Router();
const app = express();
app.use(express.json());
// creacion de contraseña
router.post('/forgot-password',async(req, res) =>{
    const { username, password}=req.body;
    const hasherPassword = await bcrypt.hash(password, 10);

    conexion.query('INSERT INTO users(username, password) VALUES(?,?)',[username,hasherPassword],(err)=>{
        if (err) return res.status(500).json({ error: 'Error al registrar usuario' });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    conexion.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });
        res.json({ message: 'Login exitoso', token });
    });
});
// recuperacion de contraseña
router.post('/forgot-password', (req,res)=>{
    const {email}= req.body;
    const token = crypto.randomBytes(20).toString('hex');

    conexion.query('UPDATE users SET reset token =? WHERE email = ?', [token, email],(err) =>{
        if (err) return res.status(500).json({message:"Error al generar token"});
    
    enviarCorreoRec(email,token);
    res.json({message:"Correo de recuperacion enviado"})
});
});
// conexion con passgen.py
app.get("/generar-contraseña", (req, res) => {
    const length = req.query.length || 12; // Obtiene la longitud desde el frontend
    exec(`python passgen.py ${length}`, (error, stdout) => {
        if (error) return res.status(500).json({ error: "Error al ejecutar Python" });
        res.json({ password: stdout.trim() });
    });
});

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));

