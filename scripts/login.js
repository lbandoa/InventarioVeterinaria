const users = [
    { username: 'admin', password: 'password' }
];

function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if ( password.length >= 8 && password.length <=15 ) {

        const user = users.find(u => u.username == username && u.password == password);

        if (user) {
            window.location.href = 'menu.html';
        } else {
            showMessage('Credenciales incorrectas. Inténtelo de nuevo.');
        }

    } else {
        showMessage("La contraseña no cumple con la longitud, vuelva a ingresar una contraseña entre 8 y 15 caracteres")
    }
}


window.onload = function () {
    google.accounts.id.initialize({
        client_id: "195966215330-h57t9rim2vfm9vb6pbvvlnqibg5200p5.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt();
}

function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

let inicioSesion = handleCredentialResponse();


//en esta funciòn, usar el localstorage para guardar el nombre de usuario
function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);   
    localStorage.setItem("user", responsePayload.name); 
    console.log("Nombre del usuario: ", responsePayload.name);
    //llevamos al usuario al panel del admin
    window.location.href = 'menu.html';
    
}
