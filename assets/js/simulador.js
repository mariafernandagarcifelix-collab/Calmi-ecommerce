document.addEventListener('DOMContentLoaded', () => {
    const btnSimular = document.getElementById('btn-simular');
    
    // Elementos de la UI del teléfono
    const pantalla = document.getElementById('pantalla-app');
    const circulo = document.getElementById('circulo-estado');
    const emoji = document.getElementById('emoji-estado');
    const texto = document.getElementById('texto-estado');
    const bpm = document.getElementById('valor-bpm');
    const gsr = document.getElementById('valor-gsr');
    const reproductor = document.getElementById('reproductor-audio');

    let estadoActual = 0; // 0: Calmado, 1: Crisis, 2: Regulando

    if(btnSimular) {
        btnSimular.addEventListener('click', () => {
            if (estadoActual === 0) {
                // PASAR A ESTADO DE CRISIS
                estadoActual = 1;
                btnSimular.innerText = "Regular Automáticamente 🎵";
                btnSimular.style.background = "var(--color-primario)";
                
                // Actualizar UI Teléfono
                circulo.classList.add('estado-alerta');
                emoji.innerText = "⚠️";
                texto.innerText = "Estrés Detectado";
                texto.style.color = "#ff6b6b";
                
                // Simular subida de variables
                animarNumero(bpm, 82, 125, 1000);
                gsr.innerText = "Alto";
                gsr.style.color = "#ff6b6b";

            } else if (estadoActual === 1) {
                // PASAR A ESTADO DE REGULACIÓN
                estadoActual = 2;
                btnSimular.innerText = "Volver a la normalidad 🔄";
                btnSimular.style.background = "var(--verde-menta)";
                btnSimular.style.color = "var(--color-primario)";
                
                // Actualizar UI Teléfono
                circulo.classList.remove('estado-alerta');
                circulo.classList.add('estado-regulando');
                emoji.innerText = "🎧";
                texto.innerText = "Regulando...";
                texto.style.color = "var(--color-primario)";
                
                // Mostrar reproductor y bajar variables
                reproductor.style.display = "block";
                animarNumero(bpm, 125, 90, 2000);
                gsr.innerText = "Bajando...";
                gsr.style.color = "var(--color-primario)";

            } else {
                // VOLVER A CALMA
                estadoActual = 0;
                btnSimular.innerText = "Simular Crisis ⚠️";
                btnSimular.style.background = "#ff6b6b";
                btnSimular.style.color = "white";
                
                // Reset UI Teléfono
                circulo.classList.remove('estado-regulando');
                emoji.innerText = "😴";
                texto.innerText = "Calmado";
                texto.style.color = "var(--text-dark)";
                reproductor.style.display = "none";
                
                animarNumero(bpm, 90, 82, 1000);
                gsr.innerText = "Normal";
                gsr.style.color = "var(--color-primario)";
            }
        });
    }

    // Pequeña función para que los números cambien fluidamente
    function animarNumero(elemento, inicio, fin, duracion) {
        let inicioTiempo = null;
        const paso = (tiempo) => {
            if (!inicioTiempo) inicioTiempo = tiempo;
            const progreso = Math.min((tiempo - inicioTiempo) / duracion, 1);
            elemento.innerText = Math.floor(progreso * (fin - inicio) + inicio);
            if (progreso < 1) {
                window.requestAnimationFrame(paso);
            }
        };
        window.requestAnimationFrame(paso);
    }
});