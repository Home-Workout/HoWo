const correo = document.getElementById("correo");
async function recuperar(){
    var auth = firebase.auth();
    var emailAddress = document.getElementById('correo').value;

    await auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
    }).catch(function(error) {
    // An error happened.
    });
}