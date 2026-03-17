//Este archivo es el encargado de cargar los productos desde un archivo JSON local, y almacenarlos en la variable stockProductos para que puedan ser utilizados en otras partes de la aplicación, como en el carrito de compras o en la generación de facturas.
export let stockProductos = [];
// envolver el fetch en una función para poder llamarla desde app.js
export function cargarProductos() {
    // Consumo de la API/JSON local
return fetch('data/productos.json')
    .then(response => response.json())
    .then(data => {
        stockProductos = data; 
        return stockProductos;
    });
}