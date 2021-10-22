const formulario =  document.forms[0];
const inputBusqueda = document.querySelector('#busqueda');

//obtenemos la info del local para almacenarla en memoria
const historialEnMemoria = obtenerBusquedasRealizadas();

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(inputBusqueda.value);

    guardarBusqueda(inputBusqueda.value);

    busquedaGoogle(inputBusqueda.value);

    formulario.reset();
});

/* -------------------------------------------------------------------------- */
/*                               FUNCIONALIDADES                              */
/* -------------------------------------------------------------------------- */

/* ---------------------- funcion para buscar en Google --------------------- */
function busquedaGoogle(criterioBuscado) {
    location.href = `https://www.google.com/search?q=${criterioBuscado}`
}

/* -------------- funcion para obtener la data del localStorage ------------- */
function obtenerBusquedasRealizadas() {
    //va a la deposito permanente y busca el item busquedasRealizadas
    let historialAlmacenado = JSON.parse(localStorage.getItem('busquedasRealizas'));
    //chequeamos si exista o no algo, si no habia nada previamente le mandamos un array vacio
    if(!historialAlmacenado){
        historialAlmacenado = [];
    }

    return historialAlmacenado;
}

/* ------------------ funcion para guardar la info buscada ------------------ */
function guardarBusqueda(busqueda) {
    //agrego a los datos en memoria
    historialEnMemoria.push(busqueda);
    //mando a guardar en localStorage
    localStorage.setItem('busquedasRealizas', JSON.stringify(historialEnMemoria));
}