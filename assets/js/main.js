
// Función global para actualizar el contador del carrito en la barra de navegación
function actualizarContadorNav() {
    // 1. Obtenemos el carrito de la memoria
    const carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];
    
    // 2. Sumamos las cantidades de todos los productos
    let totalArticulos = 0;
    carrito.forEach(item => {
        totalArticulos += item.cantidad;
    });

    // 3. Buscamos el elemento en el HTML y le ponemos el número
    const contadorDOM = document.getElementById('cart-count');
    if (contadorDOM) {
        contadorDOM.innerText = totalArticulos;
    }
}

// Esto hace que la función se ejecute automáticamente cada vez que cargues CUALQUIER página
document.addEventListener('DOMContentLoaded', actualizarContadorNav);

// Función para crear y mostrar notificaciones flotantes (Toasts)
function mostrarNotificacion(mensaje, tipo = 'exito') {
    // 1. Buscamos si ya existe el contenedor de notificaciones
    let contenedor = document.querySelector('.toast-contenedor');
    
    // Si no existe, lo creamos y lo agregamos al body
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.className = 'toast-contenedor';
        document.body.appendChild(contenedor);
    }

    // 2. Creamos la notificación
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    
    // Asignamos un icono dependiendo del tipo
    const icono = tipo === 'exito' ? '✅' : '❌';
    toast.innerHTML = `<span>${icono}</span> <span>${mensaje}</span>`;

    // 3. Agregamos la notificación al contenedor
    contenedor.appendChild(toast);

    // 4. Temporizador para desaparecerla después de 3.5 segundos
    setTimeout(() => {
        toast.classList.add('saliendo'); // Activa la animación de salida
        // Esperamos a que termine la animación para borrarla del HTML
        setTimeout(() => {
            toast.remove();
        }, 400); 
    }, 2000);
}

// =========================================
// LÓGICA DE MODO OSCURO (DARK MODE)
// =========================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// 1. Verificar si ya hay una preferencia guardada
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.innerText = '☀️'; // Cambia a sol si está en oscuro
}

// 2. Escuchar el clic en el botón
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeIcon.innerText = '☀️';
        } else {
            themeIcon.innerText = '🌙';
        }
        
        // Guardar la elección del usuario
        localStorage.setItem('theme', theme);
    });
}

