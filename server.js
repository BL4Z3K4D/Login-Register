const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs'); // 👈 Importamos bcryptjs

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Conexión a SQLite
const db = new sqlite3.Database('./database.sqlite');

// 2. Crear la tabla de usuarios si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// 3. RUTA DE REGISTRO DE USUARIOS
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Validación básica en el servidor
    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario en la base de datos
        const sql = `INSERT INTO usuarios (email, password) VALUES (?, ?)`;
        
        // Usamos una función tradicional (function) para poder acceder a 'this.lastID'
        db.run(sql, [email, hashedPassword], function (err) {
            if (err) {
                // Si el correo ya existe (violación de restricción UNIQUE)
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado.' });
                }
                return res.status(500).json({ mensaje: 'Error al registrar el usuario en la base de datos.' });
            }

            res.status(201).json({ 
                mensaje: '¡Usuario registrado con éxito!', 
                userId: this.lastID 
            });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor de TechStore corriendo con éxito');
});

// 4. RUTA DE INICIO DE SESIÓN (LOGIN)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    // Buscar el usuario por email
    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    
    db.get(sql, [email], async (err, usuario) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }

        // Si no existe el usuario
        if (!usuario) {
            return res.status(400).json({ mensaje: 'El correo no está registrado.' });
        }

        // Comparar la contraseña ingresada con el hash guardado
        const esValida = await bcrypt.compare(password, usuario.password);

        if (!esValida) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta.' });
        }

        // Si todo es correcto
        res.status(200).json({
            mensaje: '¡Inicio de sesión exitoso!',
            usuario: { email: usuario.email }
        });
    });
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});