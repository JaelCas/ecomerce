const API_URL = "https://ecomerce-1-1jpe.onrender.com/api";

// Función para agregar al carrito
function agregarAlCarrito(productId, nombre, precio, image, descripcion) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carrito.find(item => item.productId === productId);
    
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ 
            productId, 
            nombre, 
            precio, 
            image, 
            descripcion: descripcion || '', 
            cantidad: 1 
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    
    // Notificación toast verde (sin alert)
    mostrarNotificacion('✅ Producto agregado al carrito');
}

// Mostrar notificación toast verde
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 transform transition-all duration-500 ease-out';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(400px)';
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-semibold">${mensaje}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Actualizar contador del carrito
function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById('cart-counter');
    
    if (contador) {
        contador.textContent = total;
        if (total > 0) {
            contador.style.display = 'flex';
        } else {
            contador.style.display = 'none';
        }
    }
}


// funcion de cargar productos 

async function cargarProductos(){
    try {
        const response = await fetch('https://ecomerce-1-1jpe.onrender.com/api/producto');
        const productos = await response.json();

        const grid = document.getElementById('products-grid');
            grid.innerHTML = productos.map(productos=>`
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 product-card"
                data-category="laptops"
                data-price="${productos.precio}"
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
                <h3 class="text-lg font-bold text-gray-800">
                ${productos.Nombre}
                </h3>
                <p class="text-sm text-gray-800 mb-4">
                ${productos.Descripcion}
                </p>
                <div class="flex items-center justify-between mt-4">
                <div>
                <span class="text-2xl font-bold text-blue-600">
                ${(productos.Precio || 0).toLocaleString('es-CO')}
                </span>
                </div>

                <div class="flex text-yellow-600">
                ⭐️⭐️⭐️⭐️⭐️
                </div>
                </div>
                <div class="flex space-x-2">
                <button class=" ver-detalles=btn bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex-1 text-sm">
                Ver Detalles
                </button>
                <button class="add-to-cart-btn bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex-1 text-sm">
                Comprar
                </button>
                </div>
                </div>
                </div>
                `).join('');
                console.log("Productos cargados correctamente");
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
} 
//
cargarProductos();

//Carga automatica de productos al cargar la pagina
setInterval(()=>{
    cargarProductos();
},5000); // 5000 ms = 5 segundos