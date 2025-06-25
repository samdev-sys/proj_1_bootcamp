document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const saveBtn = document.getElementById("saveUrlBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const isPrivate = document.body.getAttribute("data-private") === "true";
  const userId = parseInt(localStorage.getItem("userId"));

  // 🔐 Protección de página privada
  if (isPrivate && (!userId || isNaN(userId))) {
    window.location.replace("/index.html");
    return;
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
  console.log("renderizando urls para:", userId);
  try {
    const response = await fetch(`http://localhost:3000/urls/${userId}`);
    const urls = await response.json();
    const container = document.getElementById("iconsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (urls.length === 0) {
      container.innerHTML = "<p class='red-text'>No hay URLs guardadas.</p>";
      return;
    }

    urls.forEach(({ url }) => {
      const card = document.createElement("div");
      card.className = "card blue-grey darken-1 white-text hoverable";
      card.innerHTML = `
        <div class="card-content">
          <span class="card-title"><i class="material-icons left">link</i>URL</span>
          <p style="word-wrap: break-word;"><a href="${url}" target="_blank" class="yellow-text text-lighten-3">${url}</a></p>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error al cargar URLs:", err.message);
  }
}
