// 1. Selección de nodos del DOM
const contenedor = document.getElementById("container-products");
const listaCarrito = document.getElementById("shopping-cart-list");
const elementoTotal = document.getElementById("total-price");
const compraFinal = document.getElementById("btn-buy");

// 2. Función para actualizar la interfaz (Vista)
function mostrarCarrito() {
    listaCarrito.innerHTML = ''; // Limpiamos la lista visual
    let sumaTotal = 0; // Reseteamos el contador

    // Recorremos el carrito para dibujar y sumar precios
    carrito.forEach((producto) => {
        listaCarrito.innerHTML += `
        <li>
        ${producto.nombre} cantidad: ${producto.cantidad}
        <button class="boton-eliminar" data-id="${producto.id}">Eliminar</button>
        </li>`;
        sumaTotal += producto.precio * producto.cantidad;// Acumulador matemático
    });
    const botonesEliminar = document.querySelectorAll('.boton-eliminar');
    // Asignamos eventos a los botones de eliminar
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (evento) => {
            const idProducto = parseInt(evento.target.dataset.id);
            carrito = carrito.filter((producto) => producto.id !== idProducto);
            mostrarCarrito(); // Volvemos a renderizar el carrito actualizado
            console.log("Diste click en el producto ID:", idProducto);
        });
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));// Guardamos en localStorage
    // Actualizamos el precio final en el HTML
    elementoTotal.innerHTML = sumaTotal;
}

// 3. Estado inicial de la aplicación
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
mostrarCarrito();

// 4. Renderizado dinámico de productos (desde la "Base de Datos")
productos.forEach((producto) => {
    contenedor.innerHTML += `
        <div class="product-card">
            <h2>${producto.nombre}</h2>

            <img src="${producto.imagen}">
            <p>$${producto.precio}</p>
            <button id="${producto.id}" class="boton-agregar">Agregar</button>
        </div>
    `;
});

// 5. Asignación de eventos (Listeners)
const botonesAgregar = document.querySelectorAll('.boton-agregar');

botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', (evento) => {
        // A. Capturar ID del producto seleccionado
        const idNumero = parseInt(evento.target.id);
        
        // B. Buscar el objeto en el array de productos
        const productoEncontrado = productos.find(p => p.id === idNumero);
        
        //C. Verificar si el producto ya existe en el carrito
        const existe = carrito.find(p => p.id === idNumero);

        if (existe) {
            existe.cantidad ++; // Si ya existe, incrementamos la cantidad
        } else {
            productoEncontrado.cantidad = 1;
            carrito.push(productoEncontrado);
        }

        // d. Actualizar estado y repintar UI
        mostrarCarrito();
    });
});

compraFinal.addEventListener('click', (evento) => {
    carrito = []; //Vaciamos el carrito
    mostrarCarrito(); //Llamar a la función de renderizado
    alert("¡Gracias por su compra!");
});
