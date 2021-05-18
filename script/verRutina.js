const dbE = firebase.firestore();
var dataE = "";
var datos = [];
var nivel = "";
var k = 0;
const sig = document.getElementById("botonSiguiente");
const ant = document.getElementById("botonAnterior");
var storage = firebase.storage();

function mostrarDatos() {


    var para = window.location.search.substr(1);
    var noms = para.split("=");
    var nombreEjercicios = noms[1].split("_");
    var nombreEjercicio = nombreEjercicios[0];
    nivel = nombreEjercicios[1];
    var nom = noms[1].replace("_", " ");

    document.getElementById("tipoRutinaID").innerHTML = nom;
    var repe = "";
    document.getElementById("repeticiones").innerHTML = "";
    if (nivel == "Principiante") {
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

async function consulta() {
    var i = 0;
    await dbE.collection('Agregar_Ejercicio').where("nivelE", "==", nivel)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
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
    var imgR = pru['imageRef'].replace(" ", "");
    var storageR = storage.ref(imgR);
    console.log(imgR);
    storageR.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

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
        var nombreSiguiente = datos[k];
        document.getElementById("nomID").innerHTML = nombreSiguiente['nombreE'];
        document.getElementById("descripcionID").innerHTML = nombreSiguiente['descripcion'];
        document.getElementById("botonAnterior").toggleAttribute('disabled', false);
        var imgR = nombreSiguiente['imageRef'].replace(" ", "");
        var storageR = storage.ref(imgR);
        console.log(imgR);
        storageR.getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

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
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

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