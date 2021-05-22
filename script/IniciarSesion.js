const correo = document.getElementById("correo");
const contraseña = document.getElementById("contraseña");
const peligro = document.getElementById("peligro");
const iniciar = document.getElementById("iniciar");
//const parrafo = document.getElementById("enviado");

var nombreUsuario = "";
const db = firebase.firestore();
var flag = false;

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

    if (correo.value == "" || correo.value.length > 30) {
        document.getElementById("alerta").innerHTML = "Favor Ingresar Correo Electronico o con menos de 30 caracteres";
        correo.style.backgroundColor = "lightcoral";
        correo.focus();
        val++;
        return false;
    } else if (validarCorreo(correo.value) == false) {
        document.getElementById("alerta").innerHTML = "Ingresar un Correo Valido o con menos de 30 caracteres";
        correo.style.backgroundColor = "lightcoral";
        correo.value = "";
        correo.focus();
        val++;
        return false;
    } else {
        correo.style.backgroundColor = "MEDIUMSEAGREEN";
        document.getElementById("alerta").innerHTML = "";
    }
    if (contraseña.value == "" || contraseña.value.length > 30) {
        document.getElementById("alerta").innerHTML = "Favor Ingresar Contraseña o con menos de 30 caracteres";
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

document.getElementById("iniciar").addEventListener("click", async(e) => {

    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;
    if (validacionBoton()) {
        await db.collection("Registrar_Usuario").where("correoU", "==", correo)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().passU == contraseña) {
                        flag = true;
                        nombreUsuario = doc.data().nombreU;
                    }
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        console.log(flag);
        if (flag) {
            console.log(nombreUsuario, "gg");
            var texto = "index.php?sesion=true&nombre=" + nombreUsuario;
            window.location.href = texto;
            console.log(nombreUsuario, "gg");
            document.getElementById("correo").style.backgroundColor = "MEDIUMSEAGREEN";
            document.getElementById("contraseña").style.backgroundColor = "MEDIUMSEAGREEN";
            document.getElementById("alerta").innerHTML = "";
        } else {
            document.getElementById("correo").style.backgroundColor = "red";
            document.getElementById("contraseña").style.backgroundColor = "red";
            document.getElementById("alerta").innerHTML = "Correo o Contraseña Incorrecta";
            swal("Oops!", "Usted no esta registrado", "error");

        }
    }
});

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
function irARegistrarse(){
    window.location.href = "registrarse.php";
}

window.onbeforeunload = function() {
    if (!flag) {
        return "¿Desea recargar la página web?";
    }

};

document.getElementById("correo").addEventListener("keyup", validacionBoton);
document.getElementById("contraseña").addEventListener("keyup", validacionBoton);