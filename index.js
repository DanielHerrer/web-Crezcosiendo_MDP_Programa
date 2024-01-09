// ============================ BASE DE DATOS ============================

// Recupera el administrador del localStorage
// let storedAdministrador = localStorage.getItem('administrador'); // MODIFICAR BASE DE DATOS
// let administrador = JSON.parse(storedAdministrador); // MODIFICAR BASE DE DATOS

// Recupera el contacto del localStorage
// const contactoGuardado = localStorage.getItem('contacto');
// Si no hay contacto guardado, inicializa como nulo
// let contacto = contactoGuardado ? JSON.parse(contactoGuardado) : null;

// Recupera la lista actual de productos del localStorage
// const productosGuardados = localStorage.getItem('productos');
// Si no hay productos guardados, inicializa la lista como un array vacío
// const productos = productosGuardados ? JSON.parse(productosGuardados) : [];

// >>>>>>>>>>>>>>>>>>>>>>>>>>> MODIFICAR PARA BASE DE DATOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<

let administrador = { // MODIFICAR BASE DE DATOS
    id: "444",
    usuario: "admin",
    clave: "admin",
    nombre: "Mabel Hortensia Medina"
};

/*let contacto = { // MODIFICAR BASE DE DATOS
    id: "5678",
    telefono: "+54 9 223 590-1382",
    horaInicio: '11:00',
    horaFin: '17:00',
    ubicacion: "Buenos Aires, Mar del Plata, Gascón 2169",
    id_admin: "444"
};*/

// Variable global para almacenar los productos
let productos = [];

// Función que obtiene los datos del servidor y actualiza la variable productos
async function obtenerDatosDeLaBaseDeDatos() {
    try {
        // Obtener la respuesta del servidor
        const response = await fetch('http://localhost:3500/products');

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Transformar los datos y asignar a productos
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        productos = transformarDatos(data.data);

        return productos;
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

// Función para mostrar todos los productos en la página
function mostrarProductosEnPagina() {
    // Limpiar el contenedor antes de mostrar los productos
    const contenedorProductos = document.getElementById('main-productos');
    contenedorProductos.innerHTML = '';

    // Mostrar cada producto en el DOM
    productos.forEach(mostrarProductoEnDOM);
}

// Función para transformar los datos del servidor al nuevo formato
function transformarDatos(datos) {
    return datos.map(producto => {
        return {
            id: producto.id,
            disponible: producto.disponible,
            titulo: producto.titulo,
            precio: producto.precio,
            fotos: [
                `http://localhost:3500/${producto.imagen1}`,
                `http://localhost:3500/${producto.imagen2}`,
                `http://localhost:3500/${producto.imagen3}`,
                `http://localhost:3500/${producto.imagen4}`
            ],
            descripcion: producto.descripcion
        };
    });
}



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

// Evento que se dispara al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar productos desde el servidor al iniciar la página
    await obtenerDatosDeLaBaseDeDatos();
    // Mostrar productos en la página después de la carga completa
    mostrarProductosEnPagina();
});



// Función para mostrar todos los productos en la página
function mostrarProductosEnPagina() {
    // Limpiar el contenedor antes de mostrar los productos
    const contenedorProductos = document.getElementById('main-productos');
    if (!contenedorProductos) {
        console.error("No se encontró el contenedor de productos en el DOM.");
        return;
    }

    contenedorProductos.innerHTML = '';

    // Mostrar cada producto en el DOM
    productos.forEach(mostrarProductoEnDOM);
}

// Evento que se dispara al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar productos desde el servidor al iniciar la página
    await obtenerDatosDeLaBaseDeDatos();
});

 
/*
const productos=[ // MODIFICAR BASE DE DATOS
    { id: 1, disponible: true, titulo: 'Kit Set completo de baño', precio: 5500, fotos: ['./img/products/product_set.jpg', './img/products/product_set02.jpg', './img/products/product_set03.jpg', './img/products/product_set04.jpg'], descripcion: 'El kit Set de Baño incluye una toalla suave de mano, pads quita maquillaje reutilizables, vincha para cabello y turbante absorbente.<br> Experimenta comodidad y funcionalidad en cada paso de tu rutina de cuidado personal. Un conjunto diseñado para mejorar tu experiencia después de un baño. <ul class="texto-item fw-bold fs-5" style="list-style-type: circle;"><li>Turbante para cabello</li><li>Toalla de mano</li><li>Pads quita maquillaje</li><li>Vincha de pelo</li></ul>' },
    { id: 2, disponible: true, titulo: 'Bata de toalla para baño', precio: 10500, fotos: ['./img/products/product_bata.jpg', './img/products/product_bata02.jpg', './img/products/product_bata03.jpg', './img/products/product_bata04.jpg'], descripcion: '<span style="text-decoration: underline;">Absorción superior</span>: La bata de baño está hecha de materiales altamente absorbentes que te ayudarán a secarte rápidamente después de bañarte. <br><span style="text-decoration: underline;">Comodidad en el diseño</span>: Su diseño espacioso y corte relajado brindan una sensación de comodidad y libertad de movimiento. <br> <span style="text-decoration: underline;">Durabilidad</span>: Utilizamos materiales de alta calidad para garantizar que nuestras batas sean duraderas y resistan el desgaste constante. Puedes confiar en la calidad y la resistencia de nuestras batas para que te acompañen durante mucho tiempo.' },
    { id: 3, disponible: false, titulo: 'Funda de toalla almohada', precio: 2900, fotos: ['./img/products/product_almohada.jpg', './img/products/product_almohada.jpg', './img/products/product_almohada.jpg', './img/products/product_almohada.jpg'], descripcion: '<span style="text-decoration: underline;">Compatibilidad rizado</span>: Recomendada especialmente para cabello rizado y ondulado, estas fundas son la respuesta al frizz no deseado. Ayudan a que tus rizos mantengan su forma y evitan el envejecimiento prematuro de tu cabello, preservando la integridad de tu peinado mientras se seca. <br><span style="text-decoration: underline;">Protección nocturna</span>: Nuestra funda de almohada está cuidadosamente diseñada para proteger tanto tu cabello como tu almohada mientras disfrutas de un sueño reparador con el cabello mojado.' },
];
*/

// ===================================== LOGIN =====================================


// Recibe el modal del login y sus botones
const modalLogin = document.querySelector("#modal-login");
const btnAbrirModalLogin = document.querySelector("#btn-modal-login");
const btnCerrarModalLogin = document.querySelector("#btn-cerrar-login");

// Espera el evento para abrir el modal
btnAbrirModalLogin.addEventListener("click", () => {
    modalLogin.showModal();
});

// Espera el evento para iniciar sesión
document.getElementById("form-login").addEventListener("submit", async function (event) {
    // Evitar el envío del formulario
    event.preventDefault();

    // Recibe los valores de los input usuario y contrasenia
    var user = document.getElementById("usuario").value;
    var password = document.getElementById("clave").value;

    // Recibe el elemento de estado informativo
    var info = document.getElementById("info-login");

    try {/*
        // Envía una solicitud POST al servidor para la autenticación
        const response = await fetch('http://localhost:3500/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: user, clave: password }),
        });*/
        //-----------borrrar---------------------
        function simularInicioSesion() {
            // Simula una respuesta exitosa del servidor
            const fakeResponse = {
                success: true,
                message: "Inicio de sesión exitoso",
            };
        
            // Simula un retardo de 1 segundo (puedes ajustar este valor)
            setTimeout(() => {
                // Almacena la información de inicio de sesión en el localStorage
                localStorage.setItem("usuarioSession", "true");
        
                // Redirige al usuario a admin.html después de la autenticación
                window.location.href = "admin.html";
            }, 1000); // 1000 milisegundos = 1 segundo
        
            return fakeResponse;
        }
        const response = await simularInicioSesion();
//-------------------borrar----------------------------------------
        const data = await response.json();

        if (data.success) {
            // Usuario autenticado
            localStorage.setItem("usuarioSession", "true");
            // Redirige al usuario a admin.html después de la autenticación
            window.location.href = "admin.html";
        } else {
            // Usuario no autenticado
            info.style.color = 'red';
            info.innerText = data.message || "Usuario o contraseña incorrectos.";
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        info.style.color = 'red';
        info.innerText = 'Error en la conexión con el servidor';
    }
});

// Función para cerrar el modal
function cerrarModal(modal) {
    if ('close' in modal) {
        modal.close();
    } else {
        // Si la propiedad close no está disponible, puedes ocultar el modal manualmente
        modal.style.display = 'none';
    }
}

// Asociar la función a eventos de cierre del modal
btnCerrarModalLogin.addEventListener("click", function () {
    cerrarModal(modalLogin);
});

// ============================ HEADER ADMINISTRACION ============================

// Funcion para saludar en la barra administrativa, ej: ("Mabel Hortensia Fernandez" => "Bienvenid@ Mabel")
function obtenerPrimerNombre(nombreCompleto) {
    // Dividir la cadena en palabras usando un espacio como separador
    const palabras = nombreCompleto.split(' ');
    // Devolver la primera palabra
    return palabras[0];
}

// Muestra u Oculta la barra administrativa
function comprobarSesion() {

    // Recibe los elementos a utilizar
    const btnLogin = document.getElementById("btn-modal-login");
    const headerAdmin = document.getElementById("encabezado-admin");
    const userAdmin = document.getElementById("usuario-nombre");
    const contenidoAdmin = document.getElementById("contenido-admin");

    // Si esta logueado
    // Verificar si la clave "usuarioSession" existe en localStorage
    if (localStorage.getItem("usuarioSession") == "true") {
        // Se oculta el boton de login
        btnLogin.style.display = "none";

        // Muestra la barra de administracion
        if (window.innerWidth <= 991) {
            // Si la ancho del dispositivo es menor o igual que 991px cambia el estilo de la barra administrativa
            headerAdmin.style.display = "block";
        } else {
            // Si la ancho del dispositivo es mayor que 991px cambia el estilo de la barra administrativa
            headerAdmin.style.display = "flex";
        }
        // Asigna el nombre del administrador
        userAdmin.innerText = "Bienvenid@ " + obtenerPrimerNombre(administrador.nombre);
        // Muestra el contenido del catalogo
        contenidoAdmin.style.display = "block";
    }
}

// Funcion para cerrar sesión
function cerrarSesion() {
    // Remover el estado de "logueado" del localStorage
    localStorage.removeItem("usuarioSession");
    window.location.href = "home.html";
    console.log("Sesión cerrada correctamente.");
}

// ============================ CARRITO DE COMPRAS ============================

// Si no hay ningún carrito almacenado, se inicializa como un array vacío 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Funcion que actualiza el contador del carrito ubicado en la esquina superior derecha
function actualizarContadorCarrito() {

    // Recibe el elemento contador del carrito
    const contadorCarrito = document.querySelector(".carrito-contador");
    // Inicia variable en 0
    let cantidadItems = 0;
    // Recorre la lista de carrito y acumula la cantidad de cada item alojado
    carrito.forEach(item => {
        cantidadItems += item.cantidad;
    });

    // Si la cantidad de items en el carrito es mayor a 0
    if (cantidadItems > 0) {
        // Entonces muestra el contador
        contadorCarrito.style.display = 'block';
        if (cantidadItems < 10) {
            contadorCarrito.innerHTML = `${cantidadItems}`;
        } else {
            contadorCarrito.innerHTML = `+9`;
        }
    } else {
        // Sino oculta el contador
        contadorCarrito.style.display = 'none';
    }
}

// ============================ FOOTER ============================

// Recibe el elemento informacion del footer
const textoCreador = document.querySelector(".info-creador");
// Recibe el año actual
const añoActual = new Date().getFullYear();
// Muestra la informacion del equipo de desarrolladores
textoCreador.innerHTML = `&copy; ${añoActual} Crezcosiendo, <a href="https://biolink.website/MDP_Programa_Crezcosiendo" target="_blank" rel="noopener noreferrer">MDP Programa</a>`;
