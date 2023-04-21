// control de formulario sub página compras

const formulario = document.getElementById("formulario");
// esta constante va ser un arreglo con todos los input dentro del id formulario
const inputs = document.querySelectorAll(".formulario input");
inputs.forEach((input) => {
    console.log(input.value);
});

const campos = {
    nombre: false,
    apellidos: false,
    direccion: false,
    correo: false,
    telefono: false,
    asunto: false,
    notas: false
}

const expresiones = {
    nombre_apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{8,14}$/, // 8 a 14 numeros.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const validarFormulario = (e) => {
    console.log("entro");
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre_apellidos, e.target, 'nombre');

            break;

        case "apellidos":
            validarCampo(expresiones.nombre_apellidos, e.target, 'apellidos');
            break;

        case "direccion":
            validarCampoDireccion(e.target, 'direccion');
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;

        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;

        case "asunto":
            validarCampo(expresiones.correo, e.target, 'asunto');
            break;

        case "notas":
            validarCampo(expresiones.correo, e.target, 'notas');
            break;
    }
};


const validarCampo = (expresion, input, campo) => {

    if (campo == "asunto") {
        if (input.value === null || input.value === '') { //si el valor de input esta vacio se agregan los estilos de incorrecto
            document.getElementById(`${campo}`).classList.add('formulario__input-incorrecto');
            document.getElementById(`${campo}`).classList.remove('formulario__input-correcto');
            document.querySelector(`#parrafo_${campo}`).classList.add('formulario__indicaciones-activado');
            campos[campo] = false;
        }
        else {
            document.getElementById(`${campo}`).classList.remove('formulario__input-incorrecto');
            document.getElementById(`${campo}`).classList.add('formulario__input-correcto');
            document.querySelector(`#parrafo_${campo}`).classList.remove('formulario__indicaciones-activado');
            campos[campo] = true;
        }


    }else{
        if (input.value === null || input.value === '') { //si el valor de input esta vacio se eliminan los estilos de correcto o incorrecto
            document.getElementById(`${campo}`).classList.remove('formulario__input-incorrecto');
            document.querySelector(`#parrafo_${campo}`).classList.remove('formulario__indicaciones-activado');
            document.getElementById(`${campo}`).classList.remove('formulario__input-correcto');
            campos[campo] = false;
        }
        else if (expresion.test(input.value)) { //si el valor de input cumple con los requisitos se agregan los siguientes estilos
            document.getElementById(`${campo}`).classList.remove('formulario__input-incorrecto');
            document.getElementById(`${campo}`).classList.add('formulario__input-correcto');
            document.querySelector(`#parrafo_${campo}`).classList.remove('formulario__indicaciones-activado');
            campos[campo] = true;
    
        } else { //si el valor de input no cumple con los requisitos se eliminan los siguientes estilos
            document.getElementById(`${campo}`).classList.add('formulario__input-incorrecto');
            document.getElementById(`${campo}`).classList.remove('formulario__input-correcto');
            document.querySelector(`#parrafo_${campo}`).classList.add('formulario__indicaciones-activado');
            campos[campo] = false;
        }
    }
   

 
};



function validarCampoDireccion(input, campo) {
    if (input.value == null || input.value == '') { //si el valor de input esta vacio se eliminan los estilos de correcto o incorrecto
        document.getElementById(`${campo}`).classList.remove('formulario__input-incorrecto');
        document.querySelector(`#parrafo_${campo}`).classList.remove('formulario__indicaciones-activado');
        document.getElementById(`${campo}`).classList.remove('formulario__input-correcto');
    }
    else if (input.value.length >= 6) {
        // hacer algo si tiene al menos 8 letras
        document.getElementById(`direccion`).classList.remove('formulario__input-incorrecto');
        document.getElementById(`direccion`).classList.add('formulario__input-correcto');
        document.querySelector(`#parrafo_direccion`).classList.remove('formulario__indicaciones-activado');
        campos[campo] = true;
    } else {
        document.getElementById(`direccion`).classList.add('formulario__input-incorrecto');
        document.getElementById(`direccion`).classList.remove('formulario__input-correcto');
        document.querySelector(`#parrafo_direccion`).classList.add('formulario__indicaciones-activado');
        campos[campo] = false;
    }
}


function validarNull(input, campo) {
    if (input.value === null || input.value === '') { //si el valor de input esta vacio se eliminan los estilos de correcto o incorrecto
        document.getElementById(`parrafo_${campo}`).classList.add('formulario__indicaciones-activado');
        document.getElementById(`parrafo_${campo}`).classList.remove('formulario__indicaciones-desactivado');
    }
    else {
        document.getElementById(`${campo}`).classList.add('formulario__input-correcto');
        document.getElementById(`${campo}`).classList.remove('formulario__input-incorrecto');
        campos[campo] = true;
    }
}





inputs.forEach((input) => {
    input.addEventListener('blur', validarFormulario); //salir del elemento(input)
    input.addEventListener('keyup', validarFormulario); //soltar tecla
});






// evento que al darle el boton enviar al formulario no lo dirija a ninguna otra pagina ni que se recargue
formulario.addEventListener('submit', (e) => {
    e.preventDefault();


    if (campos.nombre && campos.apellidos && campos.direccion) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        // accedo a los iconos donde tienen esta clase y se la eliminamos 
        document.querySelectorAll('.formulario__input-correcto').forEach((icono) => {
            icono.classList.remove('formulario__input-correcto');
        })

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

    }
    else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});



// validacion del formulario de contacto


let boton_contacto = document.getElementById("boton");
boton_contacto.addEventListener('click', (e) => {
    e.preventDefault();



    if (campos.nombre && campos.telefono && campos.correo && campos.asunto) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        // accedo a los iconos donde tienen esta clase y se la eliminamos 
        document.querySelectorAll('.formulario__input-correcto').forEach((icono) => {
            icono.classList.remove('formulario__input-correcto');
        })

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');

    }
    else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});




