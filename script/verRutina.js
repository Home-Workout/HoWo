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
    await storageR.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // Or inserted into an <img> element:
        var img = document.getElementById('imgID');
        img.src = url;
    }).catch(function(error) {
        // Handle any errors
    });
    document.getElementById("nomID").innerHTML = pru['nombreE'];
    document.getElementById("descripcionID").innerHTML = pru['descripcion'];
    document.getElementById("botonEmpezar").style.display = "none";

}

async function avanzar() {
    if (k < datos.length - 1) {
        k++;
        cerrarLink();
        var nombreSiguiente = datos[k];

        document.getElementById("botonAnterior").toggleAttribute('disabled', false);
        var imgR = nombreSiguiente['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        await storageR.getDownloadURL().then(function(url) {

            // Or inserted into an <img> element:
            document.getElementById("botonSiguiente").toggleAttribute('disabled', true);
            var img = document.getElementById('imgID');
            img.src = url;

        }).catch(function(error) {
            // Handle any errors
        });
        document.getElementById("botonSiguiente").toggleAttribute('disabled', false);
        document.getElementById("nomID").innerHTML = nombreSiguiente['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreSiguiente['descripcion'];

    } else {
        document.getElementById("botonSiguiente").toggleAttribute('disabled', true);
        await swal({
            title: "Yeah!",
            text: "Rutina Terminada",
            type: "success",
            closeOnClickOutside: false,
        });
        home();
    }
}

async function retroceder() {
    if (k > 0) {
        k--;
        cerrarLink();
        console.log(k);
        var nombreAnterior = datos[k];

        document.getElementById("botonSiguiente").toggleAttribute('disabled', false);
        var imgR = nombreAnterior['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        await storageR.getDownloadURL().then(function(url) {
            document.getElementById("botonAnterior").toggleAttribute('disabled', true);
            // Or inserted into an <img> element:
            var img = document.getElementById('imgID');
            img.src = url;
        }).catch(function(error) {
            // Handle any errors
        });
        document.getElementById("nomID").innerHTML = nombreAnterior['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreAnterior['descripcion'];
        document.getElementById("botonAnterior").toggleAttribute('disabled', false);
        if (k == 0) {
            document.getElementById("botonAnterior").toggleAttribute('disabled', true);
        }
    }
}

function home() {
    var r = "?sesion=true&nombre=" + nombreUs;
    window.location.href = "index.php" + r;
}

function homeSalir() {
    swal({
            title: "¿Está seguro de salir?",
            text: "No completó la rutina!",
            icon: "warning",
            buttons:['No','Si'],          
            //buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
        })
        .then((willDelete) => {
            if (willDelete) {
                var r = "?sesion=true&nombre=" + nombreUs;
                window.location.href = "index.php" + r;
            } else {

            }
        });

}

async function abrirLink() {
    document.getElementById("linkVideo").style.display = "block";
    var linkVideo = datos[k];
    document.getElementById("videoLink").innerHTML = linkVideo['linkV'];
    //window.open(linkVideo['linkV'], 'Video');

}

function getLink() {
    var linkVideo = datos[k];
    //window.open(linkVideo['linkV'], 'Video');
    return linkVideo['linkV'];
}

function irLinkV() {
    var linkVideo = datos[k];
    window.open(linkVideo['linkV'], 'Video');
}

function cerrarLink() {
    document.getElementById("linkVideo").style.display = "none";
}