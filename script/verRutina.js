function mostrarDatos() {


    var para = window.location.search.substr(1);
    var noms = para.split("=");
    var nom = noms[1].replace("_", " ");

    //alert(nom);

    document.getElementById("tipoRutinaID").innerHTML = nom;


}

function home() {
    window.location.href = "../public/index.html"
}