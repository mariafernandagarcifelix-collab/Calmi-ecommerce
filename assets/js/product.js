// assets/js/product.js
// Detalle del único Kit Calmi con selector de variante de audio

const contenedorDetalle   = document.getElementById('producto-detalle');
const contenedorError     = document.getElementById('producto-no-encontrado');
const contenedorSecciones = document.getElementById('producto-secciones');

// El único producto viene de data.js
let productoActual = productosCalmi[0];
let varianteSeleccionada = productoActual.variantes[0]; // Default: in-ear

function renderizarDetalle() {
    if (!productoActual) {
        contenedorDetalle.style.display   = 'none';
        contenedorError.style.display     = 'block';
        if (contenedorSecciones) contenedorSecciones.style.display = 'none';
        return;
    }

    // Botones de variante de audio
    const variantesHTML = productoActual.variantes.map((v, i) => `
        <label class="variante-opcion ${i === 0 ? 'seleccionada' : ''}"
               data-id="${v.id}" data-nombre="${v.nombre}" data-desc="${v.descripcion}">
            <input type="radio" name="variante-audio" value="${v.id}" ${i === 0 ? 'checked' : ''} style="display:none">
            <span class="variante-icono">${v.icono}</span>
            <span class="variante-nombre">${v.nombre}</span>
        </label>
    `).join('');

    // ── Todo el contenido va dentro de producto-info, ANTES del botón ──────
    contenedorDetalle.innerHTML = `
        <div class="producto-imagen">
            <img src="${productoActual.imagen}" alt="${productoActual.nombre}" id="img-producto">
        </div>

        <div class="producto-info">

            <!-- Tagline emocional -->
            <p class="producto-tagline">
                Tecnología diseñada para prevenir despertares abruptos, calmar la ansiedad nocturna
                y devolverle las noches de sueño a toda la familia.
            </p>

            <h1>${productoActual.nombre}</h1>
            <div class="precio-destacado">$${productoActual.precio.toLocaleString()} MXN</div>

            <p style="color:var(--text-light); line-height:1.7; margin-top:0.5rem;">${productoActual.descripcion}</p>

            <div class="info-divider"></div>

            <!-- ── Selector de dispositivo de audio ── -->
            <h3 class="info-titulo-seccion">🎵 Elige tu dispositivo de audio</h3>
            <p class="info-subtexto">
                El precio es el mismo sin importar tu elección.
                Selecciona el que mejor se adapte a la rutina de tu hijo.
            </p>

            <div class="variantes-grid" id="variantes-detalle">
                ${variantesHTML}
            </div>

            <div class="variante-descripcion-card" id="card-desc-variante">
                <strong id="nombre-variante-sel">${productoActual.variantes[0].nombre}</strong>
                <p id="desc-variante-sel">${productoActual.variantes[0].descripcion}</p>
            </div>

            <div class="info-divider"></div>

            <!-- ── ¿Qué incluye? ── -->
            <h3 class="info-titulo-seccion">📦 ¿Qué incluye tu paquete CALMI?</h3>

            <div class="incluye-inline">
                <div class="incluye-inline-item">
                    <span class="incluye-inline-icono">⌚</span>
                    <div>
                        <strong>Pulsera Inteligente de Monitoreo Nocturno</strong>
                        <p>Un dispositivo ultra ligero que se usa durante la noche. Sus sensores biométricos vigilan en tiempo real el ritmo cardíaco, la temperatura y los movimientos bruscos para detectar cualquier señal de estrés o pesadillas antes de que ocurra un despertar total.</p>
                    </div>
                </div>
                <div class="incluye-inline-item">
                    <span class="incluye-inline-icono">🎧</span>
                    <div>
                        <strong>Audífonos Ergonómicos para Dormir</strong>
                        <p>Diseñados específicamente para personas con hipersensibilidad táctil. Son suaves, hipoalergénicos y no lastiman al girar en la cama. A través de ellos se transmite la terapia de sonido.</p>
                    </div>
                </div>
                <div class="incluye-inline-item">
                    <span class="incluye-inline-icono">📱</span>
                    <div>
                        <strong>Acceso Total a la App Móvil CALMI</strong>
                        <p>Tu centro de control. Desde aquí puedes ver la calidad del sueño de tu hijo, configurar la música relajante, activar el "Alivio Rápido" y tener un historial completo de sus noches.</p>
                    </div>
                </div>
            </div>

            <div class="info-divider"></div>

            <!-- ── ¿Cómo protege el sueño? ── -->
            <h3 class="info-titulo-seccion">🌙 ¿Cómo protege el sueño de tu hijo?</h3>

            <div class="pasos-inline">
                <div class="paso-inline">
                    <div class="paso-inline-num">01</div>
                    <div>
                        <strong>Vigila en Silencio</strong>
                        <p>Mientras el usuario duerme, la pulsera monitorea sus signos vitales sin ser invasiva.</p>
                    </div>
                </div>
                <div class="paso-inline">
                    <div class="paso-inline-num">02</div>
                    <div>
                        <strong>Detecta y Anticipa</strong>
                        <p>Si el sistema nota un aumento de ansiedad, agitación o estrés, reacciona instantáneamente sin que tú tengas que levantarte.</p>
                    </div>
                </div>
                <div class="paso-inline">
                    <div class="paso-inline-num">03</div>
                    <div>
                        <strong>Calma Automáticamente</strong>
                        <p>Se activa de forma silenciosa una terapia sonora (ruido rosa, blanco o frecuencias personalizadas) directo en los audífonos, envolviendo al usuario en un ambiente seguro que lo ayuda a volver al sueño profundo.</p>
                    </div>
                </div>
            </div>

            <div class="info-divider"></div>

            <!-- ── Beneficios ── -->
            <h3 class="info-titulo-seccion">✨ Beneficios</h3>

            <div class="beneficios-inline">
                <div class="beneficio-inline-item">
                    <span class="beneficio-inline-icono">🧘</span>
                    <div>
                        <strong>Independencia y Autonomía</strong>
                        <p>El usuario aprende a autorregularse durante la noche gracias a los estímulos automáticos.</p>
                    </div>
                </div>
                <div class="beneficio-inline-item">
                    <span class="beneficio-inline-icono">☀️</span>
                    <div>
                        <strong>Adiós a la Hipersensibilidad Diurna</strong>
                        <p>Un descanso completo y reparador durante la noche se traduce en un mejor estado de ánimo, mayor concentración y menos crisis durante el día.</p>
                    </div>
                </div>
                <div class="beneficio-inline-item beneficio-inline-destacado">
                    <span class="beneficio-inline-icono">💜</span>
                    <div>
                        <strong>Tranquilidad para los Cuidadores</strong>
                        <p>Por fin podrás dormir con la seguridad de que el sistema CALMI está cuidando el descanso de quien más amas.</p>
                    </div>
                </div>
            </div>

            <div class="info-divider"></div>

            <!-- ── Botón agregar al carrito ── -->
            <button id="btn-agregar" class="btn btn-primario-glow"
                style="width:100%; font-size:1.1rem; padding:16px;"
                onclick="agregarAlCarrito()">
                Agregar al Carrito 🛒
            </button>

        </div>
    `;

    // Activar selección de variantes
    const labels    = document.querySelectorAll('#variantes-detalle .variante-opcion');
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

    // Vaciar el contenedor de secciones externas (ya no se usa)
    if (contenedorSecciones) contenedorSecciones.innerHTML = '';
}

// Agregar al carrito
function agregarAlCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoCalmi')) || [];

    const existente = carrito.find(item => item.id === 'calmi-kit');
    if (existente) {
        existente.varianteId     = varianteSeleccionada.id;
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