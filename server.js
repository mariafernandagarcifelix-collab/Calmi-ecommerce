require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🔥 Conectado exitosamente a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// 1. Definimos el Esquema (Estructura) del Producto
const productSchema = new mongoose.Schema({
    id_interno: String,
    nombre: String,
    precio: Number,
    descripcion: String,
    imagen: String,
    beneficios: String,
    incluye: [String],
    ideal_para: String, // NUEVO CAMPO
    especificaciones: [{  // NUEVO CAMPO (Arreglo de objetos)
        caracteristica: String,
        detalle: String
    }]
});

// Creamos el Modelo
const Product = mongoose.model('Product', productSchema);


// 2. Ruta para obtener los productos (Esto reemplaza a tu data.js)
app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
});

// calmi-backend/server.js (Agrega esto debajo del modelo de productos)

// Esquema de Orden de Compra
const orderSchema = new mongoose.Schema({
    productos: [{
        id_producto: String,
        cantidad: Number,
        precio_unitario: Number
    }],
    total: Number,
    fecha: { type: Date, default: Date.now },
    estado: { type: String, default: 'Pendiente' }
});

const Order = mongoose.model('Order', orderSchema);

// RUTA POST: Guardar una nueva compra
app.post('/api/ordenes', async (req, res) => {
    try {
        const nuevaOrden = new Order(req.body);
        await nuevaOrden.save();
        res.status(201).json({ 
            mensaje: "¡Orden guardada con éxito!", 
            ordenId: nuevaOrden._id 
        });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al procesar la orden", error });
    }
});

// Iniciar servidor localmente (para desarrollo), pero exportarlo para Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
}

// Esta línea es la que hace la magia en Vercel
module.exports = app;