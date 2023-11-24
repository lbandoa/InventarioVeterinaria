function verNombre(name){
    document.getElementById('user').innerHTML= "Bienvenido," + name + " " + "a tu inventario!"
}
verNombre(localStorage.getItem("user"));
