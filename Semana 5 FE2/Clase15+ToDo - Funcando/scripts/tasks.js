/* -------------------------------------------------------------------------- */
/*                           Capturar elementos HTML                          */
/* -------------------------------------------------------------------------- */
const formTasks = document.forms[0];
const mostrarUsuario = document.querySelector("#mostrarUsuario");
const btnNuevaTarea = document.querySelector("#btnNuevaTarea");
const tareasPendientes = document.querySelector("ul.tareas-pendientes");
const tareasTerminadas = document.querySelector("ul.tareas-terminadas");
const skeleton = document.querySelector("#skeleton");
const errorMessage = document.querySelector(".errorMessage");
const btnCerrarSesion = document.querySelector("#closeApp");

/* -------------------------------------------------------------------------- */
/*                            Variables frecuentes                            */
/* -------------------------------------------------------------------------- */
const apiUrlGetMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
const apiUrlTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks";
const jwt = localStorage.getItem("token");

/* -------------------------------------------------------------------------- */
/*                             Carga de la página                             */
/* -------------------------------------------------------------------------- */
window.addEventListener("load", function () {
  if (!jwt) {
    location.href = "./index.html";
  }
  formTasks.addEventListener("submit", (e) => e.preventDefault());

  /* -------------------------------------------------------------------------- */
  /*                                  Requests                                  */
  /* -------------------------------------------------------------------------- */

  /* ---------------------- Renderizar Nombre de usuario ---------------------- */
  renderizarNombreUsuario(apiUrlGetMe, jwt);

  /* ------------------------------- Nueva tarea ------------------------------ */
  btnNuevaTarea.addEventListener("click", (e) => {
    e.preventDefault();
    nuevaTareaIngresada();
  });

  /* -------------------- Obtener y ordenar lista de tareas ------------------- */
  obtenerListaTareas(apiUrlTasks, jwt);

  /* ------------------------------ Cerrar la app ----------------------------- */
  btnCerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("listaTareas");
    location.href = "./index.html";
  });
}); //cierre del window event

/* -------------------------------------------------------------------------- */
/*                                  Funciones                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------- Renderizar nombre de usuario ---------------------- */
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

/* -------------------------- Ingresar nueva tarea -------------------------- */
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

/* -------------------- Crear nueva tarea en el servidor -------------------- */
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

/* ---------------- Obtener lista de tareas desde el servidor --------------- */
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

/* ----------- Renderizar por tipo de tarea (pendiente/terminada) ----------- */
function renderizarPorTipoTarea(lista) {
  arrayTareasPendientes = [];
  arrayTareasTerminadas = [];

  // Vaciamos los arrays para evitar duplicados en pantalla
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
<div class="not-done" change id="${tarea.id}" 
title="${tarea.description}"></div>
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
  <div class="done" change id="${tarea.id}" 
  title="${tarea.description}"></div>
<div class="descripcion">
<p class="nombre">${tarea.description}</p>
  <div>
    <button class="btnDeshacer" id="${tarea.id}">
      <i 
        class="fas fa-undo-alt change"></i>
    </button>
    <button class="btnEliminar" id="${tarea.id}">
      <i  class="far fa-trash-alt"></i>
    </button>
  </div>
</div>
</li>
  `;
    });
  });
  obtenerIdTareaSeleccionada();
  if (arrayTareasPendientes.lentgh !== 0) {
    skeleton.remove();
  }
}


/* -------------------------------------------------------------------------- */
/*              Seleccionar y accionar sobre una tarea específica             */
/* -------------------------------------------------------------------------- */

function obtenerIdTareaSeleccionada() {
  const escucharTareasPendientes = document.querySelectorAll("div.not-done");

  // >>>>>>>>>>>>>>>>>> Buscar tarea en la que se hizo click >>>>>>>>>>>>>>>>>>>>>>>>>> //
  escucharTareasPendientes.forEach((tarea) => {
    tarea.addEventListener("click", function (e) {
      let tareaSeleccionada = e.target;
      if (tareaSeleccionada.id) {
        let descripcionTareaSeleccionada = tareaSeleccionada.title;

        // >>>>>>>>>>>>>>>>>>>>>>>>> Marcar tarea terminada >>>>>>>>>>>>>>>>>>>> //
        Swal.fire({
          title: "¿Qué deseas hacer con tu tarea?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Finalizar",
          denyButtonText: `Modificar`,
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(apiUrlTasks + "/" + `${tareaSeleccionada.id}`, {
              method: "PUT",
              headers: {
                Authorization: jwt,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                description: descripcionTareaSeleccionada,
                completed: true,
              }),
            }).then(() => {
              Swal.fire({
                icon: "success",
                title: "Listo!",
              });
              obtenerListaTareas(apiUrlTasks, jwt);
            });
          } else if (result.isDenied) {
            // >>>>>>>>>>>>>>>>>>>> Alerta para que el usuario decida qué hacer >>>>>>>>>> //
            Swal.fire({
              title: "¿Qué tipo de modificación querés hacer?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Modificar contenido",
              denyButtonText: `Eliminarla`,
              cancelButtonText: "Cancelar",
            }).then((result) => {
              /* ----------------------------- Acción Modificar Tarea ---------------------------- */
              /* ------------------- Modificación de la tarea también en el servidor ------------ */
              if (result.isConfirmed) {
                const inputValue = `${descripcionTareaSeleccionada}`;
                Swal.fire({
                  title: "Modifica tu tarea",
                  input: "text",
                  inputValue: inputValue,
                  inputAttributes: {
                    autocapitalize: "off",
                  },
                  showCancelButton: true,
                  confirmButtonText: "Confirmar",
                  showLoaderOnConfirm: true,
                  cancelButtonText: "Cancelar",
                }).then((response) => {
                  const tareaModificada = response.value;
                  if (tareaModificada) {
                    const urlId = apiUrlTasks + "/" + `${tareaSeleccionada.id}`;
                    fetch(urlId, {
                      method: "PUT",
                      headers: {
                        Authorization: jwt,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        description: tareaModificada,
                        completed: false,
                      }),
                    }).then(() => {
                      Swal.fire({
                        icon: "success",
                        title: `La tarea fue modificada con éxito!`,
                      });
                      obtenerListaTareas(apiUrlTasks, jwt);
                    });
                  }
                });

                /* ----------------------------- Acción Eliminar tarea ----------------------------- */
              } else if (result.isDenied) {
                Swal.fire({
                  title: "Realmente quieres eliminar esta tarea? Aún está pendiente",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Sí! Quiero eliminarla!",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    eliminarTareaServidor(
                      apiUrlTasks + "/" + `${tareaSeleccionada.id}`,
                      jwt
                    );
                    Swal.fire({
                      icon: "success",
                      title: "Tu tarea ha sido eliminada exitosamente.",
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  const escucharTareasPendientes = document.querySelectorAll("div.done");
  
}




/* --------------------- Eliminar la tarea del servidor --------------------- */
function eliminarTareaServidor(url, token) {
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
