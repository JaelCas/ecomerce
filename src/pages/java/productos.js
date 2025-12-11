// =======================================================
// 📌 1. FUNCIÓN PARA CARGAR PRODUCTOS
// =======================================================
async function cargarProductos() {
    try {
        const response = await fetch('https://ecomerce-1-1jpe.onrender.com/api/producto');
        const productos = await response.json();

        const grid = document.getElementById('products-grid');
        grid.innerHTML = productos.map(productos => `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 product-card"
            data-category="laptops"
            data-price="${productos.Precio}"
            data-product-Id="${productos.productId}">

            <div class="bg-linear-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden">
                <img src="${productos.Image}" alt="${productos.Nombre}" 
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy">

                <div class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-b-full text-bold">
                    -15%
                </div>
            </div>

            <div class="p-6">
                <h3 class="text-lg font-bold text-gray-800">${productos.Nombre}</h3>
                <p class="text-sm text-gray-800 mb-4">${productos.Descripcion}</p>

                <div class="flex items-center justify-between mt-4">
                    <div>
                        <span class="text-2xl font-bold text-blue-600">
                        ${(productos.Precio || 0).toLocaleString('es-CO')}
                        </span>
                    </div>
                    <div class="flex text-yellow-600">⭐️⭐️⭐️⭐️⭐️</div>
                </div>

                <div class="flex space-x-2">
                    <button class="ver-detalles-btn bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition flex-1 text-sm">
                        Ver Detalles
                    </button>

                    <button 
                        class="add-to-cart-btn bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition flex-1 text-sm"
                        data-id="${productos.productId}"
                        data-nombre="${productos.Nombre}"
                        data-precio="${productos.Precio}"
                        data-imagen="${productos.Image}">
                        Comprar
                    </button>
                </div>
            </div>
        </div>
        `).join('');

        console.log("Productos cargados correctamente");

        activarBotonesCarrito();

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

cargarProductos();

setInterval(() => cargarProductos(), 5000);


// =======================================================
// 🛒 2. ACTIVAR BOTONES DE "COMPRAR"
// =======================================================
function activarBotonesCarrito() {
    const botones = document.querySelectorAll('.add-to-cart-btn');

    botones.forEach(btn => {
        btn.addEventListener('click', () => {

            const item = {
                id: btn.dataset.id,
                nombre: btn.dataset.nombre,
                precio: Number(btn.dataset.precio),
                imagen: btn.dataset.imagen,
                cantidad: 1
            };

            agregarAlCarrito(item);
        });
    });
}


// =======================================================
// 🛒 3. AGREGAR AL CARRITO + ACTUALIZAR CONTADOR + AVISO
// =======================================================
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarContadorCarrito();
    mostrarAvisoCarrito(producto.nombre);
}


// =======================================================
// 🔵 4. ACTUALIZAR CONTADOR SUPERIOR
// =======================================================
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const badge = document.getElementById("cart-counter");

    if (badge) {
        badge.innerText = total;
        badge.style.display = total > 0 ? "flex" : "none";
    }
}


// =======================================================
// 🔔 5. NOTIFICACIÓN ELEGANTE BAJO EL CARRITO
// =======================================================
function mostrarAvisoCarrito(nombreProducto) {
    let aviso = document.getElementById("cart-alert");

    if (!aviso) {
        const carritoIcon = document.querySelector(".cart-icon");

        aviso = document.createElement("div");
        aviso.id = "cart-alert";
        aviso.className =
            "absolute top-12 right-0 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg opacity-0 transition-all duration-500";

        carritoIcon.appendChild(aviso);
    }

    aviso.textContent = `✔ ${nombreProducto} agregado al carrito`;
    aviso.style.opacity = "1";

    setTimeout(() => {
        aviso.style.opacity = "0";
    }, 2000);
}


// Inicializar contador al cargar página
actualizarContadorCarrito();
