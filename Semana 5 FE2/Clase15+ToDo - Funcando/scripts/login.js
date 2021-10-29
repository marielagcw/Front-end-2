window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                 Login de usuarios previamente registradosX                 */
  /* -------------------------------------------------------------------------- */

  /* ---------------------- capturamos los elementos HTML --------------------- */
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const form = document.forms[0];
  const errorMessage = document.querySelector(".errorMessage");

  /* ----------------------- Variables de uso frecuente ----------------------- */
  const apiUrlLogin = "https://ctd-todo-api.herokuapp.com/v1/users/login";

  /* --------------------------------- submit --------------------------------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //creamos el objeto que guarda todos mis datos obtenidos del form
    let dataLogin = {
      email: email.value,
      password: password.value,
    };

    // aplicamos validación
    if (validateLogingData(dataLogin) === false) {
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

    //aplicamos normalización
    dataLogin = normalizeLoginData(dataLogin);

    //enviamos la información al servidor
    loginPost(dataLogin);
  });

  /* ----------------------- Validaciones y normalización ---------------------- */
  function validateLogingData(data) {
    for (property in data) {
      if (data[property] === "") return false;
    }
  }

  function normalizeLoginData(data) {
    return {
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    };
  }

  /* ------------------------ Conexión con el servidor ------------------------ */

  function loginPost(data) {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrlLogin, settings)
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          location.href = "./mis-tareas.html";
        } else {
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
        console.log(data);
      });
  }
});
