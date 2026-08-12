
//**Modulo de alternar entre formularios */
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

//**Modulo de Validacion de la contraseña en el registro */

const regPassword = document.getElementById('reg-password');
const confPassword = document.getElementById('conf-password');

registerForm.addEventListener('submit',function(event){
    event.preventDefault();
    if(regPassword.value === confPassword.value){
        alert("¡Registro exitoso!");
    }else{
        alert("Las contraseñas no coinciden");
    }
});

//**Modulo de captura de credenciales del inicio de sesion */

const logEmail = document.getElementById('log-email');
const logPassword = document.getElementById('log-password');

loginForm.addEventListener('submit',function(event){
    event.preventDefault();
    alert(`INTENTANDO INICIAR SESION CON ${logEmail.value}`);
});