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
    return nombre && descripcion
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
    if (validateForm() && imageRef != " ") {
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
        alert("No se agrego");
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