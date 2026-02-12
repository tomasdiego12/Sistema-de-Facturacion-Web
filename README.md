# 🛒 Simulador de Carrito de Compras - JavaScript Vanilla

Este proyecto es una simulación de un e-commerce funcional desarrollado para practicar la lógica de programación y la manipulación del DOM en el navegador.

El objetivo principal fue crear una experiencia de usuario fluida sin depender de frameworks externos, gestionando el estado de la aplicación de forma manual.

## 🚀 Funcionalidades Principales

* **Catálogo Dinámico:** Renderizado de productos desde un array de objetos (simulando una base de datos).
* **Lógica de "No Duplicados":** Algoritmo que detecta si un producto ya existe en el carrito.
    * *Si existe:* Incrementa la cantidad (State Mutation).
    * *Si no existe:* Lo agrega como nuevo ítem.
* **Persistencia de Datos:** Uso de `localStorage` para que el usuario no pierda su compra al recargar la página.
* **Cálculo en Tiempo Real:** El total se actualiza automáticamente según la cantidad de productos y sus precios unitarios.
* **Gestión del Carrito:** Posibilidad de eliminar productos y vaciar el carrito completo.

## 💻 Tecnologías Utilizadas

* **JavaScript (ES6+):** Uso de métodos de array (`map`, `find`, `filter`, `forEach`) y `Arrow Functions`.
* **HTML5:** Estructura semántica.
* **CSS3:** Diseño responsivo y estilización de tarjetas.

## 🧠 Snippet de Código Destacado

Uno de los desafíos más interesantes fue evitar la duplicación de nodos en el DOM. Implementé esta lógica condicional:

```javascript
// Verificamos si el producto ya está en el carrito
const existe = carrito.some(prod => prod.id === idProducto);

if (existe) {
    // Si ya existe, solo actualizamos la cantidad (sin duplicar filas)
    const prod = carrito.map(prod => {
        if (prod.id === idProducto) {
            prod.cantidad++;
        }
    });
} else {
    // Si es nuevo, lo agregamos al array
    carrito.push(productoNuevo);
}