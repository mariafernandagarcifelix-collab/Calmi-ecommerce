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
        contenedorDetalle.style.display  = 'none';
        contenedorError.style.display    = 'block';
        contenedorSecciones.style.display = 'none';
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

    // ── Layout principal: imagen sticky + info ──────────────────────────────
    contenedorDetalle.innerHTML = `
        <div class="producto-imagen">
            <img src="${productoActual.imagen}" alt="${productoActual.nombre}" id="img-producto">
        </div>
        <div class="producto-info">
            <p class="producto-tagline">
                Tecnología diseñada para prevenir despertares abruptos, calmar la ansiedad nocturna
                y devolverle las noches de sueño a toda la familia.
            </p>

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

    // ── Secciones de contenido rico ─────────────────────────────────────────
    contenedorSecciones.innerHTML = `

        <!-- SECCIÓN 1: Qué incluye el paquete -->
        <section class="detalle-seccion">
            <div class="detalle-seccion-header">
                <span class="badge-innovatec">Hardware + Software</span>
                <h2>¿Qué incluye tu paquete <span class="resaltado">CALMI</span>?</h2>
                <p>Un ecosistema completo pensado para cada momento del día y de la noche.</p>
            </div>
            <div class="incluye-grid">
                <div class="incluye-card">
                    <div class="incluye-icono-grande">⌚</div>
                    <h3>Pulsera Inteligente de Monitoreo Nocturno</h3>
                    <p>Un dispositivo ultra ligero que se usa durante la noche. Sus sensores biométricos vigilan en tiempo real el ritmo cardíaco, la temperatura y los movimientos bruscos para detectar cualquier señal de estrés o pesadillas antes de que ocurra un despertar total.</p>
                    <ul class="incluye-specs">
                        <li>Sensor PPG — ritmo cardíaco</li>
                        <li>Sensor de temperatura corporal</li>
                        <li>Acelerómetro de movimiento</li>
                        <li>Batería de larga duración</li>
                    </ul>
                </div>
                <div class="incluye-card">
                    <div class="incluye-icono-grande">🎧</div>
                    <h3>Audífonos Ergonómicos para Dormir</h3>
                    <p>Diseñados específicamente para personas con hipersensibilidad táctil. Son suaves, hipoalergénicos y no lastiman al girar en la cama. A través de ellos se transmite la terapia de sonido personalizada en tiempo real.</p>
                    <ul class="incluye-specs">
                        <li>Material hipoalergénico</li>
                        <li>Diseño ultra plano (no presiona)</li>
                        <li>Conexión inalámbrica estable</li>
                        <li>Compatible con over-ear, in-ear y bocina</li>
                    </ul>
                </div>
                <div class="incluye-card">
                    <div class="incluye-icono-grande">📱</div>
                    <h3>Acceso Total a la App Móvil CALMI</h3>
                    <p>Tu centro de control. Desde aquí puedes ver la calidad del sueño de tu hijo, configurar la música relajante, activar el "Alivio Rápido" y tener un historial completo de sus noches para compartir con su terapeuta.</p>
                    <ul class="incluye-specs">
                        <li>Historial de calidad del sueño</li>
                        <li>Configuración de terapia sonora</li>
                        <li>Botón "Alivio Rápido"</li>
                        <li>iOS y Android — sin suscripción</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- SECCIÓN 2: Cómo protege el sueño -->
        <section class="detalle-seccion detalle-seccion-oscura">
            <div class="detalle-seccion-header">
                <span class="badge-innovatec" style="background:rgba(167,139,250,0.2); border-color:rgba(167,139,250,0.4);">⚡ Edge AI</span>
                <h2>¿Cómo protege el sueño <span class="resaltado">de tu hijo</span>?</h2>
                <p>Tres pasos automáticos. Sin que tengas que levantarte.</p>
            </div>
            <div class="pasos-grid">
                <div class="paso-card">
                    <div class="paso-numero">01</div>
                    <div class="paso-icono">🌙</div>
                    <h3>Vigila en Silencio</h3>
                    <p>Mientras el usuario duerme, la pulsera monitorea sus signos vitales de forma continua y completamente silenciosa, sin ser invasiva ni interrumpir el descanso.</p>
                </div>
                <div class="paso-conector">→</div>
                <div class="paso-card">
                    <div class="paso-numero">02</div>
                    <div class="paso-icono">⚡</div>
                    <h3>Detecta y Anticipa</h3>
                    <p>Si el sistema nota un aumento de ansiedad, agitación o estrés, su algoritmo de Edge AI reacciona instantáneamente, sin que tú tengas que levantarte.</p>
                </div>
                <div class="paso-conector">→</div>
                <div class="paso-card">
                    <div class="paso-numero">03</div>
                    <div class="paso-icono">🎵</div>
                    <h3>Calma Automáticamente</h3>
                    <p>Se activa de forma silenciosa una terapia sonora (ruido rosa, blanco o frecuencias personalizadas) directo en los audífonos, envolviendo al usuario en un ambiente seguro que lo ayuda a volver al sueño profundo.</p>
                </div>
            </div>
        </section>

        <!-- SECCIÓN 3: Beneficios -->
        <section class="detalle-seccion">
            <div class="detalle-seccion-header">
                <span class="badge-innovatec">¿Por qué elegir Calmi?</span>
                <h2>Beneficios que <span class="resaltado">toda la familia</span> siente</h2>
                <p>Un descanso reparador es la base de todo lo demás.</p>
            </div>
            <div class="beneficios-grid">
                <div class="beneficio-card">
                    <div class="beneficio-icono">🧘</div>
                    <h3>Independencia y Autonomía</h3>
                    <p>El usuario aprende a autorregularse durante la noche gracias a los estímulos automáticos, desarrollando resiliencia propia con el tiempo.</p>
                </div>
                <div class="beneficio-card">
                    <div class="beneficio-icono">☀️</div>
                    <h3>Adiós a la Hipersensibilidad Diurna</h3>
                    <p>Un descanso completo y reparador durante la noche se traduce en un mejor estado de ánimo, mayor concentración y menos crisis durante el día.</p>
                </div>
                <div class="beneficio-card beneficio-destacado">
                    <div class="beneficio-icono">💜</div>
                    <h3>Tranquilidad para los Cuidadores</h3>
                    <p>Por fin podrás dormir con la seguridad de que el sistema CALMI está cuidando el descanso de quien más amas. Sin alarmas. Sin interrupciones.</p>
                </div>
            </div>

            <!-- CTA final -->
            <div class="cta-final">
                <p>¿Listo para devolverle el descanso a tu familia?</p>
                <button class="btn btn-primario-glow" onclick="window.scrollTo({top:0,behavior:'smooth'})" style="font-size:1.1rem; padding:14px 40px;">
                    Elegir mi dispositivo de audio ↑
                </button>
            </div>
        </section>
    `;
}

// Agregar al carrito desde la página de detalle
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