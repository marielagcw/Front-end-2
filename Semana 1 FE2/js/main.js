//========================================================================================================================//

// Clase 1 >>>>>>>>> ᓚᘏᗢ Sumar array >>>>>>>>> //

// Objetivo
// Realizar un script que permita sumar un array de números consecutivamente, de forma
// que se sume el primer número con el segundo y lo imprima por consola. Luego, tenemos
// que tomar este resultado y sumarle el tercer numero, y asi hasta terminar de recorrer el
// array

const armarArray = function armarArray(event) {
  event.preventDefault();
  const arrayNums = Array.from(
    document.getElementsByClassName("form-control")
  ).map((e) => e.value);
  const arrayIngresado = arrayNums.map((e) => Number.parseInt(e));
  const nuevoArrayResultado = [];
  let sumaNumAnterior = 0;
  for (let i = 0; i < arrayIngresado.length; i++) {
    sumaNumAnterior = sumaNumAnterior + arrayIngresado[i];
    nuevoArrayResultado.push(sumaNumAnterior);
  }
  document.getElementById("suma").innerHTML = nuevoArrayResultado;
};

document.getElementById("ejecutar").addEventListener("click", armarArray);

//========================================================================================================================//

// Clase 2 >>>>>>>>> ᓚᘏᗢ Piedra Papel o Tijera >>>>>>>>> //

// Desafío → Jugar al Piedra Papel o Tijera (usuario contra computadora)
// resultados:
// Piedra gana a Tijera → 1 gana 3 pierde
// Tijera gana a papel → 3 gana 2 pierde
// Papel gana a piedra → 2 gana 1 pierde

//REQUERIMIENTOS
/*
✔- necesitamos poder elegir entre 3 opciones(p,p o t)
✔- relacionar cada opcion con un valor
✔- el usuario puede elegir
✔- la computadora va a jugar un opcion aleatoria
✔- hacer comparaciones de las elecciones
✔- mostrar un resulta final

*/

let jugarPiedraPapel = function (event) {
  event.preventDefault();
  let computadora;
  let usuario;
  let resultadoUsuario = 0;
  let resultadoComputadora = 0;

  for (let i = 0; i < 5; i++) {
    computadora = parseInt(((Math.random() * 10) % 3) + 1);
    usuario = parseInt(
      prompt("Ingrese 1 para piedra, 2 para papel o 3 para tijera.")
    );
    // en caso de empate
    if (usuario == computadora) {
      resultadoUsuario++;
      resultadoComputadora++;
      alert("El resultado de la partida fue empate! 😮");

      //en caso de que el usuario pierda
    } else if (
      (usuario == 1 && computadora == 2) ||
      (usuario == 2 && computadora == 3) ||
      (usuario == 3 && computadora == 1)
    ) {
      resultadoComputadora++;
      alert("El resultado de la partida fue derrota! 😭");

      //en caso de que el usuario gane
    } else if (
      (usuario == 2 && computadora == 1) ||
      (usuario == 3 && computadora == 2) ||
      (usuario == 1 && computadora == 3)
    ) {
      resultadoUsuario++;
      alert("El resultado de la partida fue triunfo! 😁");
    } else {
      alert("El ingreso no fue válido.");
    }
  }

  resultadoUsuario > resultadoComputadora + 1
    ? alert("Ganaste el juego! 😁")
    : alert("Perdiste el juego 😓");
};

document
  .getElementById("jugarPiedra")
  .addEventListener("click", jugarPiedraPapel);

//========================================================================================================================//

// Clase 3 >>>>>>>>> ᓚᘏᗢ Casino >>>>>>>>> //

// 1. Tragamonedas!

// Crear una función que reciba un número que será la cantidad de aciertos del usuario sobre el total de casillas disponibles.
// La función deberá devolver el monto del premio, el cual es proporcional al número de aciertos.

let premioAcumulado = 0;

function jugarTragamonedas(event) {
  let resultadoTragamonedas = [];
  const premioTotal = 2500;

  let numero1 = parseInt(((Math.random() * 10) % 9) + 1);
  let numero2 = parseInt(((Math.random() * 10) % 9) + 1);
  let numero3 = parseInt(((Math.random() * 10) % 9) + 1);
  resultadoTragamonedas = [numero1, numero2, numero3];
  document.getElementById("tragamonedas").innerHTML = resultadoTragamonedas;

  if ((numero1 == numero2) == numero3) {
    premioAcumulado = premioTotal;
    alert("Te ganaste el mayor! Ganaste $" + premioAcumulado);
  } else if (numero1 == numero2 || numero2 == numero3 || numero1 == numero3) {
    premioAcumulado = premioAcumulado + parseInt(premioTotal / 3);
    alert("Bien! Llevas ganado $" + premioAcumulado);
  } else alert("Esta vez no ganaste 😫");
}

document
  .getElementById("jugarTragamonedas")
  .addEventListener("click", jugarTragamonedas);
