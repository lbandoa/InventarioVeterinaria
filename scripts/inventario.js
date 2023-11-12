let inventory = [
    { code: "2356", name: 'Martillo', quantity: 10 },
    { code: "0034", name: 'Destornillador', quantity: 20 }
];

let currentUser = null;


function showMessage(message) {
    document.getElementById('message').textContent = message;
}

function showInventory() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    inventory.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Código: ${product.code}  Nombre: ${product.name}  Cantidad: ${product.quantity}`;
        productList.appendChild(li);
    });
}

function showAddProductForm() {
}

function hideAddProductForm() {
    showMessage('');
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

showInventory()

function readProduct(){

    search = document.getElementById('product-rudCode').value;

    let resultSearch = findElement(inventory, search);

    if (resultSearch != -1){
        element = Object(resultSearch);

        let nameProduct = element.name
        let quantityProduct = element.quantity;

        document.getElementById('product-rudName').value= nameProduct;
        document.getElementById('product-rudQuantity').value = quantityProduct;
    }else{
        alert("El código del producto no se encuentra registrado");
    }  

}

function updateProduct(){

}


function deleteProduct(){
    search = document.getElementById('product-rudCode').value;

    let resultSearch = findIndexElement(inventory, search);

    inventory.splice(resultSearch, 1);
    showInventory();
    clearValuesRUD();
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
