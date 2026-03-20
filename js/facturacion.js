//Este archivo contiene la lógica de facturación del sistema. Aquí se realizan los cálculos de la factura final, se muestra el resumen de la compra y se maneja el proceso de pago.
export function calcularTotal(carrito) {
// El subtotal se calcula sumando el precio de cada producto multiplicado por su cantidad
    const subTotal = carrito.reduce( (acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad)
    }, 0)
// Si el subtotal supera los $10,000, se aplica un descuento del 10%
    let descuento = 0;

    if (subTotal > 10000) {
        descuento = subTotal * 0.10
    }
// El IVA se calcula sobre el subtotal menos el descuento
    const iva = (subTotal - descuento) * 0.21;
    const totalFinal = subTotal - descuento + iva;
// Devolvemos un objeto con el resumen de la factura, redondeando los valores a 2 decimales para una mejor presentación
    return {
        subTotal: subTotal.toFixed(2),
        descuento: descuento.toFixed(2),
        iva: iva.toFixed(2),
        totalFinal: totalFinal.toFixed(2)
    }
}