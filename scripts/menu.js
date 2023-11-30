function verNombre(name){
    document.getElementById('user').innerHTML= "Bienvenido," + name + " " + "a tu inventario!"
}
verNombre(localStorage.getItem("user"));


// Llama la pagina del inventario
let botonStock = document.getElementById("stock");
botonStock.addEventListener("click", function() {
    window.location.href = "admin.html";
});
