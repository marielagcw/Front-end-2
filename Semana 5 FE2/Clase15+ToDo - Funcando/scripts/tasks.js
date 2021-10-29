window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                        Funcionalidades de las Tasks                        */
  /* -------------------------------------------------------------------------- */

  /* ------------------------- Captura elementos HTML ------------------------- */
  const formTasks = document.forms[0];
  const mostrarUsuario = document.querySelector("#mostrarUsuario");
  const btnNuevaTarea = document.querySelector("#btnNuevaTarea");
  const tareasPendientes = document.querySelector("ul.tareas-pendientes");
  const skeleton = document.querySelector("#skeleton");
  const errorMessage = document.querySelector(".errorMessage");

  /* ----------------------- Variables de uso frecuente ----------------------- */
  const apiUrlGetMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
  const apiUrlTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks";
  const jwt = localStorage.getItem("token");
  const listaTareas = localStorage.getItem("tareas");

  /* ---------------------------- Submit Formulario --------------------------- */
  formTasks.addEventListener("submit", (e) => e.preventDefault());

  /* --------------------------------- Resquests --------------------------------- */
  // Obtener y mostrar nombre de usuario
  obtenerNombreUsuario(apiUrlGetMe, jwt);

  // Crear nueva tarea
  btnNuevaTarea.addEventListener("click", function (e) {
    e.preventDefault();
    const nuevaTareaObj = {
      description: document.querySelector("#nuevaTarea").value,
      completed: false,
    };
    if (nuevaTareaObj.description == "") {
      errorMessage.innerText = "Ingrese tarea";
      errorMessage.classList.remove("ocultar");
      setTimeout(() => {
        errorMessage.classList.add("ocultar");
      }, 3000);
    } else {
      crearNuevaTarea(apiUrlTasks, jwt, nuevaTareaObj);
    }
    formTasks.reset();
  });

  // Obtener y ordenar listas de tareas
  obtenerListaTareas(apiUrlTasks, jwt);
  arrayTareasPendientes = [];
  arrayTareasTerminadas = [];

  // Cerrar la aplicación

  /* -------------------------- Conexión al servidor -------------------------- */

  function obtenerNombreUsuario(url, token) {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then((datosUsuario) => {
        localStorage.setItem("usuario", datosUsuario.firstName);
        mostrarUsuario.innerText = datosUsuario.firstName;
      });
  }

  function crearNuevaTarea(url, token, objNorm) {
    const settings = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objNorm),
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then(() => {
        obtenerListaTareas(url, token);
      });
  }

  //obtenerListatareas
  function obtenerListaTareas(url, token) {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(url, settings)
      .then((response) => response.json())
      .catch((err) => console.log(err))
      .then((lista) => {
        // vaciamos el array para que cuando agrego una tarea no me las duplique en la pantalla
        arrayTareasPendientes.splice(0, arrayTareasPendientes.length);
        localStorage.setItem("listaTareas", lista);
        lista.forEach((element) => {
          if (element.completed == true) {
            arrayTareasTerminadas.push(element);
          } else arrayTareasPendientes.push(element);
        });
        arrayTareasPendientes.reverse();
        tareasPendientes.innerHTML = "";
        arrayTareasPendientes.forEach((element) => {
          let date = new Date(element.createdAt);
          tareasPendientes.innerHTML += `
    <div>
    <li class="tarea">
    <div class="not-done"></div>
    <div class="descripcion">
    <p class="nombre">${element.description}</p>
    <p class="timestamp">Creada: ${date.toLocaleDateString()}</p>
    </div>
    </li>
    <div>
    `;
        });
      });
  }
  if (arrayTareasPendientes.lentgh !== 0) {
    skeleton.remove();
  }
}); //cierre del window event
