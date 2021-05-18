//export var tipoRutinaPasar = "";
var sesion=false;
var querystring=window.location.search;

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
    console.log(sesion);
    //sesion=false;
    document.getElementById("iniSesion").style.display = "none";
    validarInicioSesion();
    
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

function abrirNivelBasico() {
    document.getElementById("ventNivel").style.display = "block";
    cerrarNivelInter();
    cerrarNivelAvan();
}

function cerrarNivelBasico() {
    document.getElementById("ventNivel").style.display = "none";
}

function abrirNivelIntermedio() {
    document.getElementById("ventNivelI").style.display = "block";
    cerrarNivelBasico();
    cerrarNivelAvan();
}

function cerrarNivelInter() {
    document.getElementById("ventNivelI").style.display = "none";
}

function abrirNivelAvanzado() {
    document.getElementById("ventNivelA").style.display = "block";
    cerrarNivelBasico();
    cerrarNivelInter();
}

function cerrarNivelAvan() {
    document.getElementById("ventNivelA").style.display = "none";
}


function validarInicioSesion(){
    if(sesion){
        console.log(sesion);
        document.getElementById("botonRegistrarse").style.display = "none";
        document.getElementById("botonIniciarSesion").style.display = "none";
        document.getElementById("iniSesion").style.display = "inline";

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