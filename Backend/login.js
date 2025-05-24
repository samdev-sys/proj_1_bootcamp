// enlace a genPass
async function genPass() {
    const response = await fetch("https://opulent-eureka-5gr97xp5qqxp255v-8501.app.github.dev/");
  
    console.log("contraseña generada", data.password);
    
}

// cierre de sesion
  document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            M.Modal.init(elems);
        });

        function abrirModal() {
            var modal = M.Modal.getInstance(document.getElementById('confirmacionModal'));
            modal.open();
        }

        function cerrarModal() {
            var modal = M.Modal.getInstance(document.getElementById('confirmacionModal'));
            modal.close();
        }

        function cerrarSesion() {
            alert('Sesión cerrada exitosamente.');
            // Aquí podrías redirigir a la página de login
            window.location.href = '/index.html';
        }

// inicio de sesion

