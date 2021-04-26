const dbE = firebase.firestore(); 
function validateForm() {
    var campoNombre = document.forms["formularioEjercicio"]["eName"].value;
    var campoDescripcion = document.forms["formularioEjercicio"]["eName"].value;
    var patt1 = /[0-9]{1,40}$/; //no acepta numeros
    var nombre = true;
    var descripcion = true;
    if (campoNombre.match(patt1)) {
        alert("El campo nombre no acepta numeros");
        nombre = false;
    }
    if (campoDescripcion.match(patt1)) {
        alert("El campo descripcion no acepta numeros");
        descripcion = false;
    }

    if (nombre && descripcion) {
        alert("Agregado correctamente");
        document.forms.reset;
    }

}
document.getElementById("enviarEjercicio").addEventListener("click", async(e)=> {
    const registroEjercicio = document.getElementById("formulario1");
    const nombreE = registroEjercicio["name1"].value;
    const descripcion = registroEjercicio["descripcion"].value;
    const imageRef = subirImagen();
    const videoRef = subirVideo();
    const linkV = registroEjercicio["linkVideo"].value;
    const nivelE = registroEjercicio["nivel"].value;
    const areaT = registroEjercicio["areaT"].value;


    e.preventDefault();
    
    const respuestaE = await dbE.collection("Agregar_Ejercicio").doc().set({
        nombreE, 
        descripcion,
        imageRef,
        videoRef,
        linkV,
        nivelE,
        areaT



    })

    console.log(respuestaE)

});

function subirImagen() {

    var image = document.getElementById("image").files[0];

    var imageName = image.name;


    var storageRef = firebase.storage().ref('Imagenes/' + image.name);
    var referencia = 'Imagenes/ ' + image.name;
    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function (snapshot) {

    }
    )
    return referencia
    
}

function subirVideo() {

    var video = document.getElementById("video").files[0];

    var videoName = video.name;


    var storageRef = firebase.storage().ref('Videos/' + video.name);
    var referenciaVideo = 'Videos/ ' + video.name;
    var uploadTask = storageRef.put(video);

    uploadTask.on('state_changed', function (snapshot) {

    }
    )
    return referenciaVideo
}
