function mostrarDatos() {


    var para = window.location.search.substr(1);
    var noms = para.split("=");
    var nombreEjercicios = noms[1].split("_");
    var nombreEjercicio = nombreEjercicios[0];
    var nivel = nombreEjercicios[1];
    var nom = noms[1].replace("_", " ");

    document.getElementById("tipoRutinaID").innerHTML = nom;
    var repe = "";
    document.getElementById("repeticiones").innerHTML = "";
    if (nivel == "Basico") {
        repe = "3x8->3 sets de 8 repeticiones";
    } else {
        if (nivel == "Avanzado") {
            repe = "4x12->4 sets de 12 repeticiones";
        } else {
            repe = "4x10->4 sets de 10 repeticiones";
        }
    }

    document.getElementById("repeticiones").innerHTML = repe;

}

function home() {
    window.location.href = "../public/index.html"
}