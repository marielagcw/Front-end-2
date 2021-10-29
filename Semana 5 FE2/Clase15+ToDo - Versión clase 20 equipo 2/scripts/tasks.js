window.addEventListener("load", function () {
  /* -------------------------------------------------------------------------- */
  /*                        Funcionalidades de las Tasks                        */
  /* -------------------------------------------------------------------------- */

  /* ------------------------- Captura elementos HTML ------------------------- */
  const formTasks = document.forms[0];
  const userInfo = document.querySelector(".user-info");
  const closeApp = document.querySelector("#closeApp");
  const apiUrlGetMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
  const apiUrlGetTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks"
  const mostrarUsuario = this.document.querySelector("#mostrarUsuario");

  /* ---------------------------- Submit Formulario --------------------------- */
  formTasks.addEventListener("submit", (e) => e.preventDefault());

  /* --------------------------------- Resquests --------------------------------- */
  obtenerNombreUsuario(apiUrlGetMe);
  obtenerListaTareas(apiUrlGetTasks);
 

  // Obtener información del usuario y mostrarla
  let nombre = localStorage.getItem("usuario");
  mostrarUsuario.innerText = nombre;

  // Obtener lista de tareas y mostrarla en consola
  let tareas = this.localStorage.getItem("tareas");
  console.log(tareas);
  
  
  // Cerrar la aplicación

  // Nueva tarea

  // Tareas pendientes


  // Tareas terminadas

  /* ---------------------- Validaciones y normalización ---------------------- */

  /* -------------------------- Conexión al servidor -------------------------- */
  
    function obtenerNombreUsuario(url){fetch(url, {
      method: "GET",
      headers: {
        "Authorization":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXJ0eSIsImlkIjoxMDIyLCJpYXQiOjE2MzUyOTkzNjJ9.IJQ0PgP73xr4PW3pQ3kk7n3CRmy9pEn3VH2BNj65b4c",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("usuario", data.firstName);
      });
    }

    function obtenerListaTareas(url){fetch(url, {
      method: "GET",
      headers: {
        "Authorization":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXJ0eSIsImlkIjoxMDIyLCJpYXQiOjE2MzUyOTkzNjJ9.IJQ0PgP73xr4PW3pQ3kk7n3CRmy9pEn3VH2BNj65b4c",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("tareas", data.list);
      });
    }

}); //cierre del window event
