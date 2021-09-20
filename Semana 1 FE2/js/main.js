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
      alert(
        "El resultado de la partida fue empate! 😮" +
          " \nLlevas acumulados " +
          resultadoUsuario +
          " puntos."
      );

      //en caso de que el usuario pierda
    } else if (
      (usuario == 1 && computadora == 2) ||
      (usuario == 2 && computadora == 3) ||
      (usuario == 3 && computadora == 1)
    ) {
      resultadoComputadora++;
      alert(
        "El resultado de la partida fue derrota! 😭" +
          " \nLlevas acumulados " +
          resultadoUsuario +
          " puntos."
      );

      //en caso de que el usuario gane
    } else if (
      (usuario == 2 && computadora == 1) ||
      (usuario == 3 && computadora == 2) ||
      (usuario == 1 && computadora == 3)
    ) {
      resultadoUsuario++;
      alert(
        "El resultado de la partida fue triunfo! 😁" +
          " \nLlevas acumulados " +
          resultadoUsuario +
          " puntos."
      );
    } else {
      alert(
        "El ingreso no fue válido.\nPerdiste tu oportunidad esta vez.\nLa compu suma un punto 🙈"
      );
      resultadoComputadora++;
    }
  }

  if (resultadoUsuario == resultadoComputadora) {
    alert(
      "Hubo un empate 😅 \nTu total es " +
        resultadoUsuario +
        " puntos " +
        " y el total de la compu es " +
        resultadoComputadora +
        " puntos."
    );
  } else {
    resultadoUsuario > resultadoComputadora
      ? alert(
          "Ganaste el juego! 😁 \nTu total es " +
            resultadoUsuario +
            " puntos " +
            " y el total de la compu es " +
            resultadoComputadora +
            " puntos."
        )
      : alert(
          "Perdiste el juego 😓 \nTu total es " +
            resultadoUsuario +
            " puntos " +
            " y el total de la compu es " +
            resultadoComputadora +
            " puntos."
        );
  }
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
let cantidadAciertosAcumulados = 0;
let cantidadJugadas = 1;

function jugarTragamonedas(event) {
  let resultadoTragamonedas = [];
  const premioTotal = 2500;

  let numero1 = parseInt(((Math.random() * 10) % 9) + 1);
  let numero2 = parseInt(((Math.random() * 10) % 9) + 1);
  let numero3 = parseInt(((Math.random() * 10) % 9) + 1);
  let numero4 = parseInt(((Math.random() * 10) % 9) + 1);

  //variables para probar el premio mayor
  // let numero1 =1;
  // let numero2 =1;
  // let numero3 =1;
  // let numero4 =1;

  resultadoTragamonedas = [numero1, numero2, numero3, numero4];
  document.getElementById("tragamonedas").innerHTML = resultadoTragamonedas;

  if (numero1 == numero2 && numero1 == numero3 && numero1 == numero4) {
    premioActual = premioTotal * (1 + cantidadAciertosAcumulados);
    premioAcumulado = premioAcumulado + premioActual;
    cantidadAciertosAcumulados++;
    alert(
      "EXCELENTE! Te ganaste el premio mayor de " +
        premioActual +
        " ✨🎉 \nTu total ganado es $" +
        premioAcumulado +
        " \nLlevas " +
        cantidadAciertosAcumulados +
        " de aciertos hasta el momento."
    );
  } else if (numero1 == numero2 || numero2 == numero3 || numero3 == numero4) {
    let premioActual =
      100 +
      parseInt(premioTotal * (cantidadAciertosAcumulados / cantidadJugadas));
    premioAcumulado = premioAcumulado + premioActual;
    cantidadAciertosAcumulados++;
    alert(
      "BIEN! 😁 Ganaste $" +
        premioActual +
        " \nLlevas ganado $" +
        premioAcumulado +
        " \nLlevas " +
        cantidadAciertosAcumulados +
        " de aciertos hasta el momento."
    );
  } else
    alert(
      "Esta vez no ganaste 😫 \nHasta el momento llevas $" +
        premioAcumulado +
        " y " +
        cantidadAciertosAcumulados +
        " aciertos."
    );
  cantidadJugadas++;
}

document
  .getElementById("jugarTragamonedas")
  .addEventListener("click", jugarTragamonedas);

// 2. Lotería
// Crear un programa que consista en una apuesta donde el usuario tenga que ingresar un objeto o lugar con el que soñó ese día, para que luego lo muestre en pantalla y se calcule aleatoriamente un resultado numérico con 4 posibles casos de premios que pueda ganar: si el resultado es 0, gana $1.000, si es 1,gana $10.000; si es 2 gana $10.000, y si es 3 gana $100.000.
