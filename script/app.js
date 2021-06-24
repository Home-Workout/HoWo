//export var tipoRutinaPasar = "";
const dbE = firebase.firestore();
var sesion=false;
var nombreUs="";
var correoUS="";
var querystring=window.location.search;

var realizados=[];
var listBasico=[];
var listIntermedio=[];

window.addEventListener('load', function() {
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.carousel__indicadores',
        arrows: {
            prev: '.carousel__anterior',
            next: '.carousel__siguiente'
        },
        responsive: [{
            // screens greater than >= 775px
            breakpoint: 450,
            settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            // screens greater than >= 1024px
            breakpoint: 800,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 4
            }
        }]
    });  
    querystring= window.location.search.substr(1);
    //console.log(querystring) // '?q=pisos+en+barcelona&ciudad=Barcelona'

// usando el querystring, creamos un objeto del tipo URLSearchParams
    const params = new URLSearchParams(querystring);
    sesion=params.get('sesion')
    nombreUs=params.get('nombre');
    correoUS=params.get('correo');
    console.log(sesion);
    //sesion=false;
    document.getElementById("iniSesion").style.display = "none";
    document.getElementById("botonSerrarSesion").style.display = "none";
    if(sesion){
        validarInicioSesion();  
        desbloquearNiveles(correoUS);     
    }   
});

function abrir() {
    document.getElementById("vent").style.display = "block";
    cerrar2();
}

function cerrar() {
    document.getElementById("vent").style.display = "none";
}

function abrir2() {
    document.getElementById("vent2").style.display = "block";
    cerrar();
}

function cerrar2() {
    document.getElementById("vent2").style.display = "none";
}

var bolIntermedio=false;
var bolAvanzado=false;

function abrirNivelBasico() {
    document.getElementById("ventNivel").style.display = "block";   
    cerrarNivelInter();
    cerrarNivelAvan();
}

function cerrarNivelBasico() {
    document.getElementById("ventNivel").style.display = "none";
}

function abrirNivelIntermedio() {
    if(bolIntermedio){
        document.getElementById("ventNivelI").style.display = "block";
        cerrarNivelBasico();
        cerrarNivelAvan();

    }
    
}

function cerrarNivelInter() {
    document.getElementById("ventNivelI").style.display = "none";
}

function abrirNivelAvanzado() {
    if(bolAvanzado){
        document.getElementById("ventNivelA").style.display = "block";
        cerrarNivelBasico();
        cerrarNivelInter();
    }
    
}

function cerrarNivelAvan() {
    document.getElementById("ventNivelA").style.display = "none";
}

function abrirDesafioI(){
    document.getElementById("ventDesfI").style.display = "block";
    cerrarDesafII();
    cerrarDesafIII();
}
function cerrarDesafI(){
    document.getElementById("ventDesfI").style.display = "none";
}
function abrirDesafioII(){
    document.getElementById("ventDesfII").style.display = "block";
    cerrarDesafI();
    cerrarDesafIII();
}
function cerrarDesafII(){
    document.getElementById("ventDesfII").style.display = "none";
}
function abrirDesafioIII(){
    document.getElementById("ventDesfIII").style.display = "block";
    cerrarDesafI();
    cerrarDesafII();
}
function cerrarDesafIII(){
    document.getElementById("ventDesfIII").style.display = "none";
}



function validarInicioSesion(){
    if(sesion){
        console.log(sesion);
        document.getElementById("botonRegistrarse").style.display = "none";
        document.getElementById("botonIniciarSesion").style.display = "none";
        document.getElementById("iniSesion").innerHTML=nombreUs;
        document.getElementById("iniSesion").style.display = "inline"; 
        document.getElementById("botonSerrarSesion").style.display ="inline";


    }else{
        window.location.href = "IniciarSesion.php";
    }
         
}

function irARutina(r){
    if(sesion){
        window.location.href = r+"&sesion=true&nombre="+nombreUs+"&correo="+correoUS;
    }
    else{
        window.location.href = "IniciarSesion.php";
    }
}


/*portafolio*/

filterSelection("nature")

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

function verProgreso(){
    if(sesion){
        window.location.href = "VerProgreso.html?sesion=true&nombre="+nombreUs+"&correo="+correoUS;
    }
    /*else{
        window.location.href = "IniciarSesion.php";
    }*/

}

async function desbloquearNiveles(correorevision){
    await dbE.collection("Registrar_Usuario").where("correoU", "==", correorevision)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                        //nom = doc.data().nombreU;
                        //fec= doc.data().fecRegistro;
                        //numEn=doc.data().numEntrenamiento;
                        var i = 0;
                        var j = 0;
                        realizados=doc.data().Ejercicio;
                        realizados.forEach(element => {
                            if (element.nivel == 'Principiante') {
                                listBasico[i] = element;
                                i++;
        
                            }
                            if (element.nivel == 'Intermedio') {
                                listIntermedio[j] = element;
                                j++;
        
                            }
        
                        });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            if(listBasico.length==6){
                bolIntermedio=true;
            }
            if(listIntermedio.length==6){
                bolAvanzado=true;
            }


}



// Add active class to the current button (highlight it)
/*var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    console.log(current.namedItem); 
    console.log(current[0].className);
    current[0].className = current[0].className.replace(" active","");
    console.log(current[0].className);
    this.className += " active";
  });
}*/

/*$(function() {
  var botones = $(".container button");
  botones.click(function() {
    botones.removeClass('active');
    $(this).addClass('active');
  });
});*/