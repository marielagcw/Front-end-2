window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                        Funcionalidades de las Tasks                        */
  /* -------------------------------------------------------------------------- */

  /* ------------------------- Captura elementos HTML ------------------------- */
  const formTasks = document.forms[0];
  const mostrarUsuario = document.querySelector("#mostrarUsuario");
  const btnNuevaTarea = document.querySelector("#btnNuevaTarea");
  const tareasPendientes = document.querySelector("ul.tareas-pendientes");
  const tareasTerminadas = document.querySelector("ul.tareas-terminadas");
  const skeleton = document.querySelector("#skeleton");
  const errorMessage = document.querySelector(".errorMessage");
  const btnCerrarSesion = document.querySelector("#closeApp");

  /* ----------------------- Variables de uso frecuente ----------------------- */
  const apiUrlGetMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
  const apiUrlTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks";
  const jwt = localStorage.getItem("token");

  /* ---------------------------- Submit Formulario --------------------------- */
  formTasks.addEventListener("submit", (e) => e.preventDefault());

  /* --------------------------------- Resquests --------------------------------- */

  // ▻▻▻▻▻ Obtener y mostrar nombre de usuario ---- ᓚᘏᗢ
  obtenerNombreUsuario(apiUrlGetMe, jwt);

  // ▻▻▻▻▻ Crear nueva tarea y respuesta al usuario en caso de error ---- ᓚᘏᗢ
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

  // ▻▻▻▻▻ Obtener y ordenar listas de tareas ---- ᓚᘏᗢ
  obtenerListaTareas(apiUrlTasks, jwt);
  arrayTareasPendientes = [];
  arrayTareasTerminadas = [];

  function ordenarListaTareas(lista) {
    // Vaciamos los arrays para que los cambios no me afecten el renderizado de tareas
    arrayTareasPendientes.splice(0, arrayTareasPendientes.length);
    arrayTareasTerminadas.splice(0, arrayTareasTerminadas.length);

    localStorage.setItem("listaTareas", lista);
    lista.forEach((element) => {
      if (element.completed == true) {
        arrayTareasTerminadas.push(element);
      } else arrayTareasPendientes.push(element);
    });
    arrayTareasPendientes.reverse();
    arrayTareasTerminadas.reverse();

    // ------------------  >>>  Tareas pendientes -------------------->>
    tareasPendientes.innerHTML = "";
    arrayTareasPendientes.forEach((tarea) => {
      let date = new Date(tarea.createdAt);
      tareasPendientes.innerHTML += `
<div>
<li class="tarea">
<div class="not-done" change id="${tarea.id}"></div>
<div class="descripcion">
<p class="nombre">${tarea.description}</p>
<p class="timestamp"><i class="far
fa-calendar-alt"></i> ${date.toLocaleDateString()}</p>
</div>
</li>
<div>
`;

      // ------------------  >>>  Tareas Terminadas -------------------->>
      tareasTerminadas.innerHTML = "";
      arrayTareasTerminadas.forEach((tarea) => {
        tareasTerminadas.innerHTML += `
    <li class="tarea">
  <div class="done"></div>
  <div class="descripcion">
    <p class="nombre">${tarea.description}</p>
    <div>
      <button>
        <i id="${tarea.id}"
          class="fas fa-undo-alt change"></i>
      </button>
      <button>
        <i id="${tarea.id}" class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>
</li>
    `;
      });
    });
  }

    
  // ▻▻▻▻▻ Eliminar tareas  ---- ᓚᘏᗢ

  // ▻▻▻▻▻ Tildar tarea como realizada  ---- ᓚᘏᗢ

  // ▻▻▻▻▻ Cerrar la aplicación ---- ᓚᘏᗢ
  btnCerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("listaTareas");
    location.href = "./index.html";
  });

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

  function obtenerListaTareas(url, token) {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(url, settings)
      .then((response) => response.json())
      .then((lista) => {
        ordenarListaTareas(lista);
      });
  }
  if (arrayTareasPendientes.lentgh !== 0) {
    skeleton.remove();
  }

}); //cierre del window event

// ▻▻▻▻▻ Obtener una tarea en particular ---- ᓚᘏᗢ

// tengo que capturar la tarea al hacer click sobre el circulo de la tarea...  ＼（〇_ｏ）／
  const tareasNotDoneArray = document.querySelectorAll(".not-done");
tareasNotDoneArray.forEach(tarea =>{
 tarea.addEventListener("click", function(e){
   const tareaSeleccionada = e.target.id;
   tareaSeleccionada.localStorage.setItem("tareaID")
 })
});