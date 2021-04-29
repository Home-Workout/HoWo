
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
}
function cerrar(){
    document.getElementById("vent").style.display="none";
}
function abrir2(){
    document.getElementById("vent2").style.display="block";
}
function cerrar2(){
    document.getElementById("vent2").style.display="none";
}
