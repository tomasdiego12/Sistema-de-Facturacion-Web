//Este archivo es la memoria de mi supermercado, aquí se guardan los productos que el cliente ha agregado al carrito, y se realizan los cálculos de la factura final.
// Inicialización del Carrito
export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
// funcion para agregar productos al carrito, recibe un array de productos (stockProductos) y el id del producto a agregar
export function agregarCarrito(productos, id) {
    const productoEncontrado = productos.find(producto => producto.id === id);
    const existe = carrito.find(p => p.id === id);

    if (productoEncontrado.stock > 0) {
        productoEncontrado.stock = productoEncontrado.stock - 1;

        if (existe) {
                existe.cantidad ++; 
            } else {
                const nuevoProducto = {...productoEncontrado, cantidad: 1};
                carrito.push(nuevoProducto); 
            }
    } else {
        Toastify ({
            text: "Producto sin stock disponible",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff0000, #8b0000)",
                color: "white",
            }

        }) .showToast();
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//funcion para eliminar la compra, recibe el id del producto a eliminar
export function eliminarCarrito(id) {
    carrito = carrito.filter(producto =>producto.id !== id)
        localStorage.setItem('carrito', JSON.stringify(carrito));
}