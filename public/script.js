document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const saveBtn = document.getElementById("saveUrlBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const isPrivate = document.body.getAttribute("data-private") === "true";
  const userId = parseInt(localStorage.getItem("userId"));

  // 🔐 Protección de página privada
  if (isPrivate && (!userId || isNaN(userId))) {
    window.location.replace("/index.html");
    displayUrls(userId);
    displayTasks(userId);
    return;
  }
  if (isPrivate && !isNaN(userId)) {
  displayUrls(userId);
  displayTasks(userId);
}


  // 🔑 Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = document.getElementById("usernameLog")?.value.trim();
      const password = document.getElementById("passwordLog")?.value.trim();

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, password })
        });

        const result = await response.json();

        if (result.success) {
          localStorage.setItem("userId", result.user.id);
          alert("Inicio de sesión exitoso");
          window.location.href = "/add_task.html";
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error("Error en login:", err.message);
        alert("Error al iniciar sesión");
      }
    });
  }

  // 💾 Guardar URL
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      if (!userId || isNaN(userId)) {
        alert("Sesión no válida. Inicia sesión nuevamente.");
        return;
      }

      saveBtn.disabled = true;
      await saveUrl(userId);
      saveBtn.disabled = false;
    });
  }

  // 📦 Renderizar URLs al cargar (si aplica)
  if (isPrivate && !isNaN(userId)) {
    displayUrls(userId);
  }

  // 🚪 Cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userId");
      window.location.replace("/index.html");
    });
  }
});

// 🧠 Verificación extra al volver atrás
window.addEventListener("pageshow", (event) => {
  const userId = localStorage.getItem("userId");
  if (!userId || event.persisted) {
    window.location.replace("/index.html");
  }
});

// 🛠 FUNCIONES

async function saveUrl(userId) {
  const url = document.getElementById("urlInput")?.value.trim();
  if (!url || !/^https?:\/\/.+/i.test(url)) {
    alert("Introduce una URL válida que comience con http:// o https://");
    return;
  }

  try {
    console.log("Insertando:", url);
    const response = await fetch("http://localhost:3000/urls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, url })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error al guardar:", result);
      alert(result.message || "No se pudo guardar la URL");
      return;
    }

    document.getElementById("urlInput").value = "";
    displayUrls(userId);
  } catch (err) {
    console.error("Error de red:", err.message);
    alert("Error de conexión");
  }
}

async function displayUrls(userId) {
  // console.log("renderizando urls para:", userId);
  try {
    const response = await fetch(`http://localhost:3000/urls/${userId}`);
    const urls = await response.json();
    console.log("Respuesta del backend:", urls);
    const container = document.getElementById("iconsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (urls.length === 0) {
      container.innerHTML = "<p class='red-text'>No hay URLs guardadas.</p>";
      return;
    }


    urls.forEach(({ id, url }) => {
  const card = document.createElement("div");
  card.className = "card blue-grey darken-1 white-text hoverable";
  card.innerHTML = `
    <div class="card-content">
      <span class="card-title"><i class="material-icons left">link</i>URL</span>
      <p style="word-wrap: break-word;">
        <a href="${url}" target="_blank" class="yellow-text text-lighten-3">${url}</a>
      </p>
    </div>
    <div class="card-action">
      <button class="btn red" onclick="deleteUrl(${id})">
        <i class="material-icons">delete</i>
      </button>
    </div>
  `;
  container.appendChild(card);
});


    urls.forEach(({ url }) => {
      const card = document.createElement("div");
      card.className = "card blue-grey darken-1 white-text hoverable";
      card.innerHTML = `
        <div class="card-content">
          <span class="card-title"><i class="material-icons left">link</i>URL</span>
          <p style="word-wrap: break-word;"><a href="${url}" target="_blank" class="yellow-text text-lighten-3">${url}</a></p>
        </div>
        <div class="card-action">
        <button class="btn red" onclick="deleteUrl(${id})">
          <i  class="material-icons">delete</i>
        </button>
        </div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error al cargar URLs:", err.message);
  }
}
// eliminar URL
async function deleteUrl(id) {
  console.log("ID que llega al servidor para eliminar:", id);
  const confirmDelete = confirm("Estas seguro de eliminar?");
  if (!confirmDelete) return;
   try{
    const response = await fetch(`http://localhost:3000/urls/${id}`,{
      method:"DELETE"
    });

    const result = await response .json();
    if(!response.ok){
      alert(result.message || "Error al eliminar la URL");
      return;
    }
    const userId = parseInt (localStorage.getItem("userId"));
    displayUrls(userId);
    M.toast({ html: "URL eliminada con éxito", classes: "green darken-1" });
   }catch(err){
    console.error("Error al eliminar URL:", err.message);
    alert("no se puede eliminarla URL");
   }

}
// MOSTRAR TASKS

async function displayTasks(userId) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${userId}`);
    const tasks = await response.json();
    console.log("📦 Tareas recibidas del backend:", tasks);

    const enproceso = document.getElementById("enproceso");
    const pendientes = document.getElementById("pendientes");
    const finalizado = document.getElementById("finalizado");

    enproceso.innerHTML = "";
    pendientes.innerHTML = "";
    finalizado.innerHTML = "";

    tasks.forEach(({ id_tarea,asunto, descripcion, Estado }) => {
      const card = document.createElement("div");
      card.className = "card-panel teal lighten-5 black-text";
      card.innerHTML = `
        <strong>${asunto}</strong><br>
        <span>${descripcion}</span><br>
        <button class="btn-small yellow black-text" onclick="actualizarTarea(${id_tarea})">
    <i class="material-icons">edit</i>
  </button>
  <button class="btn-small red darken-1 white-text" onclick="eliminarTarea(${id_tarea})">
    <i class="material-icons">delete</i>
  </button>
      `;

      const estado = Estado?.toLowerCase();

      if (estado === "en proceso") {
        enproceso.appendChild(card);
      } else if (["pendiente", "por iniciar"].includes(estado)) {
        pendientes.appendChild(card);
      } else if (estado === "finalizado") {
        finalizado.appendChild(card);
      }
    });
  } catch (err) {
    console.error("Error al cargar tareas:", err.message);
  }
}

//  CARGAR TAREA
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const userId = parseInt(localStorage.getItem("userId"));

  if (taskForm) {
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const asunto = document.getElementById("asunto").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const store_URL = document.getElementById("store_URL").value.trim();
      const tipo_archivo = document.getElementById("archivo").files[0]?.type || "";
      const Estado = document.querySelector('input[name="Estado"]:checked')?.value;
      const fecha_de_creacion = new Date().toISOString().slice(0, 19).replace("T", " ");

      const editingId=taskForm.getAttribute("data-editing-id");
      const url=editingId
       ?`http://localhost:3000/tasks/${editingId}`
       :"http://localhost:3000/tasks";
      const method =editingId ?"PUT":"POST";

      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            asunto,
            descripcion,
            store_URL,
            tipo_archivo,
            fecha_de_creacion,
            Estado
          })
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Error al crear tarea");

        M.toast({ html: "Tarea creada con éxito", classes: "green" });
        taskForm.reset();
        taskForm.removeAttribute("data-editing-id")
        const modal = M.Modal.getInstance(document.getElementById("modal2"));
        modal.close();
        displayTasks(userId);

      } catch (err) {
        console.error("Error al crear tarea:", err.message);
        M.toast({ html: "No se pudo guardar la tarea", classes: "red" });
      }
    });
  }
});

// ACTUALIZAR TAREA
async function actualizarTarea(id){
  try {
    const response =await fetch(`http://localhost:3000/tasks/one/${id}`);
    const tarea =await response.json();

    document.getElementById("asunto").value=tarea.asunto;
    document.getElementById("descripcion").value= tarea.descripcion;
    document.querySelector(`input[name="Estado"][value="${tarea.Estado}"]`).checked= true;

    document.getElementById("taskForm").setAttribute("data-editing-id", id);
    const modal = M.Modal.getInstance(document.getElementById("modal2"));
    modal.open();

  } catch(err){
    console.error("Error al traer la tarea :", err.message);
  }
}