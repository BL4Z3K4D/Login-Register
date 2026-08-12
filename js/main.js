const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const btnRegister = document.getElementById('btn-register');
const btnLogin = document.getElementById('btn-login');

function alternarFormularios() {
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

btnRegister.addEventListener('click', alternarFormularios);
btnLogin.addEventListener('click', alternarFormularios);
