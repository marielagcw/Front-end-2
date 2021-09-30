// ▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Mascota virtual ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀
// Consumo de energía vital → vive / muere → booleano
// Energía inicial → valor fijo
// Energía extra → alimento → tiene un máx y un mín de tolerancia para no enfermar
// Ejercicio físico → también tiene un rango de salud por fuera del cual perjudicaría la salud
// Vinculación social

//▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Inicio  ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀

const petIt = {
  name: "PetIt",
  ageDays: 1,
  live: true,
  health: 6,
  hunger: true,
  foodHistory: [],
  exerciseHistory: [],
  sociabilityHistory: [],

  eat: function eat(foodPortionsDay) {
    let foodPoints = 0;
    if (foodPortionsDay >= 3 && foodPortionsDay <= 6) {
      foodPoints = foodPortionsDay;
      this.hunger = false;
    } else if (foodPortionsDay > 6) {
      foodPoints = (foodPortionsDay - 6) * -0.5;
    } else if (foodPortionsDay === 0) {
      foodPoints = -0.75;
    } else if (foodPortionsDay < 3){
      foodPoints = foodPortionsDay * -0.75;
      this.hunger = true;
    } 
    this.health = this.health + foodPoints;
    this.foodHistory.push(foodPoints);
    // console.log(this.foodHistory);
  },

  exercise: function exercise(exerciseHoursDay, age) {
    let exercisePoints = 0;
    if (
      (age < 18 && exerciseHoursDay >= 2 && exerciseHoursDay <= 8) ||
      (age >= 18 && exerciseHoursDay >= 1 && exerciseHoursDay <= 8)
    ) {
      exercisePoints = exerciseHoursDay;
    } else exercisePoints = exerciseHoursDay * -0.5;
    this.health = this.health + exercisePoints;
    this.exerciseHistory.push(exercisePoints);
    // console.log(this.exerciseHistory);
  },

  sociability: function sociability(momentsSociability) {
    let sociabilityPoints = 0;
    if (momentsSociability >= 1 && momentsSociability <= 10) {
      sociabilityPoints = momentsSociability;
    } else if (momentsSociability === 0) {
      sociabilityPoints = -0.5;
    } else sociabilityPoints = momentsSociability * -0.5;
    this.health = this.health + sociabilityPoints;
    this.sociabilityHistory.push(sociabilityPoints);
    // console.log(this.sociabilityHistory);
  },

  itLives: function itLives() {
    if (
      (this.ageDays * 6 <= this.health && this.ageDays < 18) ||
      (this.ageDays * 5 <= this.health && this.ageDays >= 18)
    ) {
      this.live = true;
    } else this.live = false;
  },
  
  livingDay: function livingDay(
    foodPortionsDay,
    exerciseHoursDay,
    momentsSociability
  ) {
    this.eat(foodPortionsDay);
    this.exercise(exerciseHoursDay, petIt.ageDays);
    this.sociability(momentsSociability);
    this.ageDays++;
    this.itLives();
    console.log(
      this.name +
        " tiene " +
        this.ageDays +
        " días de edad y su salud tiene " +
        this.health +
        " puntos." +
        (this.hunger ? " Pero cuidado! tiene hambre!" : " No tiene hambre!") +
        (this.live
          ? " Sigue vivo!! "
          : " Aunque la triste noticia es que ya no está aquí con nosotros (RIP)")
    );
  },
};

//▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Fin  ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀

// console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Prueba método eat ⋘⋘⋘⋘⋘⋘⋘⋘ ");
// petIt.eat(1);
// petIt.eat(3);
// petIt.eat(7);
// petIt.eat(10);
// petIt.eat(0);

// console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Prueba método exercise ⋘⋘⋘⋘⋘⋘⋘⋘ ");
// petIt.exercise(1, 1);
// petIt.exercise(2, 1);
// petIt.exercise(1, 19);
// petIt.exercise(10, 19);

// console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Prueba método sociability ⋘⋘⋘⋘⋘⋘⋘⋘ ");
// petIt.sociability(0);
// petIt.sociability(2);
// petIt.sociability(11);

// console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Prueba método itLives ⋘⋘⋘⋘⋘⋘⋘⋘ ");
// petIt.itLives();
// console.log(petIt.live);

console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Día 1 ⋘⋘⋘⋘⋘⋘⋘⋘ ");
// parámetros a pasar: foodPortionsDay, exerciseHoursDay, recreationMomentsDay
petIt.livingDay(3, 2, 1);
console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Dia 2 ⋘⋘⋘⋘⋘⋘⋘⋘ ");
petIt.livingDay(3, 3, 3);
console.log(" ⋙⋙⋙⋙⋙⋙⋙⋙ ᓚᘏᗢ Dia 3 ⋘⋘⋘⋘⋘⋘⋘⋘ ");
petIt.livingDay(1, 3, 3);



//▶▷▶▷▶▷▶▷▶∾∾∾∾∾∾∾∾∾⊱ ᓚᘏᗢ  Uniendo al front ♥  ⊰∾∾∾∾∾∾∾∾∾∾◀◁◀◁◀◁◀◁◀

// captamos los botones 

let botonAlimentar = this.document.querySelector(".botonAlimentar"); //es una clase
let botonEjercitar = this.document.querySelector(".botonEjercitar");
let botonPasear = this.document.querySelector("botonPasear");

//transformamos los clicks en parámetros

let porciones = 0;
let capturarClickAlimentar = botonAlimentar.addEventListener("click", 
function(){

}
)