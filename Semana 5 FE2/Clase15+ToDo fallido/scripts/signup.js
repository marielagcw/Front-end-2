window.addEventListener("load", function(){


/* -------------------------------------------------------------------------- */
/*                         Capturas de elementos y declaración de variables                         */
/* -------------------------------------------------------------------------- */

const formRegistro = document.forms[0];
const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputRepeatPassword = document.querySelector("#passwordRepeat");

/* -------------------------------------------------------------------------- */
/*                                validaciones                                */
/* -------------------------------------------------------------------------- */

formRegistro.addEventListener("submit", function (event) {
  /* evitamos enviar el formulario */
  event.preventDefault();
  if (validarCampos()) {
    const datosUsuario = JSON.stringify(normalizarDatos());
    console.log(datosUsuario);
    fetchApiRegister(datosUsuario);
  } else {
    presentarError();
  }
});
function validarCampos() {
  /* condiciones para validar */
  inputPassword.value !== inputRepeatPassword.value ? presentarError() : 0;
  if (
    inputName.value.length <= 0 ||
    inputLastname.value.length <= 0 ||
    inputEmail.value.length <= 0 ||
    inputRepeatPassword.value.length <= 0
  )
    return false;
  else return true;
}
/* para mostrar el mensaje de error: */
function presentarError() {
  const error = document.querySelector("#error");
  error.classList.remove("oculto");

  setTimeout(function () {
    error.classList.add("oculto");
  }, 4000);
  formRegistro.reset();
}

/* normalizar los datos y preparar el JSON */
function normalizarDatos() {
  const usuario = {
    firstName: inputName.value,
    lastName: inputLastname.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };
  return usuario;
}
})


function fetchApiRegister(payload) {
  let bod = payload;
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: bod,
  };
  fetch("https://ctd-todo-api.herokuapp.com/v1/users/", settings)
    .then((respuesta) => respuesta.json())
    .then(
      (data) => {
        if (data) {
        localStorage.setItem("token", data);
        console.log(data);
        location.href = "/mis-tareas.html";
      }
      });
    
}
