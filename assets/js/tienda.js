// assets/js/tienda.js
// Tienda con un solo producto y selector de variante de audio

function renderizarTienda() {
    const contenedorGrid = document.getElementById('contenedor-grid');
    if (!contenedorGrid) return;

    // Usamos el único producto de data.js
    const producto = productosCalmi[0];
    contenedorGrid.innerHTML = '';

    // Generamos los botones de variante
    const variantesHTML = producto.variantes.map((v, i) => `
        <label class="variante-opcion ${i === 0 ? 'seleccionada' : ''}" data-id="${v.id}">
            <input type="radio" name="variante-audio" value="${v.id}" ${i === 0 ? 'checked' : ''} style="display:none">
            <span class="variante-icono">${v.icono}</span>
            <span class="variante-nombre">${v.nombre}</span>
        </label>
    `).join('');

    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-producto', 'tarjeta-unica');

    tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="tarjeta-body">
            <h3>${producto.nombre}</h3>
            <div class="precio">$${producto.precio.toLocaleString()} MXN</div>
            <p>${producto.descripcion}</p>

            <div class="selector-variante">
                <p class="selector-label">🎵 Elige tu dispositivo de audio:</p>
                <div class="variantes-grid" id="variantes-tienda">
                    ${variantesHTML}
                </div>
                <p class="variante-desc-texto" id="desc-variante-tienda">${producto.variantes[0].descripcion}</p>
            </div>

            <div class="tarjeta-acciones">
                <a href="producto.html?id=calmi-kit" class="btn btn-secundario">Ver Detalles</a>
                <button class="btn btn-primario-glow" onclick="agregarDesideTienda()">Agregar al carrito 🛒</button>
            </div>
        </div>
    `;

    contenedorGrid.appendChild(tarjeta);

    // Lógica de selección de variante
    const labels = tarjeta.querySelectorAll('.variante-opcion');
    const descTexto = tarjeta.querySelector('#desc-variante-tienda');

    labels.forEach(label => {
        label.addEventListener('click', () => {
            labels.forEach(l => l.classList.remove('seleccionada'));
            label.classList.add('seleccionada');
            const varId = label.dataset.id;
            const varInfo = producto.variantes.find(v => v.id === varId);
            if (varInfo && descTexto) descTexto.textContent = varInfo.descripcion;
        });
    });
}

// Función para agregar desde la tarjeta de tienda
function agregarDesideTienda() {
    const seleccionada = document.querySelector('#variantes-tienda .variante-opcion.seleccionada');
    const varianteId = seleccionada ? seleccionada.dataset.id : productosCalmi[0].variantes[0].id;
    const varianteNombre = productosCalmi[0].variantes.find(v => v.id === varianteId)?.nombre || '';

    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];

    // Solo se permite 1 kit en el carrito (se reemplaza si ya existe)
    const existente = carrito.find(item => item.id === 'calmi-kit');
    if (existente) {
        existente.varianteId = varianteId;
        existente.varianteNombre = varianteNombre;
        existente.cantidad = 1;
    } else {
        carrito.push({ id: 'calmi-kit', varianteId, varianteNombre, cantidad: 1 });
    }

    localStorage.setItem('carritoCalmi', JSON.stringify(carrito));
    if (typeof actualizarContadorNav === 'function') actualizarContadorNav();
    if (typeof mostrarNotificacion === 'function') {
        mostrarNotificacion(`¡Kit Calmi (${varianteNombre}) agregado! 🛒`, 'exito');
    }
}

// Ejecutar
renderizarTienda();