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
const apiUrlDelete = "https://ctd-todo-api.herokuapp.com/v1/tasks/";
const jwt = localStorage.getItem("token");

/* --------------------------- Carga de la página --------------------------- */

window.addEventListener("load", function () {
  /* ---------------------------- Submit Formulario y login --------------------------- */
  if (!jwt) {
    location.href = "./index.html";
  }
  formTasks.addEventListener("submit", (e) => e.preventDefault());

  /* --------------------------------- Resquests --------------------------------- */

  // ▻▻▻▻▻ Renderizar Nombre usuario ---- ᓚᘏᗢ
  renderizarNombreUsuario(apiUrlGetMe, jwt);

  // ▻▻▻▻▻ Crear nueva tarea y respuesta al usuario en caso de error ---- ᓚᘏᗢ
  btnNuevaTarea.addEventListener("click", (e) => {
    e.preventDefault();
    nuevaTareaIngresada();
  });

  // ▻▻▻▻▻ Obtener y ordenar listas de tareas ---- ᓚᘏᗢ
  obtenerListaTareas(apiUrlTasks, jwt);

  // ▻▻▻▻▻ Cerrar la aplicación ---- ᓚᘏᗢ
  btnCerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("listaTareas");
    location.href = "./index.html";
  });
}); //cierre del window event

/* -------------------------- Funcionalidades -------------------------- */

function renderizarNombreUsuario(url, token) {
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

function nuevaTareaIngresada() {
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
      obtenerListaTareas(apiUrlTasks, token);
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
      renderizarPorTipoTarea(lista);
    });
}

function renderizarPorTipoTarea(lista) {
  arrayTareasPendientes = [];
  arrayTareasTerminadas = [];

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
    const newLocal = (tarea) => {
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
    };
    arrayTareasTerminadas.forEach(newLocal);
  });
  obtenerIdTareaSeleccionada();
  if (arrayTareasPendientes.lentgh !== 0) {
    skeleton.remove();
  }
}

function obtenerIdTareaSeleccionada() {
  const escucharTareas = document.querySelectorAll("li.tarea");
  escucharTareas.forEach((tarea) => {
    tarea.addEventListener("click", function (e) {
      let tareaSeleccionada = e.target;
      if (tareaSeleccionada.id) {
        localStorage.setItem("idTareaSeleccionada", tareaSeleccionada.id);
        Swal.fire({
          title: "¿Qué deseas hacer con esta tarea?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Modificar",
          denyButtonText: `Eliminar`,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Tarea modificada correctamente!");
          } else if (result.isDenied) {
            eliminarTarea(apiUrlDelete + `${tareaSeleccionada.id}`, jwt);
            Swal.fire("Tarea eliminada correctamente!");
          }
        });
      }
    });
  });
}

function eliminarTarea(url, token) {
  const settings = {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  };
  fetch(url, settings).then(() => {
   obtenerListaTareas(apiUrlTasks, token);
  });
}
