document.addEventListener("DOMContentLoaded",()=>{
  const loginForm=document.getElementById("loginForm");
  const urlForm=document.getElementById("urlForm");
  const saveUrlBtn= document.getElementById("saveUrlBtn");
  const urlInput=document.getElementById("urlInput");

// guarda user para mostrar urls por usuario
  const userId= parseInt(localStorage.getItem("userId"));
  if(userId && !isNaN(userId)){
    displayUrls(userId);
  }


  // login

  if(loginForm){
    loginForm.addEventListener("submit",async(e) =>{
      const user = document.getElementById("usernameLog").value.trim();
      const password =document.getElementById("passwordLog").value.trim();

      try{
         const response = await fetch("http://localhost:3000/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({user,password})
         });
         const result=await response.json();

         if(result.success){
          localStorage.setItem("userId",result.userId);
          alert("inicio de sesion exitoso");
          window.location.href="/add_task.html";
         }else{
          alert(result.message);
         }
      }
      catch(err){
        console.error("Error en login", err.message);
        alert("Error al iniciar sesion");
      }
    });

    // guardar URL
    if(saveUrlBtn){
      saveUrlBtn. addEventListener("click", async () =>{
        const userId = parseInt (localStorage.getItem("userId"));
        const url= urlInput?.value.trim();

        if(!userId || isNaN(userId)){
          alert("sesion no valida.Inicia sesion nuevamente");
          return;
        }
        const isValidUrl =/^https?:\/\/.+/i.test(url);
        if(!isValidUrl){
          alert("la URL debe comenzar con http:// o https://");
          return;
        }
        try{
          const response = await fetch("http://localhost:3000/urls",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userId,url})
          });
          const result =await response.json();

          if(!response.ok) throw new Error(result.message || "Error al guardar");

          urlInput.value="";
          displayUrls(userId);
        }catch(err){
          console.error("Error al guardar url:", err.message);
          alert("no se pudo guardar la URL:"+ err.message);
        }

      });
    }
  }
});

//mostrar las urls

async function displayUrls(userId) {
  try {
    const response = await fetch('http://localhost:3000/urls/${userId}');
    const urls=await response.json();

    const container =document.getElementById("iconsContainer");
    if(!container) return;
    container. innerHTML="";

    if(urls.length ===0){
      container.textContent = "No tienes urls guardadas";
      return;
    }
    urls.forEach(({url})=>{
      const link=document.createElement("a");
      link.href=url;
      link.target="_blank";
      link.textContent=url;
      link.style.display="block";
      container.appendChild(link);
    });
  }catch(err){
    console.error("Error al cargar URLs :", err.message);
  }
  
}