// ▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Mascota virtual ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀
// Consumo de energía vital → vive / muere → booleano
// Energía inicial → valor fijo
// Energía extra → alimento → tiene un máx y un mín de tolerancia para no enfermar
// Ejercicio físico → también tiene un rango de salud por fuera del cual perjudicaría la salud
// Vinculación social

//▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Inicio  ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀

const petIt = {
  name: "",
  age: 0,
  live: false,
  health: 0,
  hunger: true,
  foodPortionDay: 0,
  exerciseHourDay: 0,
  sociabilityMomentDay: 0,

  // ================  (❁´◡`❁) Función comer =========================== //
  eat: function eat(foodPortion) {
    this.foodPortionDay++;
  },

  // ================  (❁´◡`❁) Función ejercitarse =========================== //
  exercise: function exercise(exerciseHoursDay, age) {
    this.exerciseHourDay++;
  },

  // ================  (❁´◡`❁) Función sociabilizar =========================== //
  sociability: function sociability(momentsSociability) {
    this.sociabilityMomentDay++;
  },

  // ================  (❁´◡`❁) Función ¿Vive??? =========================== //
  itLives: function itLives() {
    if (
      (this.age * 6 <= this.health && this.age < 18) ||
      (this.age * 5 <= this.health && this.age >= 18)
    ) {
      this.live = true;
      console.log("vive");
    }
    if (this.age >= 3) {
      this.live = false;
      console.log("no vive");
    }
  },
};

//▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Uniendo al front ♥  ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀

// ==================== captamos los botones ======================= //

let botonJugar = this.document.querySelector(".botonJugar");
let botonAlimentar = this.document.querySelector(".botonAlimentar");
let botonEjercitar = this.document.querySelector(".botonEjercitar");
let botonPasear = this.document.querySelector(".botonPasear");

// ========== transformamos los clicks en parámetros ================ //

// >>>>>>>>>>>> Alimentar >>>>>>>>>>>>> //

botonAlimentar.addEventListener("click", function darPorcion(event) {
  petIt.eat(1);
  alert("Ya van " + petIt.foodPortionDay + " porciones de comida hoy \n >\"<")
  console.log("funciona");
});

// >>>>>>>>>>>> Ejercitar >>>>>>>>>>>>> //

botonEjercitar.addEventListener("click", function ejercitarHora(event) {
  petIt.exercise(1);
  alert("Ya van " + petIt.exerciseHourDay + " horas de ejercicio hoy \n o(^▽^)o")
  console.log("funciona");
});

// >>>>>>>>>>>> Pasear >>>>>>>>>>>>> //

botonPasear.addEventListener("click", function pasear(event) {
  petIt.sociability(1);
  alert("Ya van " + petIt.sociabilityMomentDay + " paseos hoy \n ☆⌒(*＾-゜)v")
  console.log("funciona");
});

// ========== It´s alive! ================== //
let time = 9000;
let viviendo;
let intervaloJuego;

function darVida() {
  viviendo = setTimeout(function () {
    petIt.age++;
    let estadoMiMascotita = document.querySelector(".estado");
    let templateInsertarDatos = `
      <p class="subtitulo"> Estado de ${petIt.name} dia ${petIt.age}</p>
      <p>Holis!! Te cuento... </p>
      <p>Hoy comi ${petIt.foodPortionDay} porciones de comida </p>
      <p>Hice ${petIt.exerciseHourDay} horas de ejercicio! </p>
      <p>Sali a pasear ${petIt.sociabilityMomentDay} veces</p>
    `;
    estadoMiMascotita.innerHTML = templateInsertarDatos;
    petIt.itLives();
    petIt.foodPortionDay = 0;
    petIt.exerciseHourDay = 0;
    petIt.sociabilityMomentDay = 0;
  }, time);
}
function detenerVida() {
  clearTimeout(viviendo);
  clearInterval(intervaloJuego);
  let jugarOtraVez = confirm(petIt.name + " ya no está con nosotros... \n ＞﹏＜ \n Querés volver a jugar?");
  return jugarOtraVez;
}

function jugar() {
  let estadoMiMascotita = document.querySelector(".estado");
  estadoMiMascotita.innerHTML = `<p class="subtitulo">Vamos a jugar</p>`
  petIt.name = prompt("Ingresá el nombre de tu mascotita:");
  petIt.live = true;
  petIt.age = 0;
  petIt.health = 0;
  intervaloJuego = setInterval(function () {
    if (petIt.live == true) {
      darVida();
    } if(petIt.live == false){
      detenerVida()? jugar(): alert("El juego terminó");
    } 
  }, time);
}

botonJugar.addEventListener("click", jugar);
