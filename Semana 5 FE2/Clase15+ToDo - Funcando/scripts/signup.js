window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                            Registro de Usuarios                            */
  /* -------------------------------------------------------------------------- */

  /* ---------------------- Captura de elementos de HTML ---------------------- */

  const name = document.querySelector("#name");
  const lastname = document.querySelector("#lastname");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  const form = document.forms[0];
  const apiUrlRegister = "https://ctd-todo-api.herokuapp.com/v1/users";
  const errorMessage = this.document.querySelector(".errorMessage");

  /* --------------------------------- submit --------------------------------- */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // preparamos el objeto que recibe los datos desde el form
    let dataRegister = {
      firstName: name.value,
      lastName: lastname.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };

    //función que maneja la validación de los datos
    if (validateSignupData(dataRegister) === false) {
      //agrego un texto para indicarle al usuario que hay un error de ingreso
      errorMessage.innerText =
        "Los datos ingresados son erróneos o están incompletos, por favor ingrese los datos nuevamente";
        errorMessage.classList.remove("ocultar");
      setTimeout(() => {
        errorMessage.classList.add("ocultar");
      }, 3000);
      form.reset();
      return;
    }

    //función que normaliza datos
    dataRegister = normalizeSignupData(dataRegister);

    //función de envío al servidor
    signupPost(dataRegister);
  });

  /* ----------------------- Validaciones y normalización ---------------------- */

  function validateSignupData(data) {
    for (property in data) {
      if (data[property] === "") return false;
    }
    if (data["password"] !== data["password2"]) return false;
  }

  function normalizeSignupData(data) {
    return {
      firstName: data.firstName.toLowerCase().trim(),
      lastName: data.lastName.toLowerCase().trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };
  }

  /* ------------------------ Conexión con el servidor ------------------------ */

  function signupPost(data) {
    fetch(apiUrlRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.status == 200 || response.status == 201) {
        console.log("Creado");
        location.href = "./index.html";
      }
    });
  }
});
