async function cargarProductos() {
    try {
        // Hacemos la petición a nuestra nueva API en Node.js
        const respuesta = await fetch('http://localhost:3000/api/productos');
        const productosDb = await respuesta.json();

        const contenedorGrid = document.getElementById('contenedor-grid');
        contenedorGrid.innerHTML = ''; // Limpiamos el contenedor

        productosDb.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-producto');

            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <div class="precio">$${producto.precio.toLocaleString()} MXN</div>
                <p>${producto.descripcion}</p>
                <a href="producto.html?id=${producto.id_interno}" class="btn btn-primary">Ver Detalles</a>
            `;

            contenedorGrid.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}

// Ejecutamos la función al cargar la página
cargarProductos();