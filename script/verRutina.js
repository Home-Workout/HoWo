const dbE = firebase.firestore();
var dataE = "";
var datos = [];
var datos2 = [];
var imagesBD = []
var nivel = "";
var k = 0;
const sig = document.getElementById("botonSiguiente");
const ant = document.getElementById("botonAnterior");
var storage = firebase.storage();
var areaF = "";
var sesion = false;
var nombreUs = "";
var querystring = window.location.search;

const params = new URLSearchParams(querystring);
window.addEventListener('load', function() {
    querystring = window.location.search.substr(1);
    //console.log(querystring) // '?q=pisos+en+barcelona&ciudad=Barcelona'

    // usando el querystring, creamos un objeto del tipo URLSearchParams
    // const params = new URLSearchParams(querystring);
    sesion = params.get('sesion');
    nombreUs = params.get('nombre');
    document.getElementById("nombre").innerHTML = nombreUs;
});

function mostrarDatos() {

    nivel = params.get('nivel');
    var nom = params.get('ruti');
    var nombresI = nom.split(' ');
    areaF = nombresI[0];
    var noms = nom.replace("_", " ");
    document.getElementById("tipoRutinaID").innerHTML = noms;

    var repe = "";
    document.getElementById("repeticiones").innerHTML = "";
    if (nivel == "Principiante") {
        repe = "3x8->3 sets de 8 repeticiones";
        numEjercicios = 4;
    } else {
        if (nivel == "Avanzado") {
            repe = "4x12->4 sets de 12 repeticiones";
            numEjercicios = 4;
        } else {
            repe = "4x10->4 sets de 10 repeticiones";
            numEjercicios = 4;
        }
    }

    document.getElementById("repeticiones").innerHTML = repe;

}

async function consulta() {
    document.getElementById("botonEmpezar").toggleAttribute('disabled', true);
    var i = 0;
    await dbE.collection('Agregar_Ejercicio').where("nivelE", "==", nivel).where("areaT", "==", areaF)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datos[i] = doc.data();
                console.log(doc.data)
                i++;
            });
        })
    console.log(datos);
    /*for(var j=0;j<datos.length;j++){

    }*/
    var pru = datos[0];
    document.getElementById("nomID").innerHTML = pru['nombreE'];
    document.getElementById("descripcionID").innerHTML = pru['descripcion'];

    document.getElementById("botonSiguiente").toggleAttribute('disabled', false);
    document.getElementById("botonVideo").toggleAttribute('disabled', false);

    var imgR = pru['imageRef'].replace(" ", "");
    var storageR = storage.ref(imgR);
    console.log(imgR);
    console.log("Numero ej " + numEjercicios)
    var datosR = [];
    for (var m = 0; m < numEjercicios; m++) {
        datosR[m] = datos[m];
    }
    datos = datosR;
    console.log(datos);
    storageR.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // Or inserted into an <img> element:
        var img = document.getElementById('imgID');
        img.src = url;
    }).catch(function(error) {
        // Handle any errors
    });
    document.getElementById("botonEmpezar").style.display = "none";

}

function avanzar() {
    if (k < datos.length - 1) {
        k++;
        cerrarLink();
        var nombreSiguiente = datos[k];
        document.getElementById("nomID").innerHTML = nombreSiguiente['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreSiguiente['descripcion'];
        document.getElementById("botonAnterior").toggleAttribute('disabled', false);
        var imgR = nombreSiguiente['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        storageR.getDownloadURL().then(function(url) {

            // Or inserted into an <img> element:
            var img = document.getElementById('imgID');
            img.src = url;
        }).catch(function(error) {
            // Handle any errors
        });
        if (k == datos.length - 1) {
            document.getElementById("botonSiguiente").toggleAttribute('disabled', true);
        }
    }
}

function retroceder() {
    if (k > 0) {
        k--;
        cerrarLink();
        console.log(k);
        var nombreAnterior = datos[k];
        document.getElementById("nomID").innerHTML = nombreAnterior['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreAnterior['descripcion'];
        document.getElementById("botonSiguiente").toggleAttribute('disabled', false);
        var imgR = nombreAnterior['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        storageR.getDownloadURL().then(function(url) {

            // Or inserted into an <img> element:
            var img = document.getElementById('imgID');
            img.src = url;
        }).catch(function(error) {
            // Handle any errors
        });
        if (k == 0) {
            document.getElementById("botonAnterior").toggleAttribute('disabled', true);
        }
    }
}

function home() {
    var r = "?sesion=true&nombre=" + nombreUs;
    window.location.href = "index.php" + r;
}


async function abrirLink() {
    document.getElementById("linkVideo").style.display = "block";
    var linkVideo = datos[k];
    document.getElementById("videoLink").innerHTML = linkVideo['linkV'];

}

function cerrarLink() {
    document.getElementById("linkVideo").style.display = "none";
}