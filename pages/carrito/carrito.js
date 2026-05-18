function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito();
    let total = 0;

    // por cada producto creo una fila nueva en la tabla
    carrito.forEach(producto => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
        `;
        tabla.appendChild(fila);

        // le saco el $ y los puntos para poder operar con el numero
        let precioLimpio = parseFloat(producto.precio.replace("$", "").replace(".", ""));
        total += precioLimpio * producto.cantidad;
    });

    // actualizo el total que se ve en pantalla
    document.getElementById("valor-final").textContent = "El valor final a pagar es de: $" + total;
}

function limpiarCarrito() 
{
    let carrito = obtenerCarrito();

    // si no hay nada avisamos y salimos
    if (carrito.length === 0) {
        alert("No hay nada en el carrito paaaa! QUE FEO PEDITE ALGO YA");
        return;
    }

    // pregunta si está seguro antes de borrar todo
    let confirmacion = confirm("QUEEEE? Estas seguro? Esta acción es un DELITO FEDERAL, el carrito se va a limpiar y no hay vuelta atras. PENSALO BIEN");
    
    if (!confirmacion) return;

    // borro todo el carrito del localStorage
    localStorage.removeItem("carrito");
    alert("DELITO FEDERAL EL Carrito LAMENTABLEMENTEEEEEEEE fue limpiado");
    
    // recargo la pagina para que se vea vacio
    location.reload();
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});