// assets/js/product.js
// Detalle del único Kit Calmi con selector de variante de audio

const contenedorDetalle = document.getElementById('producto-detalle');
const contenedorError  = document.getElementById('producto-no-encontrado');

// El único producto viene de data.js
let productoActual = productosCalmi[0];
let varianteSeleccionada = productoActual.variantes[0]; // Default: in-ear

function renderizarDetalle() {
    if (!productoActual) {
        contenedorDetalle.style.display = 'none';
        contenedorError.style.display  = 'block';
        return;
    }

    // Lista "qué incluye"
    const listaItems = productoActual.incluye
        .map(item => `<li>${item}</li>`)
        .join('');

    // Botones de variante
    const variantesHTML = productoActual.variantes.map((v, i) => `
        <label class="variante-opcion ${i === 0 ? 'seleccionada' : ''}" data-id="${v.id}" data-nombre="${v.nombre}" data-desc="${v.descripcion}">
            <input type="radio" name="variante-audio" value="${v.id}" ${i === 0 ? 'checked' : ''} style="display:none">
            <span class="variante-icono">${v.icono}</span>
            <span class="variante-nombre">${v.nombre}</span>
        </label>
    `).join('');

    contenedorDetalle.innerHTML = `
        <div class="producto-imagen">
            <img src="${productoActual.imagen}" alt="${productoActual.nombre}" id="img-producto">
        </div>
        <div class="producto-info">
            <h1>${productoActual.nombre}</h1>
            <div class="precio-destacado">$${productoActual.precio.toLocaleString()} MXN</div>

            <p>${productoActual.descripcion}</p>

            <hr style="border:0; border-top:1px solid var(--azul-pastel); margin:1.5rem 0;">

            <h3 style="color:var(--color-primario); margin-bottom:1rem;">🎵 Elige tu dispositivo de audio</h3>
            <p style="color:var(--text-light); font-size:0.95rem; margin-bottom:1rem;">
                El precio es el mismo sin importar tu elección. Selecciona el que mejor se adapte a la rutina de tu hijo.
            </p>

            <div class="variantes-grid" id="variantes-detalle">
                ${variantesHTML}
            </div>

            <div class="variante-descripcion-card" id="card-desc-variante">
                <strong id="nombre-variante-sel">${productoActual.variantes[0].nombre}</strong>
                <p id="desc-variante-sel">${productoActual.variantes[0].descripcion}</p>
            </div>

            <hr style="border:0; border-top:1px solid var(--azul-pastel); margin:1.5rem 0;">

            <h3 style="color:var(--color-primario); margin-bottom:1rem;">¿Qué incluye la caja?</h3>
            <ul class="lista-incluye">
                ${listaItems}
            </ul>

            <button id="btn-agregar" class="btn btn-primario-glow"
                style="width:100%; margin-top:1.5rem; font-size:1.1rem; padding:15px;"
                onclick="agregarAlCarrito()">
                Agregar al Carrito 🛒
            </button>
        </div>
    `;

    // Activar selección de variantes
    const labels = document.querySelectorAll('#variantes-detalle .variante-opcion');
    const nombreSel = document.getElementById('nombre-variante-sel');
    const descSel   = document.getElementById('desc-variante-sel');

    labels.forEach(label => {
        label.addEventListener('click', () => {
            labels.forEach(l => l.classList.remove('seleccionada'));
            label.classList.add('seleccionada');
            varianteSeleccionada = productoActual.variantes.find(v => v.id === label.dataset.id);
            nombreSel.textContent = varianteSeleccionada.nombre;
            descSel.textContent   = varianteSeleccionada.descripcion;
        });
    });
}

// Agregar al carrito desde la página de detalle
function agregarAlCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];

    const existente = carrito.find(item => item.id === 'calmi-kit');
    if (existente) {
        existente.varianteId    = varianteSeleccionada.id;
        existente.varianteNombre = varianteSeleccionada.nombre;
        existente.cantidad       = 1;
    } else {
        carrito.push({
            id: 'calmi-kit',
            varianteId: varianteSeleccionada.id,
            varianteNombre: varianteSeleccionada.nombre,
            cantidad: 1
        });
    }

    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));

    if (typeof actualizarContadorNav === 'function') actualizarContadorNav();
    if (typeof mostrarNotificacion === 'function') {
        mostrarNotificacion(`¡Kit Calmi (${varianteSeleccionada.nombre}) agregado!`, 'exito');
    }

    const boton = document.getElementById('btn-agregar');
    boton.innerText = '¡Agregado! ✓';
    boton.style.backgroundColor = 'var(--verde-menta)';
    boton.style.color = 'var(--color-primario)';

    setTimeout(() => {
        boton.innerText = 'Agregar al Carrito 🛒';
        boton.style.backgroundColor = 'var(--color-primario)';
        boton.style.color = 'white';
    }, 2000);
}

// Ejecutar
renderizarDetalle();