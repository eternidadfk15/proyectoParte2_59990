const products = [
    { name: 'Producto 1', price: 8900, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 2', price: 10700, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 3', price: 40000, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 4', price: 490, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 5', price: 12345, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 6', price: 30000, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 7', price: 7000, img: './assets/tramontinaCacerola.webp' },
    { name: 'Producto 8', price: 8090, img: './assets/tramontinaCacerola.webp' }
];

// funcion para generar dinamicamente las cards de productos en el DOM
function renderProducts() {
    const productList = document.getElementById('product-list');
    
    products.forEach((product, index) => {
 // crear el contenedor de la card
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.id = `product-${index + 1}`;
// crear la imagen
        const productImage = document.createElement('img');
        productImage.src = product.img;
        productImage.alt = product.name;
// crear el titulo del producto
        const productTitle = document.createElement('h3');
        productTitle.textContent = product.name;
//crear el precio del producto
        const productPrice = document.createElement('p');
        productPrice.textContent = `Precio: $${product.price}`;

 // crear el input para seleccionar cantidad
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 1;
        quantityInput.value = 1; // Valor por defecto
        quantityInput.classList.add('quantity-input');
// crear el boton de agregar al carrito
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al Carrito';
        addButton.onclick = () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(product.name, product.price, quantity);
        };
 // agregar todos los elementos al contenedor de la card
        productDiv.appendChild(productImage);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(quantityInput);
        productDiv.appendChild(addButton);
  // añadir la card al contenedor de productos
        productList.appendChild(productDiv);
    });
}
// llamar a la funcion para renderizar las cards de productos al cargar la página
renderProducts();
// array para almacenar los productos agregados al carrito
let cart = [];
// funcion para agregar productos al carrito
function addToCart(productName, productPrice, quantity) {
// verificar si el producto ya está en el carrito
    let productInCart = cart.find(product => product.name === productName);

    if (productInCart) {
 // si el producto ya esta en el carrito, incrementamos la cantidad
        productInCart.quantity += quantity;
    } else {
// si el producto no está en el carrito, lo agregamos con la cantidad seleccionada
        let product = {
            name: productName,
            price: productPrice,
            quantity: quantity
        };
        cart.push(product);
        
        alert(`Añadido al carrito: ${productName} - Precio: $${productPrice} x Cantidad: ${quantity}`);
    }
// mostrar el carrito si esta oculto
    updateCartVisibility();
 // actualizar el contenido del carrito en el DOM
    renderCartItems();
// mostrar el total actualizado
    calculateTotal();
}
// funcion para mostrar los productos en el carrito
function renderCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';                                                         // limpiar la lista de negros antes de renderizar

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Precio: $${item.price} x Cantidad: ${item.quantity}`;
        cartItemsElement.appendChild(listItem);
    });
}
// funcion para calcular el total del carrito
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('total-price').textContent = `Total: $${total}`;
}
// funcion para vaciar el carrito
function emptyCart() {
    cart = [];                                                                                                          // vaciar el array del carrito
    renderCartItems();                                                                                                  // volver a renderizar los items del carrito
    calculateTotal();                                                                                                   // calcular el total del carrito
    updateCartVisibility();
}
// funcion para mostrar / ocultar el carrito segun su contenido
function updateCartVisibility() {
    const cartSection = document.getElementById('cart-section');
    const emptyMessage = document.getElementById('empty-message');

    if (cart.length === 0) {
        cartSection.style.display = 'none';
        emptyMessage.style.display = 'block';
    } else {
        cartSection.style.display = 'block';
        emptyMessage.style.display = 'none';
    }
}