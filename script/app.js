window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 450,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 5,
				slidesToScroll: 4
			  }
			}
		]
	});
});
function abrir(){
    document.getElementById("vent").style.display="block";
    cerrar2();
}
function cerrar(){
    document.getElementById("vent").style.display="none";
}
function abrir2(){
    document.getElementById("vent2").style.display="block";
    cerrar();
}
function cerrar2(){
    document.getElementById("vent2").style.display="none";
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
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
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


this.sessionStorage.inicio=false;
function inicioSesion(){
  if(sessionStorage.inicio==true){
    console.log(sessionStorage.inicio);
    alert("mandar al ejercicio");
    
    //window.location.href="IniciarSecion.html";
  }else{
    console.log(sessionStorage.inicio);
    window.location.href="IniciarSesion.html";
    //alert("no inicio secion");
  }
}

