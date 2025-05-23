function iniciarSesion(){
    let user =document.getElementById('usernameLog').value;
    let password=document.getElementById('passwordLog').value;
    let inicio=document.getElementById('btn_inicioSesion');

    if (password===pass){
        
        alert('inicio de sesion correcto');
        window.location.href = '/3.html';
    }
    else{
        alert('intente nuevamente');
    }
}