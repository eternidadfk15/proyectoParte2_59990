// Archivo script.js
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const cartContainer = document.getElementById('cartContainer');
    const cartIcon = document.getElementById('cartIcon');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const clearCartBtn = document.getElementById('clearCart');
    const closeCartBtn = document.getElementById('closeCart');

    // Estado del carrito
    let cart = [];

    // Carga de productos desde el archivo JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        });

    // renderizar los productos en el DOM
    function renderProducts(products) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Añadir los eventos a los botones de "Agregar al carrito"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const selectedProduct = products.find(prod => prod.id === productId);
                addToCart(selectedProduct);
            });
        });
    }

    //  agregar productos al carrito
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        // SweetAlert de confirmación
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${product.name} ha sido añadido al carrito.`,
            timer: 1500,
            showConfirmButton: false
        });

        renderCart();
    }

    // renderizar el carrito de compras
    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="increase-qty" data-id="${item.id}">+</button>
                    <button class="decrease-qty" data-id="${item.id}">-</button>
                    <button class="remove-item" data-id="${item.id}">X</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        totalPriceElement.textContent = total.toFixed(2);
        addCartEventListeners();
    }

    // Añadir  los eventos a los botones dentro del carrito
    function addCartEventListeners() {
        // Aumento la cantidad
        document.querySelectorAll('.increase-qty').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const product = cart.find(item => item.id === productId);
                product.quantity += 1;
                renderCart();
            });
        });

        // Disminuyo la cantidad
        document.querySelectorAll('.decrease-qty').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const product = cart.find(item => item.id === productId);

                if (product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    // SweetAlert para confirmación de eliminación
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "El producto será eliminado del carrito.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, eliminar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            cart = cart.filter(item => item.id !== productId);
                            renderCart();
                            Swal.fire(
                                'Eliminado',
                                'El producto ha sido eliminado del carrito.',
                                'success'
                            );
                        }
                    });
                }

                renderCart();
            });
        });

        // Elimino producto
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                cart = cart.filter(item => item.id !== productId);
                renderCart();
            });
        });
    }

    // Vacio carrito
    clearCartBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            Swal.fire({
                title: '¿Quieres vaciar el carrito?',
                text: "Esta acción eliminará todos los productos.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, vaciar'
            }).then((result) => {
                if (result.isConfirmed) {
                    cart = [];
                    renderCart();
                    Swal.fire(
                        'Carrito vaciado',
                        'Todos los productos han sido eliminados del carrito.',
                        'success'
                    );
                }
            });
        }
    });

    // Mostrar y ocultar el carrito
    cartIcon.addEventListener('click', () => {
        cartContainer.style.transform = 'translateY(0)';
    });

    closeCartBtn.addEventListener('click', () => {
        cartContainer.style.transform = 'translateY(100%)';
    });
});
