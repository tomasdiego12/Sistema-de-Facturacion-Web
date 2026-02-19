// 1. Selección de nodos del DOM
const contenedor = document.getElementById("container-products");
const listaCarrito = document.getElementById("shopping-cart-list");
const elementoTotal = document.getElementById("total-price");
const compraFinal = document.getElementById("btn-buy");

//variable global para el buscador
let stockProductos = [];
let historialVentas = JSON.parse(localStorage.getItem('ventas')) || []; // El nuevo "archivo" de facturas

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
function RenderizarProductos (listaDeProductos) {
// Limpiamos el contenedor antes de renderizar
    contenedor.innerHTML = '';
    // Recorremos el array de productos para crear las tarjetas
    listaDeProductos.forEach((producto) => {
        contenedor.innerHTML += `
        <div class="product-card">
            <h2>${producto.nombre}</h2>

            <img src="${producto.imagen}">
            <p>$${producto.precio}</p>
            <button id="${producto.id}" class="boton-agregar">Agregar</button>
        </div>
        `;
        });
// Asignamos eventos a los botones de agregar después de renderizar
const botonesAgregar = document.querySelectorAll('.boton-agregar');
// Bucle para asignar evento a cada botón
    botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', (evento) => {
            // A. Capturar ID del producto seleccionado
            const idNumero = parseInt(evento.target.id);
        
            // B. Buscar el objeto en el array de productos
            const productoEncontrado = listaDeProductos.find(p => p.id === idNumero);
        
                //C. Verificar si el producto ya existe en el carrito
                const existe = carrito.find(p => p.id === idNumero);

                if (existe) {
                existe.cantidad ++; // Si ya existe, incrementamos la cantidad
                } else {
                    const nuevoProducto = {...productoEncontrado, cantidad: 1};
                    carrito.push(nuevoProducto); // Si no existe, lo agregamos al carrito con cantidad 1
                }

            // d. Actualizar estado y repintar UI
            mostrarCarrito();
                //e. toastify notificación
                Toastify ({
                    text: "Producto agregado al carrito",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #0041b0, #030303)",
                        color: "white",
                        fontSize: "16px",
                    }
                }).showToast();
        });
    });
};
// 5. Pedimos los datos al "Servidor" (JSON)
fetch('data/productos.json')
    .then(Response => Response.json())
    .then(data => {
        stockProductos = data; //Guardamos en la varible global
        RenderizarProductos(stockProductos); // Llamamos a la función de renderizado con los datos obtenidos
    });

// 6. Evento para finalizar compra
compraFinal.addEventListener('click', (evento) => {
    // A. VALIDACIÓN: ¿Hay algo en el carrito?
    if (carrito.length === 0) {
        Toastify ({
            text: "El carrito está vacío. Agrega productos antes de finalizar la compra.",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff0000, #8b0000)",
                color: "white",
                fontSize: "16px",
            }
        }).showToast();
        return; // Salimos de la función si el carrito está vacío
    }
    //B. GENERACIÓN DE FACTURA:
    const factura = {
        id: Date.now(),
        fecha: new Date().toLocaleString(),
        productos: [...carrito], // Copiamos los productos del carrito
        total: parseFloat(elementoTotal.innerHTML)
    }
    // C. GUARDAR FACTURA EN LOCALSTORAGE
    historialVentas.push(factura); // Agregamos la nueva factura al historial
    localStorage.setItem('ventas', JSON.stringify(historialVentas)); // Guardamos el historial actualizado
    // D. NOTIFICACIÓN DE COMPRA EXITOSA
    Toastify ({
        text: "Compra finalizada con éxito",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b052, #33ec00)",
            color: "white",
        }
    }).showToast();
    // E. MOSTRAR FACTURA AL USUARIO
    alert (`
        Ticket de compra:
        Nro: ${factura.id}
        Fecha: ${factura.fecha}
        -----------------------
        Total: $${parseFloat(factura.total).toFixed(2)}
        `)
    console.table(factura.productos); // Mostramos la factura en consola para verificar
    carrito = []; //Vaciamos el carrito
    verRecaudacionTotal();
    mostrarCarrito(); //Llamar a la función de renderizado
});

// 7. Evento para el buscador
const buscadorProductos = document.getElementById("buscador")
    buscadorProductos.addEventListener('keyup', (evento) => {
        const filtro = evento.target.value.toLowerCase();
        const buscadorFiltro= stockProductos.filter(producto => producto.nombre.toLowerCase().includes(filtro));
        RenderizarProductos(buscadorFiltro)
    });

//8. Función para ver la recaudación total (usando reduce)
function verRecaudacionTotal() {
    // 1. Usar reduce para sumar los totales del historial
    const total = historialVentas.reduce((acumulador, factura) => {
        return acumulador + parseFloat(factura.total);
    }, 0);
    // 2. Mostrar el resultado en consola
    console.log("----------------------------");
    console.log("RECAUDACIÓN TOTAL: $" + total);
    console.log("----------------------------");
}
