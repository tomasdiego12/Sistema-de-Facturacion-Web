// Este archivo contiene la lógica de escuchar eventos en la interfaz de usuario. 
// Aquí se manejan los eventos de agregar productos, eliminar, y finalizar la compra.

// Importamos las funciones y variables necesarias desde otros módulos
import { cargarProductos, stockProductos } from "./products.js";
import { agregarCarrito, eliminarCarrito, carrito } from "./carrito.js";
import { calcularTotal } from "./facturacion.js";

// 1. Selección de nodos del DOM
const contenedor = document.getElementById("container-products");
const listaCarrito = document.getElementById("shopping-cart-list");
const elementoTotal = document.getElementById("total-price");
const precioSubtotal = document.getElementById("subtotal-price");
const precioDescuento = document.getElementById("discount-price");
const precioIVA = document.getElementById("iva-price");
const finalizarLaCompra = document.getElementById("btn-buy");
// 2. Función para cargar productos en la interfaz
export function renderizarProductos(listaDeProductos) {
    contenedor.innerHTML = '';
    
    listaDeProductos.forEach((producto) => {
        contenedor.innerHTML += ` 
        <div class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}</p>
                <button id="${producto.id}" class="btn btn-primary boton-agregar">Agregar al carrito</button>
            </div>
        </div>
        `;
    });

    // 3. Controlador: Eventos para agregar al carrito
    const botones = document.querySelectorAll('.boton-agregar');
    botones.forEach((boton) => {
        boton.addEventListener('click', (evento) => {
            const idProducto = parseInt(evento.target.id);
            agregarCarrito(stockProductos, idProducto); // Guardamos en el depósito
            mostrarCarrito(); // Actualizamos la pantalla al instante
        });
    });
}

// 4. Nueva función: Dibujar el ticket de compra
export function mostrarCarrito() {
    // a. Vaciamos la lista visual
    listaCarrito.innerHTML = '';
    
    // b. Recorremos el carrito importado
    carrito.forEach((producto) => {
        const itemLista = document.createElement('li');
        itemLista.innerHTML = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} 
        <button class="btn btn-danger btn-sm eliminar" data-id="${producto.id}">Eliminar</button>`;

        // c. Agregamos el item a la lista visual
        listaCarrito.appendChild(itemLista);
    });

    // Le damos vida al botón rojo de Eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (evento) => {
            const idProducto = parseInt(evento.target.dataset.id);
            eliminarCarrito(idProducto); // Borramos del depósito
            mostrarCarrito(); //Volvemos a dibujar la lista sin ese producto
        });
    });

    // Calculamos y mostramos el total final
    const recibo = calcularTotal(carrito);
    elementoTotal.innerText = recibo.totalFinal; 
    precioSubtotal.innerText = recibo.subTotal;
    precioDescuento.innerText = recibo.descuento;
    precioIVA.innerText = recibo.iva;
}
// 5. Logica de busqueda de productos
const inputBusqueda = document.getElementById('buscador');
inputBusqueda.addEventListener('input', (evento) => {
    // a. Atrapamos la palabra que escribió y la pasamos a minúscula
    const palabraEscrita = evento.target.value.toLowerCase();
    // b. Filtramos tu catálogo original (stockProductos que ya lo tenés importado arriba)
    const productosFiltrados = stockProductos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(palabraEscrita);
    });
    renderizarProductos(productosFiltrados);
});

// 6. Evento para finalizar la compra
finalizarLaCompra.addEventListener('click', () => {
    // Si el carrito está vacío, mostramos un mensaje de error y no procedemos con la compra
    if (carrito.length === 0) {
        Toastify ({
            text: "El carrito está vacío. Agrega productos para finalizar la compra.",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff0000, #8b0000)",
                color: "white",
            }
        }).showToast();
        return;
    }
    // Si el carrito tiene productos, mostramos un mensaje de éxito y limpiamos el carrito
    Toastify ({
        text: "¡Compra finalizada con éxito! Gracias por elegirnos.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            color: "white",
        }
    }).showToast();
    carrito.length = 0;
    mostrarCarrito();

});
// 7. Arranque de la aplicación
cargarProductos().then((productos) => {
    renderizarProductos(productos);
    mostrarCarrito(); // Dibujamos el carrito guardado apenas entramos a la página
});