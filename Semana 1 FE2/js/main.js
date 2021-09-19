// Clase 1 >>>>>>>>> ᓚᘏᗢ Sumar array >>>>>>>>> //
// Objetivo
// Realizar un script que permita sumar un array de números consecutivamente, de forma
// que se sume el primer número con el segundo y lo imprima por consola. Luego, tenemos
// que tomar este resultado y sumarle el tercer numero, y asi hasta terminar de recorrer el
// array

const armarArray = function armarArray(event){
    event.preventDefault();
    const arrayNums = Array.from(document.getElementsByClassName("form-control")).map(e => e.value);
    const arrayIngresado = arrayNums.map(e => Number.parseInt(e));
    const nuevoArrayResultado = [];
    let sumaNumAnterior = 0;
    for(let i = 0; i < arrayIngresado.length; i++){
        sumaNumAnterior = sumaNumAnterior + arrayIngresado[i]
        nuevoArrayResultado.push(sumaNumAnterior);
    } 
    document.getElementById("suma").innerHTML = nuevoArrayResultado;  
}

document.getElementById("ejecutar").addEventListener("click", armarArray);



