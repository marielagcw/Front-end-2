function cambiarTema() {
  const tema = document.body.classList.toggle('dark');

  const boton = document.querySelector('.theme button');
  if(tema){
    boton.innerHTML = 'Cambiar tema <i class="fas fa-sun"></i>';
  }else{
    boton.innerHTML = 'Cambiar tema <i class="fas fa-moon"></i>';
  }
}


// plantilla
/* <div class="item">
      <img src="./imagenes/tiger.jpg">
      <h2>${title}</h2>
      <p>
        El tigre (Panthera tigris) es una de las especies​ de la subfamilia de los panterinos (familia Felidae)
        pertenecientes al género Panthera. Se encuentra solamente en el continente asiático; es un predador carnívoro y
        es
        la especie de félido más grande del mundo junto con el león pudiendo alcanzar ambos un tamaño comparable al de
        los
        fósiles de félidos de mayor tamaño.
      </p>
    </div> */

    let contenedorItems = document.querySelector(".contenedor");

    function renderizarItems() {
      //resolver el renderizado de cada tarjeta del array
      for(let i = 0; i<= listadoFelinos.length; i++){
       contenedorItems.innerHTML += `
      <div class="item">
      <img src="${listadoFelinos[i].imgUrl}">
      <h2>${listadoFelinos[i].title}</h2>
      <p>
        ${listadoFelinos[i].description}
      </p>
    </div>
      ` 
      }     
    }

    renderizarItems();