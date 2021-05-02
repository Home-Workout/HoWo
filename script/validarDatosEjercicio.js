const dbE = firebase.firestore();
var buenaImg = false;
var buenVideo = false;

function validateForm() {
    var campoNombre = document.forms["formularioEjercicio"]["eName"].value;
    var campoDescripcion = document.forms["formularioEjercicio"]["eName"].value;
    var patt1 = /[0-9]{1,40}$/; //no acepta numeros
    var nombre = true;
    var descripcion = true;
    if (campoNombre.match(patt1) || campoNombre == "") {
        alert("El campo nombre no acepta numeros o esta vacio");
        nombre = false;
    }
    else if(validarTexto(campoNombre) == false){
        alert("El campo nombre no acepta caracteres especiales ni mas de 150 caracteres");
        nombre = false;  
    }
    if (campoDescripcion.match(patt1) || campoDescripcion == "") {
        alert("El campo descripcion no acepta numeros o esta vacio");
        descripcion = false;
    }
    return nombre && descripcion
}

function validateFileType() {
    var fileName = document.getElementById("image").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif" || extFile == "bmp") {
        buenaImg = true;
    } else {
        buenaImg = false;
        alert("Solo se permiten archivos en formato: jpg,jpeg,png,bmp y gif");
        document.getElementById("image").value = "";
    }
    return buenaImg
}

function validateVideo() {
    var fileName = document.getElementById("video").value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == "mp4" || extFile == "mkv" || extFile == "wmv") {
        buenVideo = true;
    } else {
        buenVideo = false;
        alert("Solo se permiten archivos en formato: mp4,mkv y wmv");
        document.getElementById("video").value = "";
    }
    return buenaImg
}
document.getElementById("enviarEjercicio").addEventListener("click", async(e) => {
    const registroEjercicio = document.getElementById("formulario1");
    const nombreE = registroEjercicio["name1"].value;
    const descripcion = registroEjercicio["descripcion"].value;
    const imageRef = subirImagen();
    const videoRef = subirVideo();
    const linkV = registroEjercicio["linkVideo"].value;
    const nivelE = registroEjercicio["nivel"].value;
    const areaT = registroEjercicio["areaT"].value;


    e.preventDefault();
    if (validateForm()) {
        if (imageRef != " " && buenaImg) {
            const respuestaE = await dbE.collection("Agregar_Ejercicio").doc().set({
                nombreE,
                descripcion,
                imageRef,
                videoRef,
                linkV,
                nivelE,
                areaT
            })
            alert("Agregado Correctamente");
            document.getElementById("formulario1").reset();
            console.log(respuestaE)
        } else {
            alert("Debe agregar una imagen");
        }
    }

});



function subirImagen() {
    var referencia = " ";
    var image = document.getElementById("image").files[0];
    if (image != null) {
        var imageName = image.name;


        var storageRef = firebase.storage().ref('Imagenes/' + image.name);
        referencia = 'Imagenes/ ' + image.name;
        var uploadTask = storageRef.put(image);

        uploadTask.on('state_changed', function(snapshot) {

        })
    }
    return referencia

}

function subirVideo() {
    var referenciaVideo = " ";
    var video = document.getElementById("video").files[0];
    if (video != null) {
        var videoName = video.name;


        var storageRef = firebase.storage().ref('Videos/' + video.name);
        referenciaVideo = 'Videos/ ' + video.name;
        var uploadTask = storageRef.put(video);

        uploadTask.on('state_changed', function(snapshot) {

        })
    }
    return referenciaVideo
}
function validarTexto(parametro) {
    var patron = /^[a-zA-Z-s]{1,150}$/;
    if (parametro.search(patron)) {
        return false;
    } else {
        return true;
    }
}