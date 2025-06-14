
function iniciarSesion(event) {
    event.preventDefault(); // Previene el envío del formulario

    let user = document.getElementById('usernameLog').value.trim();
    let password = document.getElementById('passwordLog').value.trim();
    
    const user2 = 'admin';
    const pass = 'admin';

    if (user === user2 && password === pass) {
        alert('Inicio de sesión correcto');
        window.location.href ='./Frontend/add_task.html';
    } else {
        alert('Intente nuevamente');
    }
}

// Asegurarse de que el evento se asigne cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn_inicioSesion').addEventListener('click', iniciarSesion);
});
 function saveUrl() {
      const url = document.getElementById("urlInput").value.trim();
      if (url) {
        let urls = JSON.parse(localStorage.getItem("urls")) || [];
        urls.push(url);
        localStorage.setItem("urls", JSON.stringify(urls));
        displayUrls();
        document.getElementById("urlInput").value = ""; // limpiar campo
      }
    }

    // Mostrar URLs guardadas
    function displayUrls() {
      let urls = JSON.parse(localStorage.getItem("urls")) || [];
      const container = document.getElementById("iconsContainer");
      container.innerHTML = "";

      urls.forEach(url => {
        try {
    const domain = new URL(url).hostname;  // extrae solo el dominio
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";

    // asegúrate de usar comillas correctamente
    const img = document.createElement("img");
    img.src = `https://www.google.com/s2/favicons?domain=${domain}`;
    img.alt = "icono";
    img.style.margin = "30px";

    link.appendChild(img);
    container.appendChild(link);
  } catch (e) {
    console.error("URL inválida:", url);
  }
});
    }

    // Opcional: traer desde Flask backend
    function fetchUrls() {
      fetch("http://127.0.0.1:5000/get_urls")
        .then(response => response.json())
        .then(data => {
          const container = document.getElementById("iconsContainer");
          container.innerHTML = data.urls.length ? "" : "<p>No hay URLs guardadas.</p>";

          data.urls.forEach(url => {
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${url}" alt="icono">`;
            container.appendChild(link);
          });
        })
        .catch(error => console.error("Error al obtener URLs:", error));
    }

    document.addEventListener('DOMContentLoaded', function() {
  var selectElem = document.querySelectorAll('select');
  M.FormSelect.init(selectElem);

  var chipsElem = document.querySelectorAll('.chips-autocomplete');
  var chipsInstance = M.Chips.init(chipsElem, {
    autocompleteOptions: {
      data: {
        'Opción 1': null,
        'Opción 2': null,
        'Opción 3': null
      },
      limit: Infinity,
      minLength: 1
    },
    onChipAdd: function(e, chip) {
      let select = document.getElementById('select-options');
      let value = chip.innerText.trim();
      let option = [...select.options].find(opt => opt.text === value);
      if (option) option.selected = true;
    },
    onChipDelete: function(e, chip) {
      let select = document.getElementById('select-options');
      let value = chip.innerText.trim();
      let option = [...select.options].find(opt => opt.text === value);
      if (option) option.selected = false;
    }
  });
});
   