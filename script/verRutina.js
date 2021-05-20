const dbE = firebase.firestore();
var dataE = "";
var datos = [];
var imagesBD = []
var nivel = "";
var k = 0;
const sig = document.getElementById("botonSiguiente");
const ant = document.getElementById("botonAnterior");
var storage = firebase.storage();
var numEjercicios = 0;
var areaF = "";

function mostrarDatos() {


    var para = window.location.search.substr(1);
    var noms = para.split("=");
    var nombreEjercicios = noms[1].split("_");
    nivel = nombreEjercicios[1];
    var nom = noms[1].replace("_", " ");
    areaF = nombreEjercicios[0];

    document.getElementById("tipoRutinaID").innerHTML = nom;
    var repe = "";
    document.getElementById("repeticiones").innerHTML = "";
    if (nivel == "Principiante") {
        repe = "3x8->3 sets de 8 repeticiones";
        numEjercicios = 4;
    } else {
        if (nivel == "Avanzado") {
            repe = "4x12->4 sets de 12 repeticiones";
            numEjercicios = 6;
        } else {
            repe = "4x10->4 sets de 10 repeticiones";
            numEjercicios = 5;
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

}

function avanzar() {
    if (k < datos.length - 1) {
        k++;
        console.log(k);
        var nombreSiguiente = datos[k];
        document.getElementById("nomID").innerHTML = nombreSiguiente['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreSiguiente['descripcion'];
        document.getElementById("botonAnterior").toggleAttribute('disabled', false);
        var imgR = nombreSiguiente['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        console.log(imgR);
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
        console.log(k);
        var nombreAnterior = datos[k];
        document.getElementById("nomID").innerHTML = nombreAnterior['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreAnterior['descripcion'];
        document.getElementById("botonSiguiente").toggleAttribute('disabled', false);
        var imgR = nombreAnterior['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        console.log(imgR);
        storageR.getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:


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
    window.location.href = "../public/index.html"
}

function abrirLink() {
    document.getElementById("linkVideo").style.display = "block";
    var linkVideo = datos[0]; 
    document.getElementById("videoLink").innerHTML = linkVideo['linkV'];
}

function cerrarLink() {
    document.getElementById("linkVideo").style.display = "none";
}
