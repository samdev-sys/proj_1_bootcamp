const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user : process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const enviarCorreoRec =(email, token)=>{
    const mensaje={
        from: process. env. EMAIL_USER,
        to : email, 
        subject:"Recuperacion de contraseña",
        html:`<p>Haga clic en el siguiente enlace para restablecer su contraseña:</p>
               <a href="http://localhost:3000/reset-password/${token}">Restablecer contraseña</a>`
    };

    transporter.sendMail(mensaje, (err, info)=>{
        if (err){
            console.error("Error enviando email:" , err );
        }else{
            console.log("correo enviado:", info.response);
        }
    });
};

module. exports =enviarCorreoRec;