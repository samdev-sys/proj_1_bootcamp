document.addEventListener('DOMContentLoaded', function () {
    // console.log("Archivo login.js activo y listo");

    // Inicialización de MaterializeCSS
    var elems = document.querySelectorAll('.modal');
    if (elems.length > 0) {
        M.Modal.init(elems);
        // console.log("Modales inicializados correctamente.");
    } else {
        console.error("No se encontraron elementos .modal en el DOM.");
    }

    // Asignar evento de clic al icono de salida
    var iconoSalida = document.querySelector("img[alt='left']");
    if (iconoSalida) {
        iconoSalida.addEventListener("click", abrirModal);
    } else {
        console.error("No se encontró el ícono de salida.");
    }

    // Evento de clic para cerrar sesión
    var cerrarSesionBtn = document.querySelector(".btn.green");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", cerrarSesion);
    }

    // Evento de clic para cerrar modal
    var cerrarModalBtn = document.querySelector(".btn.grey");
    if (cerrarModalBtn) {
        cerrarModalBtn.addEventListener("click", cerrarModal);
    }
});

// Función para abrir el modal de cierre de sesión
function abrirModal() {
    console.log("Ejecutando abrirModal...");
    var modalInstance = M.Modal.getInstance(document.getElementById('confirmacionmodal'));
    if (modalInstance) {
        modalInstance.open();
    } else {
        console.error("No se encontró el modal con ID 'confirmacionmodal'.");
    }
}

// Función para cerrar el modal
function cerrarModal() {
    console.log("Ejecutando cerrarModal...");
    var modalInstance = M.Modal.getInstance(document.getElementById('confirmacionmodal'));
    if (modalInstance) {
        modalInstance.close();
    } else {
        console.error("No se encontró el modal con ID 'confirmacionmodal'.");
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    console.log("Cerrando sesión...");
    alert('Sesión cerrada exitosamente.');
    window.location.href = '/index.html';
}

// Función corregida para generar contraseña
async function genPass() {
    try {
        const response = await fetch("https://opulent-eureka-5gr97xp5qqxp255v-8501.app.github.dev/");
        const data = await response.json(); // Se define data antes de usarla
        console.log("Contraseña generada:", data.password);
    } catch (error) {
        console.error("Error al obtener la contraseña:", error);
    }
}