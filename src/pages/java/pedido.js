// =====================================================
// 🛒 MOSTRAR CARRITO
// =====================================================
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Coincide exactamente con TU HTML
    const contenedor = document.querySelector(".lista-carrito");
    const subtotalText = document.querySelector(".subtotal-text");
    const totalText = document.querySelector(".total-text");

    if (!contenedor) {
        console.error("❌ ERROR: No se encontró .lista-carrito en el HTML");
        return;
    }

    contenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        subtotal += subtotalItem;

        contenedor.innerHTML += `
            <div class="item-carrito flex items-center justify-between p-4 bg-white shadow-md rounded-xl mb-3">

                <img src="${item.imagen}" width="80" class="rounded-lg">

                <div class="flex-1 ml-4">
                    <h3 class="font-semibold">${item.nombre}</h3>
                    <p class="text-gray-600">Precio: $${item.precio.toLocaleString('es-CO')}</p>

                    <div class="flex items-center gap-3 mt-2">
                        <button class="px-2 py-1 bg-gray-200 rounded"
                            onclick="restarCantidad('${item.id}')">➖</button>

                        <span class="font-bold">${item.cantidad}</span>

                        <button class="px-2 py-1 bg-gray-200 rounded"
                            onclick="sumarCantidad('${item.id}')">➕</button>
                    </div>

                    <p class="mt-2 font-semibold text-blue-600">
                        Subtotal: $${subtotalItem.toLocaleString('es-CO')}
                    </p>
                </div>

                <button class="text-red-600 font-bold" onclick="eliminarDelCarrito('${item.id}')">
                    🗑
                </button>
            </div>
        `;
    });

    subtotalText.textContent = `$${subtotal.toLocaleString("es-CO")}`;
    totalText.textContent = `$${subtotal.toLocaleString("es-CO")}`;

    return { carrito, subtotal };
}



// =====================================================
// ➕ SUMAR CANTIDAD
// =====================================================
function sumarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const prod = carrito.find(item => item.id === id);

    if (prod) {
        prod.cantidad += 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}



// =====================================================
// ➖ RESTAR CANTIDAD
// =====================================================
function restarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const prod = carrito.find(item => item.id === id);

    if (prod) {
        prod.cantidad -= 1;

        if (prod.cantidad <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}



// =====================================================
// 🗑 ELIMINAR PRODUCTO
// =====================================================
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.filter(item => item.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// =====================================================
// 🟢 MOSTRAR MENSAJE BONITO
// =====================================================
function mostrarMensaje(texto, tipo = "success") {
    const contenedor = document.getElementById("mensaje-pedido");

    const colores = tipo === "success"
        ? "bg-green-100 text-green-800 border-green-300"
        : "bg-red-100 text-red-800 border-red-300";

    contenedor.innerHTML = `
        <div class="p-3 rounded-xl border ${colores} text-center mt-3">
            ${texto}
        </div>
    `;

    setTimeout(() => contenedor.innerHTML = "", 4000);
}

// =====================================================
// 🧾 FINALIZAR COMPRA
// =====================================================
async function finalizarCompra() {

    const direccion = document.getElementById("direccion").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const metodoPago = document.getElementById("metodo-pago").value;
    const btn = document.getElementById("btn-finalizar");

    // Obtener usuario logueado
    const Usuario = JSON.parse(localStorage.getItem("Usuario"));
    const email = Usuario?.email;

    if (!email) {
        mostrarMensaje("Debes iniciar sesión para continuar 🧑‍💻", "error");
        return;
    }

    // Obtener carrito
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        mostrarMensaje("Tu carrito está vacío 🛒", "error");
        return;
    }

    if (!direccion) {
        mostrarMensaje("Debes ingresar la dirección 🏠", "error");
        return;
    }

    if (!ciudad) {
        mostrarMensaje("Debes ingresar la ciudad 🏙️", "error");
        return;
    }

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const pedido = {
        email,
        direccion: `${direccion}, ${ciudad}`,
        metodo_pago: metodoPago,
        total,
        productos: carrito
    };

    try {
        btn.disabled = true;
        btn.innerText = "Procesando...";

        const response = await fetch("https://ecomerce-1-1jpe.onrender.com/api/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();

        if (response.ok) {
            mostrarMensaje("Pedido realizado con éxito 🎉🛒", "success");
            localStorage.removeItem("carrito");

            // volver a mostrar carrito limpio
            mostrarCarrito();
        } else {
            mostrarMensaje("Error al generar el pedido ❌", "error");
            console.log(data);
        }

    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("Error de conexión con el servidor ❌", "error");
    }

    btn.disabled = false;
    btn.innerText = "Finalizar compra";
}






// =====================================================
// 🔄 CARGAR AUTOMÁTICAMENTE AL ABRIR carrito.html
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();

    const btn = document.getElementById("btn-finalizar");
    if (btn) btn.addEventListener("click", finalizarCompra);
});
