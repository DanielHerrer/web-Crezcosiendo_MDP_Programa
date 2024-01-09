// ============================ BASE DE DATOS ============================

// La informacion de productos, administrador y contacto viene desde index.js !!!!!!

// --------------------------------------------------------------

// =================================== PRODUCTOS ===================================
// Variable global para almacenar los productos

// Función para mostrar un producto en el DOM
function mostrarProductoEnDOM(producto) {
    const contenedorProductos = document.getElementById('main-productos');

    const productoHTML = `
    <div id="producto-item">
        <div class="producto-caja-info">
            <h2 class="titulo-item fw-normal lh-1">${producto.titulo}</h2>
            <p class="texto-item lead">${producto.descripcion}</p>
        </div>
        <div class="producto-caja-vista">
            <div class="producto-vista">
                <div class="producto-vista-precio">$${producto.precio}</div>
                <img src="${producto.fotos[0]}" alt="${producto.titulo}" class="marco-disponible 
                producto-vista-imagen featurette-image img-fluid mx-auto" role="img"
                    preserveAspectRatio="xMidYMid slice" focusable="false" width="500" height="500"></img>
                <div class="producto-botones">
                    <button onclick="modalDetalles(${producto.id});" class="boton-producto boton-producto-ver">
                        <i class="fa-solid fa-circle-info"></i> Detalles
                    </button>
                    <button onclick="agregarAlCarrito(${producto.id}); notificacionCarrito(this, ${producto.id}); actualizarContadorCarrito();" 
                        class="boton-producto boton-producto-carrito">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr class="featurette-divider">
`;


   // Inserta el producto en el contenedor
   contenedorProductos.innerHTML += productoHTML;
}

// Función para mostrar todos los productos en la página
function mostrarProductos() {
    // Verificar si productos está definido antes de intentar acceder a él
    if (!productos) {
        console.error('La variable productos no está definida. Esperando a que se obtengan los datos del servidor.');
        return;
    }

    // Llama a la función mostrarProductoEnDOM para cada producto
    productos.forEach(producto => {
        mostrarProductoEnDOM(producto);
    });
}
/*
// Función para obtener datos del servidor y mostrar productos en la página
async function init() {
    try {
        const response = await fetch('http://localhost:3500/products');

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        productos = transformarDatos(data.data);

        // Llama a la función mostrarProductos después de obtener los datos
        mostrarProductos();
    } catch (error) {
        console.error('Error en la solicitud:', error);
        
    }
    
}

// Llama a la función init al cargar la página
window.onload = init;

*/
// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    // Busca el producto por ID
    const producto = productos.find(p => p.id === id);
    // Si el producto existe en la base de datos
    if (producto) {
        // Si el producto ya esta previamente añadido al carrito
        const existente = carrito.find(item => item.id === id);
        if (existente) {
            // Entonces le suma +1 a su cantidad
            existente.cantidad++;
        } else {
            // Sino entonces lo añade al carrito
            carrito.push({ ...producto, cantidad: 1 });
        }
        // Guarda los datos del carrito en el localStorage
        guardarCarritoEnLocalStorage();
    }
}

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Notificacion añadido al carrito
function notificacionCarrito(boton, id) {
    // Busca el producto por ID
    const producto = productos.find(p => p.id === id);
    // Recibe el elemento notificacion
    const carritoNotificacion = document.getElementById("carrito-notificacion");
    // Obtiene todos los botones de 'agregar al carrito'
    const botonesCarrito = document.querySelectorAll(".boton-producto-carrito");
    // Desactiva todos los botones de carrito temporalmente (evita bug)
    botonesCarrito.forEach(boton => {
        boton.disabled = true;
    });
    // Le añade el estilo al elemento notificacion para mostrarlo
    carritoNotificacion.classList.add("mostrar");
    carritoNotificacion.innerText = "Producto agregado: '" + producto.titulo + "'";

    // Después de un tiempo, se oculta la notificación
    setTimeout(function () {
        carritoNotificacion.classList.remove("mostrar");
        carritoNotificacion.innerHTML = "";
        // Reactiva todos los botones de carrito
        botonesCarrito.forEach(boton => {
            boton.disabled = false;
        });
    }, 2000); // 2000 milisegundos = 2 segundos
}

// =================================== MODAL DETALLES PRODUCTO ===================================

// Funcion para mostrar el modal detalles de producto
function modalDetalles(id) {
    // Busca el producto por ID
    const producto = productos.find(p => p.id == id);
    // Recibe el elemento modal de producto detalles
    const modalProducto = document.querySelector("#modal-producto");
    // Recibe el elemento contenedor
    const modalContenido = document.querySelector(".modal-producto-content");
    // Muestra el modal
    modalProducto.showModal();

    // Concatena al contenido los detalles del producto buscado por ID
    modalContenido.innerHTML = `
        <div class="fotos-producto">
            <img class="foto-max" src="${producto.fotos[0]}" alt="">
            <div class="barra-fotos">
                <img class="foto-min" src="${producto.fotos[0]}" onclick="actualizarFoto('${producto.fotos[0]}');" alt="">
                <img class="foto-min" src="${producto.fotos[1]}" onclick="actualizarFoto('${producto.fotos[1]}');" alt="">
                <img class="foto-min" src="${producto.fotos[2]}" onclick="actualizarFoto('${producto.fotos[2]}');" alt="">
                <img class="foto-min" src="${producto.fotos[3]}" onclick="actualizarFoto('${producto.fotos[3]}');" alt="">
            </div>
        </div>
        <div class="descripcion-producto">
            <div class="precio-producto">$${producto.precio}</div>
            <h2 class="titulo-producto">${producto.titulo}</h2>
            <p class="parrafo-producto">${producto.descripcion}</p>
        </div>
    `;

}

// Funcion para mejorar la vista de fotos del modal detalles de producto
function actualizarFoto(url) {
    const fotoMax = document.querySelector(".foto-max");
    fotoMax.src = url;
}

// Funcion para cerrar el modal detalles de producto
function cerrarDetalles() {
    const modalProducto = document.querySelector("#modal-producto");
    modalProducto.close();
}

// =================================== EVENTOS al CARGAR PAGINA =================================== 

window.onload = function () {
    // Se actualiza la lista de carrito almacenada en localStorage
    cargarCarritoDesdeLocalStorage();
    // Se actualiza el contador del carrito ubicado en la esquina superior derecha
    actualizarContadorCarrito();
    // Se refresca y muestra la lista de productos guardados en la base de datos
    //mostrarProductos();
    // Comprueba si el usuario esta logueado como ADMIN y evalua si debe mostrar o no la barra de administracion
    comprobarSesion();
};