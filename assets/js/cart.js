// assets/js/cart.js

// Función principal para renderizar el carrito
function renderizarCarrito() {
    const listaCarrito   = document.getElementById('lista-carrito');
    const resumenCarrito = document.getElementById('resumen-carrito');
    const subtotalDOM    = document.getElementById('subtotal-precio');
    const totalDOM       = document.getElementById('total-precio');

    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];

    // Carrito vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h2>Tu carrito está vacío 🛒</h2>
                <p>Descubre el Kit Calmi y elige tu dispositivo de audio.</p>
                <br>
                <a href="tienda.html" class="btn btn-primary">Ir a la tienda</a>
            </div>
        `;
        resumenCarrito.style.display = 'none';
        actualizarContadorGlobal(0);
        return;
    }

    resumenCarrito.style.display = 'block';
    listaCarrito.innerHTML = '';

    let subtotal = 0;
    let totalArticulos = 0;
    let ticketHTML = '';

    carrito.forEach((item, index) => {
        // Buscamos el producto en data.js por id
        const infoProducto = productosCalmi.find(p => p.id === item.id);
        if (!infoProducto) return;

        const costoFila = infoProducto.precio * item.cantidad;
        subtotal       += costoFila;
        totalArticulos += item.cantidad;

        // Nombre a mostrar: incluye variante si existe
        const nombreMostrar = item.varianteNombre
            ? `${infoProducto.nombre} <span class="variante-tag">${item.varianteNombre}</span>`
            : infoProducto.nombre;

        const varianteMostrar = item.varianteNombre
            ? `${item.varianteNombre}`
            : '';

        // Ticket lateral
        ticketHTML += `
            <li class="ticket-item">
                <span>${item.cantidad}x ${infoProducto.nombre}${varianteMostrar ? ' — ' + varianteMostrar : ''}</span>
                <span style="font-weight:600;">$${costoFila.toLocaleString()}</span>
            </li>
        `;

        // Tarjeta del item
        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <img src="${infoProducto.imagen}" alt="${infoProducto.nombre}"
                     onerror="this.src='https://via.placeholder.com/80?text=Kit'">

                <div class="item-info">
                    <h4>${infoProducto.nombre}</h4>
                    ${item.varianteNombre ? `<p class="variante-elegida">🎵 ${item.varianteNombre}</p>` : ''}
                    <p>$${infoProducto.precio.toLocaleString()} MXN</p>
                    <button class="btn-eliminar" onclick="eliminarItem(${index})">Eliminar</button>
                </div>

                <div class="controles-cantidad">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>

                <div class="precio-fila" style="font-weight:bold; font-size:1.2rem;">
                    $${costoFila.toLocaleString()}
                </div>
            </div>
        `;
    });

    subtotalDOM.innerText = `$${subtotal.toLocaleString()} MXN`;
    totalDOM.innerText    = `$${subtotal.toLocaleString()} MXN`;

    const ticketDOM = document.getElementById('ticket-lista');
    if (ticketDOM) ticketDOM.innerHTML = ticketHTML;

    actualizarContadorGlobal(totalArticulos);
}

// Cambiar cantidad
function cambiarCantidad(indice, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi'));
    carrito[indice].cantidad += cambio;
    if (carrito[indice].cantidad <= 0) carrito.splice(indice, 1);
    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));
    renderizarCarrito();
}

// Eliminar item
function eliminarItem(indice) {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi'));
    carrito.splice(indice, 1);
    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));
    renderizarCarrito();
}

// Simular compra
async function simularCompra() {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];

    const datosOrden = {
        productos: carrito.map(item => {
            const info = productosCalmi.find(p => p.id === item.id);
            return {
                id_producto:    item.id,
                variante:       item.varianteId || null,
                variante_nombre: item.varianteNombre || null,
                cantidad:       item.cantidad,
                precio_unitario: info ? info.precio : 0
            };
        }),
        total: parseFloat(document.getElementById('total-precio').innerText.replace(/[^0-9.-]+/g, ''))
    };

    try {
        const respuesta = await fetch('/api/ordenes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosOrden)
        });

        if (respuesta.ok) {
            mostrarNotificacion('¡Compra confirmada! 🎉', 'exito');
            localStorage.removeItem('carritoCalmi');
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        }
    } catch (error) {
        mostrarNotificacion('Hubo un problema con el servidor. Intenta más tarde.', 'error');
    }
}

// Actualizar badge del navbar
function actualizarContadorGlobal(cantidad) {
    const contadorDOM = document.getElementById('cart-count');
    if (contadorDOM) contadorDOM.innerText = cantidad;
}

// Ejecutar al cargar
renderizarCarrito();