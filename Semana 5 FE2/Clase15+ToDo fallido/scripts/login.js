window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                              logica del login                              */
  /* -------------------------------------------------------------------------- */

  const formulario = this.document.forms[0];
  const inputEmail = this.document.querySelector("#inputEmail");
  const inputPassword = this.document.querySelector("#inputPassword");

  const apiUrl = "https://ctd-todo-api.herokuapp.com/v1/users/login";

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const resultadoValidacion =
      validarNoVacio(inputEmail.value) && validarNoVacio(inputPassword.value);

    if (resultadoValidacion) {
      const datosUsuario = normalizacionLogin(
        inputEmail.value,
        inputPassword.value
      );
      console.log(datosUsuario);
      fetchApiLogin(apiUrl, datosUsuario);
    } else console.log("No pasó validación");

    // formulario.reset();
  });
});

/* -------------------------------------------------------------------------- */
/*                               Funcionalidades                              */
/* -------------------------------------------------------------------------- */

function validarNoVacio(dato) {
  let resultado = true;
  if (dato === "") {
    resultado = false;
  }
  return resultado;
}

function normalizacionLogin(email, password) {
  const usuario = {
    email: email.toLowerCase().trim(),
    password: password.trim(),
  };
  return usuario;
}

// function fetchApiLogin(url, payload) {
//   const settings = {
//     method: "POST",
//     headers: {
//       "Content-Type": "aplication/json",
//     },
//     body: JSON.stringify(payload),
//   };
//   fetch(url, settings)
//     .then((respuesta) => respuesta.json())
//     .then((data) => {
//       console.log(data);
//       if (data.jwt) {
//         localStorage.setItem("token", data.jwt);
//         location.href = "/mis-tareas.html";
//       } else {
//         alert("Los datos ingresados son incorrectos o estan incompletos.");
//       }
//     });
// }
