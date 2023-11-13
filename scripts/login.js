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
            window.location.href = 'admin.html';
        } else {
            showMessage('Credenciales incorrectas. Inténtelo de nuevo.');
        }

    } else {
        showMessage("La contraseña no cumple con la longitud, vuelva a ingresar una contraseña entre 8 y 15 caracteres")

    }
}