// Función principal para renderizar el carrito
function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const resumenCarrito = document.getElementById('resumen-carrito');
    const subtotalDOM = document.getElementById('subtotal-precio');
    const totalDOM = document.getElementById('total-precio');
    
    // Obtenemos los datos del LocalStorage (si no hay, usamos un arreglo vacío)
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];

    // Si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h2>Tu carrito está vacío 🛒</h2>
                <p>Descubre los kits que tenemos para ti y tu familia.</p>
                <br>
                <a href="tienda.html" class="btn btn-primary">Ir a la tienda</a>
            </div>
        `;
        resumenCarrito.style.display = 'none'; // Ocultamos el cuadro de total
        actualizarContadorGlobal(0);
        return;
    }

    resumenCarrito.style.display = 'block'; // Mostramos el total si hay productos
    listaCarrito.innerHTML = ''; // Limpiamos antes de dibujar
    
    let subtotal = 0;
    let totalArticulos = 0;
    let ticketHTML = '';

    // Recorremos cada ítem guardado
    carrito.forEach((item, index) => {
        const infoProducto = productosCalmi.find(p => p.id === item.id);
        
        if (infoProducto) {
            const costoFila = infoProducto.precio * item.cantidad;
            subtotal += costoFila;
            totalArticulos += item.cantidad;

            // AGREGAMOS ESTA LÍNEA PARA LLENAR EL TICKET
            ticketHTML += `
                <li class="ticket-item">
                    <span>${item.cantidad}x ${infoProducto.nombre}</span> 
                    <span style="font-weight: 600;">$${costoFila.toLocaleString()}</span>
                </li>
            `;

            // Dibujamos el producto
            listaCarrito.innerHTML += `
                <div class="item-carrito">
                    <img src="${infoProducto.imagen}" alt="${infoProducto.nombre}" onerror="this.src='https://via.placeholder.com/80?text=Kit'">
                    
                    <div class="item-info">
                        <h4>${infoProducto.nombre}</h4>
                        <p>$${infoProducto.precio.toLocaleString()} MXN</p>
                        <button class="btn-eliminar" onclick="eliminarItem(${index})">Eliminar</button>
                    </div>

                    <div class="controles-cantidad">
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                    </div>

                    <div class="precio-fila" style="font-weight: bold; font-size: 1.2rem;">
                        $${costoFila.toLocaleString()}
                    </div>
                </div>
            `;
        }
    });

    // Actualizamos los textos de los totales
    subtotalDOM.innerText = `$${subtotal.toLocaleString()} MXN`;
    totalDOM.innerText = `$${subtotal.toLocaleString()} MXN`; 
    
    // NUEVO: Inyectamos el ticket en el HTML
    const ticketDOM = document.getElementById('ticket-lista');
    if(ticketDOM) {
        ticketDOM.innerHTML = ticketHTML;
    }
    
    actualizarContadorGlobal(totalArticulos);
}

// Función para sumar o restar cantidades
function cambiarCantidad(indice, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi'));
    
    carrito[indice].cantidad += cambio;

    // Si la cantidad llega a 0, lo eliminamos
    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1); // Quita 1 elemento en la posición "indice"
    }

    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));
    renderizarCarrito(); // Volvemos a dibujar
}

// Función para eliminar un producto completo
function eliminarItem(indice) {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi'));
    carrito.splice(indice, 1);
    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));
    renderizarCarrito();
}

// Función para simular el pago
async function simularCompra() {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];
    
    // Preparamos los datos para el servidor
    // Cruzamos con data.js (o productos obtenidos) para tener precios
    const datosOrden = {
        productos: carrito.map(item => {
            const info = productosCalmi.find(p => p.id === item.id);
            return {
                id_producto: item.id,
                cantidad: item.cantidad,
                precio_unitario: info ? info.precio : 0
            };
        }),
        total: parseFloat(document.getElementById('total-precio').innerText.replace(/[^0-9.-]+/g,"")) * 1000 // Limpieza simple de moneda
    };

    try {
        const respuesta = await fetch('/api/ordenes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosOrden)
        });

        if (respuesta.ok) {
            const resultado = await respuesta.json();
            
            // ¡ADIÓS ALERT! HOLA NOTIFICACIÓN
            mostrarNotificacion(`¡Compra confirmada!`, 'exito');
            
            localStorage.removeItem('carritoCalmi');
            
            // Le damos 2 segundos para que el usuario lea la notificación antes de mandarlo al inicio
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    } catch (error) {
        // Notificación de error si falla el servidor
        mostrarNotificacion("Hubo un problema con el servidor. Intenta más tarde.", "error");
    }
}

// Función para que el numerito del carrito en el menú de arriba se actualice
function actualizarContadorGlobal(cantidad) {
    const contadorDOM = document.getElementById('cart-count');
    if (contadorDOM) {
        contadorDOM.innerText = cantidad;
    }
}

// ==========================================
// EJECUTAR AL CARGAR LA PÁGINA
// ==========================================
renderizarCarrito();