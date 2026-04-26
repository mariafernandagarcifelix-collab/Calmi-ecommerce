require('dotenv').config();
const mongoose = require('mongoose');

// Definimos el esquema aquí mismo para el script
const productSchema = new mongoose.Schema({
    id_interno: String,
    nombre: String,
    precio: Number,
    descripcion: String,
    imagen: String,
    beneficios: String,
    incluye: [String],
    ideal_para: String,
    especificaciones: [{ caracteristica: String, detalle: String }]
});

const Product = mongoose.model('Product', productSchema);

const productosParaInsertar = [
    {
        id_interno: "basico",
        nombre: "Kit Calmi Básico",
        precio: 1599,
        descripcion: "Tu refugio seguro en casa. Convierte la habitación de tu hijo en un santuario de paz, ideal para regular su sistema nervioso durante el día o mejorar su calidad de sueño en la noche.",
        imagen: "assets/img/kit-basico.png",
        beneficios: "Monitoreo constante sin incomodidad. Al detectar ansiedad, la bocina inteligente inunda la habitación con frecuencias terapéuticas antes de que la crisis escale.",
        incluye: ["Pulsera inteligente con sensores PPG/GSR", "App móvil Calmi", "Bocina inteligente WiFi", "Cable de carga magnético"],
        ideal_para: "Niños que pasan la mayor parte del tiempo en casa y necesitan rutinas de sueño reguladas.",
        especificaciones: [
            { caracteristica: "Autonomía", detalle: "Hasta 24 horas de uso continuo" },
            { caracteristica: "Sensores", detalle: "Ritmo Cardíaco (PPG) y Conductancia (GSR)" },
            { caracteristica: "Conectividad", detalle: "Bluetooth 5.0 y WiFi 2.4GHz" },
            { caracteristica: "Materiales", detalle: "Silicón hipoalergénico grado médico" }
        ]
    },
    {
        id_interno: "intermedio",
        nombre: "Kit Calmi Intermedio",
        precio: 2299,
        descripcion: "Acompañamiento discreto dondequiera que vaya. La libertad que tu hijo necesita para asistir a la escuela o terapia sintiéndose seguro y protegido en todo momento.",
        imagen: "assets/img/kit-intermedio.png",
        beneficios: "Sus audífonos in-ear bloquean el ruido abrumador del entorno y le brindan un ancla de calma auditiva de manera invisible, sin llamar la atención.",
        incluye: ["Pulsera inteligente con sensores PPG/GSR", "App móvil Calmi", "Audífonos in-ear con cancelación de ruido", "Estuche de carga portátil"],
        ideal_para: "La etapa escolar, terapias presenciales y paseos cortos al parque o supermercado.",
        especificaciones: [
            { caracteristica: "Autonomía", detalle: "Hasta 48 horas (Pulsera) / 6 horas (Audífonos)" },
            { caracteristica: "Audio", detalle: "Cancelación de Ruido Activa (ANC) moderada" },
            { caracteristica: "Procesamiento", detalle: "Edge Computing local en la pulsera" },
            { caracteristica: "Resistencia", detalle: "IP68 (Resistente a polvo y salpicaduras)" }
        ]
    },
    {
        id_interno: "premium",
        nombre: "Kit Calmi Premium",
        precio: 3499,
        descripcion: "Aislamiento total, tranquilidad absoluta. Diseñado para crear una burbuja de serenidad instantánea en entornos altamente estimulantes como centros comerciales, fiestas o viajes.",
        imagen: "assets/img/kit-premium.png",
        beneficios: "Máxima inmersión. Sus audífonos over-ear proporcionan una barrera física contra el caos exterior y entregan audio espacial envolvente para una regulación profunda.",
        incluye: ["Pulsera inteligente avanzada", "App móvil Calmi Pro", "Audífonos over-ear premium ANC", "Estuche rígido de viaje", "Membresía vitalicia de audio terapéutico"],
        ideal_para: "Viajes largos, fiestas infantiles, centros comerciales y niños con alta sensibilidad acústica.",
        especificaciones: [
            { caracteristica: "Autonomía", detalle: "Hasta 72 horas con carga rápida tipo C" },
            { caracteristica: "Audio", detalle: "ANC Híbrido Avanzado con aislamiento físico total" },
            { caracteristica: "Sensores Extra", detalle: "Termómetro cutáneo y acelerómetro de 6 ejes" },
            { caracteristica: "Materiales", detalle: "Almohadillas viscoelásticas y tela transpirable" }
        ]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("🌱 Conectado para sembrar datos...");
        // Opcional: Limpia la colección antes de insertar para no duplicar
        await Product.deleteMany({}); 
        await Product.insertMany(productosParaInsertar);
        console.log("✅ ¡Base de datos poblada exitosamente!");
        process.exit();
    })
    .catch(err => {
        console.error("❌ Error:", err);
        process.exit(1);
    });