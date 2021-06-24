const correo = document.getElementById("correo");
async function recuperar() {
    var auth = firebase.auth();
    var emailAddress = document.getElementById('correo').value;
    contraseña = "contra";
    var dbE = firebase.firestore();
    var existe = false;
    if (!validarCorreo(emailAddress)) {
        swal({
                title: "¡Correo Inválido!",
                text: "Ingrese un correo válido",
                icon: "warning",
                button: 'Aceptar',
                //button: ,
                dangerMode: true,
                closeOnClickOutside: false,
            })
            .then((willDelete) => {
                if (willDelete) {
                    document.getElementById('correo').value = "";
                } else {

                }
            });
    } else {
        await dbE.collection("Registrar_Usuario").where("correoU", "==", emailAddress)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    existe = true;
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        if (existe) {
            await auth.sendPasswordResetEmail(emailAddress).then(function() {
                // Email sent.
                swal({
                        title: "Se envió un correo de recuperación",
                        text: "Revisa tu buzón de entrada",
                        icon: "success",
                        button: 'Aceptar',
                        //button: ,
                        dangerMode: true,
                        closeOnClickOutside: false,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            document.getElementById('correo').value = "";
                        } else {

                        }
                    });
                console.log("Email enviado");
            }).catch(function(error) {
                // An error happened.



            });
        } else {
            swal({
                    title: "¡No existe el correo!",
                    text: "Revise su dirección electrónico",
                    icon: "warning",
                    button: 'Aceptar',
                    //button: ,
                    dangerMode: true,
                    closeOnClickOutside: false,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        document.getElementById('correo').value = "";
                    } else {

                    }
                });
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
}