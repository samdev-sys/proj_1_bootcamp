document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btn_inicioSesion').addEventListener('click', iniciarSesion);
});



function iniciarSesion(){
    let user =document.getElementById('usernameLog').value;
    let password=document.getElementById('passwordLog').value;
    
    let user2 = 'admin';
    let pass= 'admin';

    if ( user===user2 && password===pass){
        
        alert('inicio de sesion correcto');
        window.location.href = 'https://opulent-eureka-5gr97xp5qqxp255v.github.dev//3.html';
    }
    else{
        alert('intente nuevamente');
    }
}

document.getElementById('btn_inicioSesion').addEventListener('click', iniciarSesion);
