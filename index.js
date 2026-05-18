//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    
    
    // me paro en el li mas cercano al boton clickeado
    let li = elementoClickeado.closest("li");
    let nombre = li.querySelector(".nombre-producto").textContent;
    let precio = li.querySelector(".precio-producto").textContent;

    // traigo el carrito que hay guardado
    let carrito = obtenerCarrito();

    // fijjo si el producto ya esta en el carrito
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        // si ya estaba le sumo uno nomas
        productoExistente.cantidad++;
    } else {
        // si no estaba lo agrego nuevo
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }
    //Alerttaaa atrr
    alert("Un/una: " + nombre + " fue agregado al carrito");
    //Mostramos antes de guardar el carrito para verificar que se esta sumando correctamente
    console.log(carrito);
    // guardo todo
    guardarCarrito(carrito);
}
    


function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    // me paro en el li mas cercano al boton clickeado
    let li = elementoClickeado.closest("li");
    let nombre = li.querySelector(".nombre-producto").textContent;

    // traigo el carrito guardado
    let carrito = obtenerCarrito();

    // si el carrito esta vacio no hay nada que restar
    if (carrito.length === 0) {
        alert("No hay ningún producto guardado en el carrito");
        return;
    }

    // busco si el producto esta en el carrito
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (!productoExistente) {
        // si no estaba aviso que no hay mas
        alert("No hay más " + nombre + " en el carrito");
    } else {
        // si estaba le resto uno
        productoExistente.cantidad--;
        alert("Un/una: " + nombre + " fue eliminado del carrito");

        // si quedo en 0 lo saco del array
        carrito = carrito.filter(p => p.cantidad > 0);
    }

    // miro como quedo antes de guardar
    console.log(carrito);

    // guardo todo
    guardarCarrito(carrito);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
