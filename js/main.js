//** Módulo de alternar entre formularios */
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const btnRegister = document.getElementById('btn-register');
const btnLogin = document.getElementById('btn-login');

// Captura de elementos para controlar la vista de sesión
const authCard = document.querySelector('.auth-card');
const welcomeScreen = document.getElementById('welcome-screen');
const userEmailDisplay = document.getElementById('user-email-display');
const btnLogout = document.getElementById('btn-logout');

function alternarFormularios() {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

btnRegister.addEventListener('click', alternarFormularios);
btnLogin.addEventListener('click', alternarFormularios);

//** Módulo de Validación y Registro de Usuario */
const regEmail = document.getElementById('reg-email');
const regPassword = document.getElementById('reg-password');
const confPassword = document.getElementById('conf-password');

registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    // 1. Validar que las contraseñas coincidan
    if (regPassword.value !== confPassword.value) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        // 2. Enviar petición al Backend
        const respuesta = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: regEmail.value,
                password: regPassword.value
            })
        });

        const datos = await respuesta.json();

        // 3. Evaluar respuesta
        if (respuesta.ok) {
            alert(datos.mensaje); // "¡Usuario registrado con éxito!"
            registerForm.reset();
            alternarFormularios();
        } else {
            alert(datos.mensaje); // Muestra mensaje de error del servidor
        }

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo conectar con el servidor. ¿Está encendido?');
    }
});

//** Módulo de Inicio de Sesión */
const logEmail = document.getElementById('log-email');
const logPassword = document.getElementById('log-password');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        // Enviar credenciales al Backend
        const respuesta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: logEmail.value,
                password: logPassword.value
            })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert(datos.mensaje); 
            
            // Inyectar el email del usuario en el HTML
            userEmailDisplay.textContent = datos.usuario ? datos.usuario.email : logEmail.value;
            
            // Ocultar tarjeta de formularios y mostrar la pantalla de bienvenida
            authCard.classList.add('hidden');
            welcomeScreen.classList.remove('hidden');

            loginForm.reset();
        } else {
            alert(datos.mensaje); // Muestra mensaje de error
        }

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo conectar con el servidor. ¿Está encendido?');
    }
});

//** Modulo de Cerrar Sesion */
btnLogout.addEventListener('click', function() {
    welcomeScreen.classList.add('hidden');
    authCard.classList.remove('hidden');
});