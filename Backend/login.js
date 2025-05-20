document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('usernameLog').value;
    const password = document.getElementById('passwordLog').value;
    
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    alert(result.message);
});

async function genPass() {
    const response = await fetch("http://localhost:3000/generar-contraseña");
    const data = await response.json();
    console.log("contraseña generada", data.password);
    
}

