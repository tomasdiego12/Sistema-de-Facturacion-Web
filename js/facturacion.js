//Este archivo contiene la lógica de facturación del sistema. Aquí se realizan los cálculos de la factura final, se muestra el resumen de la compra y se maneja el proceso de pago.
export function calcularTotal(carrito) {
    return carrito.reduce( (acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad)
    }, 0)
}