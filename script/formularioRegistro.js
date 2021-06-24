const nombre = document.getElementById("name1");
const correo = document.getElementById("correo");
const contrasenia = document.getElementById("contrasenia");
const contrasenia2 = document.getElementById("contrasenia2");
const peligro = document.getElementById("peligro");
const enviar = document.getElementById("enviar");
const parrafo = document.getElementById("enviado");


function mostrar(){
  var tipo = document.getElementById("contrasenia");
    if(tipo.type == "password"){
        tipo.type = "text";
    }else{
        tipo.type = "password";
    }
}
function mostrar2(){
    var tipo2 = document.getElementById("contrasenia2");
      if(tipo2.type == "password"){
          tipo2.type = "text";
      }else{
          tipo2.type = "password";
      }
  }
var val = 0;
const dbU = firebase.firestore();
const aut = firebase.auth();

function validarFormulario() {
    //alert("Todo en Orden");
    var formulario = document.forms;
    var al = 'Ingrese sus Nombres y Apellidos';
    var al2 = "Solo se permite Caracteres";
    var al3 = "Favor Ingresar Correo Electronico";
    var al4 = "Ingresar un Correo Valido";
    var al5 = "Favor Ingresar Contraseña";
    var al6 = "Las Contraseñas son distintas";
    if (nombre.value == "") {
        //alert("Favor Ingresar Nombre y Apellido")
        document.getElementById("alerta").innerHTML = "Ingrese sus Nombres y Apellidos";
        nombre.style.backgroundColor = "red";
        nombre.focus();
        val++;
        return false;
    } else if (validarTexto(nombre.value) == false) {
        document.getElementById("alerta").innerHTML = "Solo se permite Caracteres y menos de 150 caracteres";
        nombre.style.backgroundColor = "red";
        nombre.value = "";
        nombre.focus();
        val++;
        return false;
    } else {
        error1 = false;
        nombre.style.backgroundColor = "green";
        document.getElementById("alerta").innerHTML = "";
    }
    if (correo.value == "") {
        //alert("HOla peep");
        document.getElementById("alerta").innerHTML = "Favor Ingresar Correo Electronico";
        correo.style.backgroundColor = "red";
        correo.focus();
        val++;
        return false;
    } else if (validarCorreo(correo.value) == false) {
        document.getElementById("alerta").innerHTML = "Ingresar un Correo Valido";
        correo.style.backgroundColor = "red";
        correo.value = "";
        correo.focus();
        val++;
        return false;
    } else {
        correo.style.backgroundColor = "green";
        document.getElementById("alerta").innerHTML = "";
    }
    if (contrasenia.value == "") {
        document.getElementById("alerta").innerHTML = "Favor Ingresar Contraseña";
        contrasenia.style.backgroundColor = "red";
        contrasenia.value = "";
        contrasenia.focus();
        val++;
        return false;

    } else {
        contrasenia.style.backgroundColor = "green";
        document.getElementById("alerta").innerHTML = "";
    }
    if (contrasenia2.value == "") {
        document.getElementById("alerta").innerHTML = "Favor Ingresar Contraseña";
        contrasenia2.style.backgroundColor = "red";
        contrasenia2.value = "";
        contrasenia2.focus();
        val++;
        return false;

    } else {
        contrasenia2.style.backgroundColor = "green";
        document.getElementById("alerta").innerHTML = "";
    }
    if (contrasenia.value != contrasenia2.value) {
        document.getElementById("alerta").innerHTML = "Las Contraseñas son distintas";
        contrasenia.style.backgroundColor = "red";
        contrasenia2.style.backgroundColor = "red";
        contrasenia.value = "";
        contrasenia2.value = "";
        contrasenia.focus();
        val++;
        return false;
    } else {
        contrasenia.style.backgroundColor = "green";
        contrasenia2.style.backgroundColor = "green";
        document.getElementById("alerta").innerHTML = "";
    }


}
function limpiarCampos(){
    nombre.value = "";
    correo.value = "";
    contrasenia.value = "";
    contrasenia2.value = "";
    nombre.style.backgroundColor = "#5f6469";
    correo.style.backgroundColor = "#5f6469";
    contrasenia.style.backgroundColor = "#5f6469";
    contrasenia2.style.backgroundColor = "#5f6469";
}

function validarTexto(parametro) {
    var patron = /^[a-zA-Z-\s]{1,150}$/;
    if (parametro.search(patron)) {
        return false;
    } else {
        return true;
    }
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
        enviar.toggleAttribute('disabled', false);
        return true;
    } else {
        val = 0;
        enviar.toggleAttribute('disabled', true);
        return false;
    }
}
function validarCorreo2(){
    const getTask = () => dbU.collection('Registrar_Usuario').get();
        const task = getTask();
        console.log(task);
        //if(correo = task.correoU){
        //    return true
        //}else{return false;}
}
window.onbeforeunload = function() {
    return "¿Desea recargar la página web?";
  };

document.getElementById("name1").addEventListener("keyup", validacionBoton);
document.getElementById("correo").addEventListener("keyup", validacionBoton);
document.getElementById("contrasenia").addEventListener("keyup", validacionBoton);
document.getElementById("contrasenia2").addEventListener("keyup", validacionBoton);



document.getElementById("enviar").addEventListener("click", async(e) => {
    //aqui tiene que redirigir a la parte principal por lo pronto solo mostrara un mensaje
    const registroUsuario = document.getElementById("formulario1");

    const nombreU = registroUsuario["name1"].value;
    const correoU = registroUsuario["correo"].value;
    const passU = registroUsuario["contrasenia"].value;

    e.preventDefault();
        if (validacionBoton()) {
            var usuarios = dbU.collection('Registrar_Usuario')
            var flag = 0;
            await dbU.collection('Registrar_Usuario').where("correoU", "==", correoU)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                flag = flag+1;
            });
        })
        .catch((error) => {
        console.log("Error getting documents: ", error);
        })
        console.log(flag);
            if(flag==0){
                parrafo.innerHTML = "Usted se ha registrado correctamente";
                limpiarCampos();
                const responseU = await dbU.collection('Registrar_Usuario').doc().set({
                    nombreU,
                    correoU,
                    passU
                })
               
                //console.log(responseU);
                await firebase.auth().createUserWithEmailAndPassword(correoU, passU)
                    .then((userCredential) => {
                    // Signed in
                    
                    var user = userCredential.user;
                    console.log(user);

                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });
                parrafo.innerHTML="";
                window.location.href = "IniciarSesion.php";

                
            }else{ 
                limpiarCampos();
                parrafo.innerHTML = "Ya existe ese correo";
            }
    }
});