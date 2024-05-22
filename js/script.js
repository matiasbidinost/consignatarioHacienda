// Implementar la lógica para el captcha
const captchaContainer = document.getElementById('captcha-container');
const captchaInput = document.getElementById('captcha-response');
//mensaje para mostrar los campos que faltan o si se envio el formulario
const message = document.getElementById('message');
//contenedor de la lista de tipos de raza
const selectContainer = document.querySelector('.custom-select-container');
//saber cual fue seleccionado
const selected = selectContainer.querySelector('.selected');
//opciones
const options = selectContainer.querySelector('.select-options');

const email = document.getElementById('email');
const telefono = document.getElementById('telefono');
const labelEmail = document.getElementById('e_mail');
const labelTelefono = document.getElementById('num');
const capt = document.getElementById("capt_cha");
let valid = true;


document.addEventListener('DOMContentLoaded', function () {
    function crearCaptchaRandom() {
        //creador del captcha
        let randomString = "";
        let strDeCaracteres = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
        //string con todos los caracteres posibles para el captcha
        for (let index = 0; index < 8; index++) {
            randomString = randomString + strDeCaracteres.charAt(Math.floor(Math.random() * strDeCaracteres.length));
        }
        return randomString;
    }
    function mostrarCaptcha() {
        captchaContainer.innerHTML = crearCaptchaRandom();
    }
    mostrarCaptcha();

    function validarCaptcha() {
        if (captchaContainer.innerHTML === captchaInput.value) { 
            message.className = "valid"; //seteo en valid o invalid para mostrar el error correspondiente
            return true;
        } else {
            message.className = "invalid";
            message.innerHTML = "captcha inválido";
            return false;
        }
    }

    function validarFormulario() {
        valid=true;
        if (!email.value.includes("@hotmail.com") && !email.value.includes("@gmail.com") && !email.value.includes("@a")) {
            email.classList.add('error');
            labelEmail.classList.add('error');
            
            valid = false;
        } else {
            email.classList.remove('error');
            labelEmail.classList.remove('error');
        }
    
        if (telefono.value.length < 5) {
            telefono.classList.add('error');
            labelTelefono.classList.add('error');
            valid = false;
        } else {
            telefono.classList.remove('error');
            labelTelefono.classList.remove('error');
        }
    
        if (!validarCaptcha()) {
            capt.classList.add('error');
            captchaInput.add('error');
            valid = false;
        }
    
        return valid;
    }
    
    document.getElementById("register").addEventListener("click", function (e) {
        e.preventDefault();
        if (validarFormulario()) {
            message.className = "valid";
            message.innerHTML = "Formulario enviado correctamente!";
        } else {
            message.className = "invalid";
            message.innerHTML = "Por favor, completa los campos requeridos.";
        }
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
            capt.classList.remove('error');
            captchaInput.classList.remove('error');
            labelEmail.classList.remove('error');
            labelTelefono.classList.remove('error');

        }, 3000);
    });
    //alterna la visibilidad del elemento options entre "block" y "none"
    selected.addEventListener('click', function () {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    });
    

    options.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            selected.textContent = e.target.textContent;
            selected.dataset.value = e.target.dataset.value;
            options.style.display = 'none';
        }
    });

    document.addEventListener('click', function (e) {
        if (!selectContainer.contains(e.target)) {
            options.style.display = 'none';
        }
    });
});
