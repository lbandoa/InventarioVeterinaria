
let inventory = [
    { code: "2356", name: 'Guantes de látex', quantity: 50 },
    { code: "1111", name: 'Clorhexidina', quantity: 2 },
    { code: "0034", name: 'Hoja de bisturí #20', quantity: 20 },
    { code: "0035", name: 'Jeringas 2ml', quantity: 20 }
];

let currentUser = null;

function showMessage(message2) {
    const messageElement = document.getElementById('message2');
    messageElement.textContent = message2;
    // Ocultar el mensaje después de 3000 milisegundos (3 segundos)
    setTimeout(function () {
        messageElement.textContent = '';
    }, 3000);
}

function showInventory() {
    const productList = document.getElementById('product-list');
    productList.innerHTML= '';

    inventory.forEach(product => {
        const tr = document.createElement('tr');
        
        const tdCode = document.createElement('td');
        tdCode.textContent = product.code;
        tr.appendChild(tdCode);
        
        const tdName = document.createElement('td');
        tdName.textContent = product.name;
        tr.appendChild(tdName);

        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = product.quantity;
        tr.appendChild(tdQuantity);

        productList.appendChild(tr);
    });
}
showInventory()

function generatePDF() {

    // Crea un objeto jsPDF
    const jsPDF = window.jspdf.jsPDF;
    const pdf = new jsPDF();

    // encabezado del informe con el logo
    const logoPath = '../imagenes/logo-sin-fondo.png';
    const logoSize = 40; // Esteo ajusta el tamaño del logo

    pdf.addImage(logoPath, 'PNG', 20, 10, logoSize, logoSize);
    pdf.text('Veterinaria NepetaCat - Inventario', 70, 30);
    pdf.text('Fecha: ' + new Date().toLocaleDateString(), 20, 50);
    // Configura la tabla
    const columns = ['Código', 'Nombre', 'Cantidad'];
    const data = inventory.map(product => [product.code, product.name, product.quantity]);
    // Genera la tabla en el PDF
    pdf.autoTable({
        head: [columns],
        body: data,
        startY: 70, // Se ajusta la posición de inicio de la tabla
    });
    // Guarda el PDF
    pdf.save('Informe_Productos.pdf');
}

function showAddProductForm() {
}

function hideAddProductForm() {
    showMessage('');
}


// Muestra el modal
function openModalAgregarProductos() {
    document.getElementById('add-product-form').style.display = 'block';
}

// Cierra el modal
function closeModalAgregarProductos() {
    document.getElementById('add-product-form').style.display = 'none';
}

function openModalModificarProductos() {
    document.getElementById('rud-product-form').style.display = 'block';
}

function closeModalModificarProductos() {
    document.getElementById('rud-product-form').style.display = 'none';
}


function addProduct() {
    const codeProduct = document.getElementById('product-code').value;
    const productName = document.getElementById('product-name').value;
    const productQuantity = parseInt(document.getElementById('product-quantity').value, 10);

    if (productName && !isNaN(productQuantity) && productQuantity > 0 && codeProduct.length == 4) {
        inventory.push({code: codeProduct, name: productName, quantity: productQuantity });
        showInventory();
        hideAddProductForm();
        showMessage('Producto agregado al inventario.');
        clearValuesCreate();
    } else {
        showMessage('Por favor, ingrese un nombre de producto válido y una cantidad válida.');
    }
}

function readProduct(){

    search = document.getElementById('product-rudCode').value;

    let resultSearch = findElement(inventory, search);

    if (resultSearch != -1){
        element = Object(resultSearch);

        let nameProduct = element.name
        let quantityProduct = element.quantity;

        document.getElementById('product-rudName').value= nameProduct;
        document.getElementById('product-rudQuantity').value = quantityProduct;

        showMessage('Consulta de producto');

    }else{
        alert("El código del producto no se encuentra registrado");
    }  

}

function updateProduct(){
    const coderudProduct = document.getElementById('product-rudCode').value;
    const productrudName = document.getElementById('product-rudName').value;
    const productrudQuantity = parseInt(document.getElementById('product-rudQuantity').value, 10);

    let search = document.getElementById('product-rudCode').value;
    
    let resultSearch = findIndexElement(inventory, search);

    if (productrudName && !isNaN(productrudQuantity) && productrudQuantity > 0 && coderudProduct.length == 4) {
        inventory[resultSearch] = {code: coderudProduct, name: productrudName, quantity: productrudQuantity };
        showInventory();
        
        showMessage('Producto actualizado con éxito.');
        clearValuesRUD();
    } else {
        showMessage('Por favor, ingrese un nombre de producto válido y una cantidad válida.');
    }
}


function deleteProduct(){  

    let search = document.getElementById('product-rudCode').value;
    
    let resultSearch = findIndexElement(inventory, search);

    if (resultSearch != -1){
        let validar = confirm(`¿Desea eliminar producto de inventario con código: ${search}?`);
            
        if (validar){

            inventory.splice(resultSearch, 1);
            showInventory();
            showMessage('Producto borrado con éxito.');
            clearValuesRUD();
        }
    }else{
        alert(`El código ${search} no existe en la lista de inventarios, por favor ingrese nuevamente el código y vuelva a intentarlo.`);
        clearValuesRUD();
    }    
    
}


const findElement = (array, searchedCode) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.code == searchedCode) {
        return element;
      }
    }
    return -1;
}

const findIndexElement = (array, searchedCode) => {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.code == searchedCode) {
        return i;
      }
    }
    return -1;
}


function clearValuesCreate(){
    document.getElementById('product-code').value = "";
    document.getElementById('product-name').value = "";
    document.getElementById('product-quantity').value = "";
}

function clearValuesRUD(){
    document.getElementById('product-rudCode').value = "";
    document.getElementById('product-rudName').value = "";
    document.getElementById('product-rudQuantity').value = "";
}


function addProduct_cant() {
    const codeProduct = document.getElementById('product-code').value;
    const productName = document.getElementById('product-name').value;
    const productQuantity = parseInt(document.getElementById('product-quantity').value, 10);
    
    search = document.getElementById('product-code').value;

    let resultSearchProd = findElement(inventory, search);

    if (resultSearchProd == -1){
        if (productName && !isNaN(productQuantity) && productQuantity > 0 && codeProduct.length == 4) {

            inventory.push({code: codeProduct, name: productName, quantity: productQuantity });
            showInventory();
            hideAddProductForm();
            showMessage('Producto agregado al inventario.');
            clearValuesCreate();
        } else {
            showMessage('Por favor, ingrese un nombre de producto válido y una cantidad válida.');
        }
    }else{
        let validar = confirm(`El código del producto: ${search} ya existe, ¿desea agregar cantidades a las existentes?`);
            
        if (validar){
            let searchIndex = findIndexElement(inventory, search);

            element = Object(resultSearchProd);

            let nameProduct = element.name

            cant = element.quantity;
            total = cant + productQuantity;

            console.log(total);

            inventory[searchIndex] = {code: codeProduct, name: nameProduct, quantity: total };
            showInventory();
            clearValuesCreate();
        }
    }
    
}
