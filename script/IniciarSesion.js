const correo = document.getElementById("correo");
const contraseña = document.getElementById("contraseña");
const peligro = document.getElementById("peligro");
const iniciar = document.getElementById("iniciar");
//const parrafo = document.getElementById("enviado");

var nombreUsuario="";
const db = firebase.firestore();

function mostrar() {
    var tipo = document.getElementById("contraseña");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}

var val = 0;

function validateForm() {
    var form = document.forms;
    var al = "Favor Ingresar Correo Electronico";
    var al2 = "Favor Ingresar Contraseña";

    if (correo.value == "") {
        document.getElementById("alerta").innerHTML = "Favor Ingresar Correo Electronico";
        correo.style.backgroundColor = "lightcoral";
        correo.focus();
        val++;
        return false;
    } else if (validarCorreo(correo.value) == false) {
        document.getElementById("alerta").innerHTML = "Ingresar un Correo Valido";
        correo.style.backgroundColor = "lightcoral";
        correo.value = "";
        correo.focus();
        val++;
        return false;
    } else {
        correo.style.backgroundColor = "MEDIUMSEAGREEN";
        document.getElementById("alerta").innerHTML = "";
    }
    if (contraseña.value == "") {
        document.getElementById("alerta").innerHTML = "Favor Ingresar Contraseña";
        contraseña.style.backgroundColor = "lightcoral";
        contraseña.value = "";
        contraseña.focus();
        val++;
        return false;

    } else {
        contraseña.style.backgroundColor = "MEDIUMSEAGREEN";
        document.getElementById("alerta").innerHTML = "";
    }

}

function loginF(){

    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;

     db.collection("Registrar_Usuario").where("correoU", "==", correo).where("passU","==",contraseña)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                nombreUsuario=doc.data().nombreU;
                console.log(nombreUsuario,"gg");
                var texto="../public/index.html?sesion=true&nombre="+nombreUsuario;
                window.location.href = texto;
            console.log(nombreUsuario);
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });


    /*firebase.auth().signInWithEmailAndPassword(correo, contraseña)
  .then((userCredential) => {
    // Signed in
   // alert("autenticacion correcta");
    //console.log(sessionStorage.inicio);
    //sessionStorage.inicio=true;
   // console.log(sessionStorage.inicio);
    //console.log(window.sessionStorage.inicio);
    //window.location.href="index.html";
    window.location.href = "../public/index.html?sesion=true"
    
    //var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });*/
    
}

function limpiarCampos() {
    correo.value = "";
    contraseña.value = "";
    correo.style.backgroundColor = "#5f6469";
    contraseña.style.backgroundColor = "#5f6469";

}

function validarCorreo(parametro) {
    var patron = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!patron.test(parametro)) {
        return false;
    } else {
        return true;
    }
}

function validacionBoton() {
    if (val == 0) {
        iniciar.toggleAttribute('disabled', false);
        return true;
    } else {
        val = 0;
        iniciar.toggleAttribute('disabled', true);
        return false;
    }
}

window.onbeforeunload = function () {
    return "¿Desea recargar la página web?";
};

document.getElementById("correo").addEventListener("keyup", validacionBoton);
document.getElementById("contraseña").addEventListener("keyup", validacionBoton);

