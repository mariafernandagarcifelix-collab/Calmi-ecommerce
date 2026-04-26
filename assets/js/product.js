const parametrosURL = new URLSearchParams(window.location.search);
const productoId = parametrosURL.get('id');

const contenedorDetalle = document.getElementById('producto-detalle');
const contenedorError = document.getElementById('producto-no-encontrado');

// Variable global temporal para guardar la info del producto cuando se consulte
let productoActual = null;

async function cargarDetalleProducto() {
    try {
        const respuesta = await fetch('/api/productos');
        const productosDb = await respuesta.json();

        // Buscamos el producto por su id_interno
        productoActual = productosDb.find(prod => prod.id_interno === productoId);

        if (productoActual) {
            const listaItems = productoActual.incluye.map(item => `<li>${item}</li>`).join('');
            
            // Generamos las tarjetas de especificaciones dinámicamente
            const listaSpecs = productoActual.especificaciones.map(spec => `
                <div class="spec-item">
                    <span class="spec-titulo">${spec.caracteristica}</span>
                    <span class="spec-valor">${spec.detalle}</span>
                </div>
            `).join('');

            contenedorDetalle.innerHTML = `
                <div class="producto-imagen">
                    <img src="${productoActual.imagen}" alt="${productoActual.nombre}">
                </div>
                <div class="producto-info">
                    <h1>${productoActual.nombre}</h1>
                    <div class="precio-destacado">$${productoActual.precio.toLocaleString()} MXN</div>
                    
                    <div class="seccion-ideal">
                        <strong>🌟 Ideal para:</strong>
                        ${productoActual.ideal_para}
                    </div>

                    <p>${productoActual.descripcion}</p>
                    <p><strong>Beneficio clínico:</strong> ${productoActual.beneficios}</p>
                    
                    <hr style="border: 0; border-top: 1px solid var(--azul-pastel); margin: 2rem 0;">

                    <h3 style="color: var(--color-primario); margin-bottom: 1rem;">Especificaciones Técnicas</h3>
                    <div class="especificaciones-grid">
                        ${listaSpecs}
                    </div>

                    <h3 style="color: var(--color-primario); margin-bottom: 1rem;">¿Qué incluye la caja?</h3>
                    <ul class="lista-incluye">
                        ${listaItems}
                    </ul>

                    <button id="btn-agregar" class="btn btn-primario-glow" style="width: 100%; margin-top: 1rem; font-size: 1.1rem; padding: 15px;" onclick="agregarAlCarrito('${productoActual.id_interno}')">
                        Agregar al Carrito 🛒
                    </button>
                </div>
            `;
        } else {
            contenedorDetalle.style.display = 'none';
            contenedorError.style.display = 'block';
        }
    } catch (error) {
        console.error("Error al cargar producto:", error);
    }
}

// LÓGICA DEL CARRITO 
function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];
    const productoExistente = carrito.find(item => item.id === idProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id: idProducto, cantidad: 1 });
    }

    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));

    if (typeof actualizarContadorNav === 'function') {
        actualizarContadorNav();
    }
    
    if (typeof mostrarNotificacion === 'function') {
        mostrarNotificacion(`¡${productoActual.nombre} agregado!`, 'exito');
    }

    const boton = document.getElementById('btn-agregar');
    boton.innerText = "¡Agregado!";
    boton.style.backgroundColor = "var(--verde-menta)";
    boton.style.color = "var(--color-primario)";
    
    setTimeout(() => {
        boton.innerText = "Agregar al Carrito 🛒";
        boton.style.backgroundColor = "var(--color-primario)";
        boton.style.color = "var(--white)";
    }, 2000);
}

// Ejecutar
cargarDetalleProducto();