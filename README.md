 🛒 Simulador de Carrito de Compras - JavaScript Vanilla

*Este proyecto es una simulación de un e-commerce funcional desarrollado para practicar la lógica de programación y la manipulación del DOM en el navegador.

*El objetivo principal fue crear una experiencia de usuario fluida sin depender de frameworks externos, gestionando el estado de la aplicación de forma manual.

🚀 Funcionalidades Principales
*Catálogo Dinámico: Renderizado de productos desde un array de objetos (simulando una base de datos local).

*Lógica de "No Duplicados": Algoritmo inteligente que detecta si un producto ya existe en el carrito para incrementar su cantidad o agregarlo como nuevo ítem.

*Persistencia de Datos: Implementación de localStorage para que el carrito y el historial de ventas no se pierdan al recargar la página o cerrar el navegador.

*Cálculo en Tiempo Real: Actualización automática del total basada en cantidades y precios unitarios.

*Generación de Facturas: Cada compra genera un objeto de factura único con ID (Date.now()) y fecha/hora exacta.

*Gestión de Historial: Módulo de ventas persistente que almacena todas las transacciones realizadas.

*Módulo de Auditoría: Función administrativa verRecaudacionTotal() que procesa el historial mediante el método .reduce() para reportar ingresos totales en consola.

*Interfaz de Usuario (UX): Notificaciones dinámicas y profesionales mediante la librería Toastify.js para validaciones y confirmaciones.

💻 Tecnologías Utilizadas
*JavaScript (ES6+): Uso avanzado de métodos de array (find, filter, forEach, reduce) para la lógica de negocio y manipulación de datos.

*Asincronía y APIs: Implementación de Fetch API para la carga de productos desde un archivo JSON local.

*Persistencia: Gestión de estados mediante localStorage para el almacenamiento del carrito y el historial de facturación.

*Librerías Externas: Integración de Toastify.js para mejorar la comunicación con el usuario mediante notificaciones dinámicas.

*HTML5: Estructura semántica para garantizar la accesibilidad y el orden del contenido.

*CSS3: Estilización de tarjetas, diseño de la interfaz y uso de Flexbox/Grid para la disposición de elementos.

🧠 Lógica Destacada: Finalización de Compra y Facturación
Uno de los mayores desafíos fue integrar la persistencia del historial de ventas con la interfaz de usuario. Implementé un flujo que valida el carrito, genera un objeto factura con datos únicos y actualiza el estado global de la aplicación:
```javascript
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
```

🚀 Próximas Mejoras (Roadmap)
*El proyecto se encuentra en constante evolución. Las siguientes funcionalidades están planificadas para las próximas versiones:

*Implementación de IVA y Descuentos: Cálculo automático del 21% de impuestos en el ticket y lógica de promociones por volumen de compra.

*Gestión de Stock Dinámico: Validación en tiempo real para impedir que se agreguen al carrito más productos de los disponibles en el inventario.

*Optimización Mobile First: Refactorización del CSS mediante Media Queries para garantizar una experiencia de usuario fluida en dispositivos móviles.

*Panel de Administración Visual: Creación de una sección en la interfaz para visualizar el historial de ventas y la recaudación, moviendo la lógica de la consola al DOM.
