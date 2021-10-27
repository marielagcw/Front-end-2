// /* -------------------------------------------------------------------------- */
// /*                         Capturas de elementos y declaración de variables                         */
// /* -------------------------------------------------------------------------- */

// const formRegistro = document.forms[0];
// const inputName = document.querySelector("#name");
// const inputLastname = document.querySelector("#lastname");
// const inputEmail = document.querySelector("#email");
// const inputPassword = document.querySelector("#password");
// const inputRepeatPassword = document.querySelector("#passwordRepeat");

// /* -------------------------------------------------------------------------- */
// /*                                validaciones                                */
// /* -------------------------------------------------------------------------- */

// formRegistro.addEventListener("submit", function (event) {
//   /* evitamos enviar el formulario */
//   event.preventDefault();
//   if (validarCampos()) {
//     const datosUsuario = normalizarDatos();
//     console.log(datosUsuario);
//     fetchApiRegister(datosUsuario);
//   } else {
//     presentarError();
//   }
// });

// function validarCampos() {
//   /* condiciones para validar */
//   inputPassword.value !== inputRepeatPassword.value ? presentarError() : 0;
//   if (
//     inputName.value.length <= 0 ||
//     inputLastname.value.length <= 0 ||
//     inputEmail.value.length <= 0 ||
//     inputRepeatPassword.value.length <= 0
//   )
//     return false;
//   else return true;
// }
// /* para mostrar el mensaje de error: */
// function presentarError() {
//   const error = document.querySelector("#error");
//   error.classList.remove("oculto");

//   setTimeout(function () {
//     error.classList.add("oculto");
//   }, 4000);
//   formRegistro.reset();
// }

// /* normalizar los datos y preparar el JSON */
// function normalizarDatos() {
//   const usuario = {
//     firstName: inputName.value,
//     lastName: inputLastname.value,
//     email: inputEmail.value,
//     password: inputPassword.value,
//   };
//   return usuario;
// }

// function fetchApiRegister(payload) {
  
//   var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify(payload);

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://3d64fc2b-ce69-46ee-bc28-f63d0b7495a6.mock.pstmn.io/v1/users", requestOptions)
// .then((respuesta) => respuesta.json())
// .then((data) => {
//   console.log(data);
//   if (data.jwt) {
//     localStorage.setItem("token", data.jwt);
//     location.href = "/mis-tareas.html";
//   } else presentarError();
// });
// }
