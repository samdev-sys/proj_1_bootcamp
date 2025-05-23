
async function genPass() {
    const response = await fetch("http://localhost:3000/generar-contraseña");
    const data = await response.json();
    console.log("contraseña generada", data.password);
    
}

