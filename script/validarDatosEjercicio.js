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