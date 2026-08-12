# 🛒 TechStore - Sistema de Autenticación (Login & Registro)

Este proyecto es una aplicación web full-stack que implementa un flujo completo y seguro de autenticación de usuarios (Registro e Inicio de Sesión) conectando un frontend interactivo con un servidor Node.js y una base de datos relacional.

---

## 🚀 ¿Qué hace la aplicación?

* **Registro de usuarios:** Permite crear una cuenta validando que las contraseñas coincidan y que el correo no esté registrado previamente.
* **Seguridad de contraseñas:** Encripta las contraseñas en el servidor antes de guardarlas usando un algoritmo de hash seguro (`bcryptjs`).
* **Inicio de Sesión (Login):** Autentica las credenciales ingresadas comparándolas con la base de datos.
* **Pantalla de Bienvenida Dinámica:** Al iniciar sesión con éxito, se ocultan los formularios y se muestra una interfaz personalizada con el correo del usuario activo.
* **Cierre de Sesión:** Permite salir de la sesión actual y regresar al formulario de login.

---

## 🛠️ Tecnologías utilizadas y ¿Cómo funciona?

El proyecto sigue una arquitectura **Cliente - Servidor (Full-Stack)**:

### **Frontend**
* **HTML5:** Estructura de formularios e interfaz de usuario.
* **CSS3:** Estilos visuales y clases para alternar/ocultar pantallas (`.hidden`).
* **JavaScript (Vanilla JS - ES6+):** Captura eventos del DOM y realiza peticiones asíncronas HTTP mediante `fetch()` hacia la API REST del backend.

### **Backend**
* **Node.js:** Entorno de ejecución en el servidor.
* **Express.js:** Framework web para la creación de la API REST y manejo de rutas (`/api/register`, `/api/login`).
* **CORS:** Middleware para permitir la comunicación entre el frontend (Live Server) y el backend (`localhost:3000`).

### **Base de Datos y Seguridad**
* **SQLite (`sqlite3`):** Motor de base de datos relacional liviano que almacena los usuarios en un archivo local (`database.sqlite`).
* **Bcrypt.js:** Librería encargada de generar el *hash* de encriptación de las contraseñas en el backend.

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:
* [Node.js](https://nodejs.org/) (versión 16 o superior).
* La extensión **Live Server** instalada en Visual Studio Code.

---

## 📦 Instalación y Configuración

Sigue estos pasos para poner a funcionar el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/BL4Z3K4D/Login-Register.git]
cd Login-Register

3 Instalar las dependencias del servidor
Abre la terminal en la raíz del proyecto y ejecuta:

npm install

4 Encender el servidor Backend
Inicia el servidor Node.js ejecutando:

node server.js

(Deberías ver en la consola los mensajes de conexión exitosa a SQLite y servidor escuchando en el puerto 3000).