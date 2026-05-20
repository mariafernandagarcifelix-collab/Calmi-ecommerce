// assets/js/data.js
// Un solo producto con variantes de audio (el precio no cambia)
const productosCalmi = [
    {
        id: "calmi-kit",
        nombre: "Kit Calmi",
        precio: 2900,
        descripcion: "El ecosistema completo de monitoreo y regulación sensorial para tu hijo. Incluye pulsera inteligente, app móvil y el dispositivo de audio que mejor se adapte a su rutina.",
        imagen: "assets/img/kit-intermedio.png",
        beneficios: "Monitoreo biométrico en tiempo real, regulación automática de crisis sensoriales y audio terapéutico personalizado.",
        incluye: [
            "Pulsera inteligente con sensores PPG/GSR",
            "App móvil Calmi",
            "Cable de carga magnético",
            "Tu dispositivo de audio elegido"
        ],
        variantes: [
            {
                id: "in-ear",
                nombre: "Audífonos In-Ear",
                descripcion: "Discretos y portátiles. Perfectos para la escuela, terapias y salidas cotidianas.",
                icono: "🎧"
            },
            {
                id: "over-ear",
                nombre: "Audífonos Over-Ear",
                descripcion: "Aislamiento acústico completo. Ideales para entornos muy estimulantes.",
                icono: "🎵"
            },
            {
                id: "bocina",
                nombre: "Bocina Inteligente",
                descripcion: "Para el hogar. Crea un ambiente de calma en la habitación de tu hijo.",
                icono: "🔊"
            }
        ]
    }
];