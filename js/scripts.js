'use strict'

console.log('Empieza el programa')

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector('#formNombre');

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById(
  'contenedorPintarSocios'
)

var datosSocios = new Array();
var datosJSON;

// TODO: array para añadir los socios
cargarSociosJSON()
// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/
function cargarSociosJSON () {
  let path = 'model/datosSocios.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
    response.json().then(data => {
      console.log('Datos', data);
      datosJSON = data;
      aniadirSociosInicialesArray ();      
    })
  })
  
}

/* 
TODO:  metodo para añadir socios al array 
    cuando arranca la pagina web
*/
function aniadirSociosInicialesArray () {
  //  TODO: cargar el fichero JSON, parsearlo a objetos tipo "socio" y añadirlos al array
  for (let i = 0; i<datosJSON.length; i++){
    let elemento = datosJSON[i];
    //console.log(elemento);
    let nombre = elemento.nombre;
    let apellidos = elemento.apellido;
    let id = elemento.id;
    let socioJSON = new socio (nombre, apellidos, id);
    datosSocios.push(socioJSON);
  }
  //console.log(datosSocios);
}

/*
    TODO: Meotodo para capturar los datos del socio introducidor en el formulario
*/
function capturarDatosSocio () {
  // TODO: recoger los el nombre y apellido del HTML
  let nombre = document.getElementById('fnombre').value;
  let apellido = document.getElementById('fapellido').value;
  let existe = datosSocios.findIndex((element) => element.esIgual(nombre, apellido));
  if (existe >= 0){ // Si la variable existe es 0 o mayor significa que los datos ya pertenecen a un socio existente
    alert('Ya existe un socio con ese nombre y apellido. Puede pintar la lista de socios para comprobarlo');
  }else{ // si la variable existe es inferior a 0 los datos no coinciden con los de ningún socio y por lo tanto lo damos de alta
      // TODO: crear el socio y añadirlo al array
    limpiarListaSocios();
    crearSocio(nombre, apellido);
    alert ('Se ha añadido correctamente el socio a la lista. Compruebe la lista actualizada.');
  }
  
}

/* 
TODO: 
    Metodo para crear un socio pasandole el nombre y el apellido
    y añadirlo al array
 */
function crearSocio (nombre, apellido) {
  // TODO: crear objeto socio

  let id = crearID();
  let sociopantalla = new socio(nombre, apellido, id);
  // TODO: añadir el objeto al array
  
  datosSocios.push(sociopantalla);
  console.log (datosSocios);
}

/*
TODO: 
    Metodo para crear el ID del socio en funcion del ultimo
    ID que hay en el array de socios
*/
function crearID () {
  // TODO: mirar el id del ultimo socio del array y sumarle uno
  datosSocios.sort((a,b) => a.id - b.id);
  var ultimoelemento = datosSocios[datosSocios.length - 1];
  return ultimoelemento.id + 1;

}

// EJERCICIO 2

/*
  TODO: metodo que elimina la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/
function pintarListaSocios() {
  //TODO: borramos todo lo que hay en el div
  limpiarListaSocios();
  //TODO: bucle para recorrer y pintar el array de socios
  var ul = '<ul>';
  for (let i = 0; i<datosSocios.length; i++){
    var socioLeido = datosSocios[i];
    ul += '<li>Socio número ' + socioLeido.id +': ' + socioLeido.getNombreCompleto() + '</li>';
  }
  ul += '</ul>';
  //TODO: debemos añadir los socios a la pagina web
  contenedorEscribirSocios.innerHTML = ul;
}

function limpiarListaSocios(){
  contenedorEscribirSocios.innerHTML = '';
}

// ------------------- MAIN ------------------------

// TODO: añadimos los socios iniciales cuando empieza el programa

console.log('Acaba el programa')
