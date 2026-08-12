const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite la comunicación con el frontend
app.use(express.json()); // Permite recibir datos en formato JSON desde el cliente

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de TechStore corriendo con éxito');
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});