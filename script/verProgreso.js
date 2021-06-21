const db = firebase.firestore();
var nombreUsuario="";
var fec=new Date();
var numEn=0;
var registro=[];
var correoUs='h@gmail.com';
function filterSelection(c){
     db.collection("Registrar_Usuario").where("correoU", "==",'h@gmail.com')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                        flag = true;
                        //passUsuario = doc.data().passU;
                        nombreUsuario = doc.data().nombreU;
                        fec= doc.data().fecRegistro;
                        correoUS=doc.data().correoU;
                        numEn=doc.data().numEntrenamiento;
                        registro=doc.data().Ejercicio;
                        console.log(registro[1].nivel);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

            var aux=registro[0];
            //console.log(registro[1]);
}