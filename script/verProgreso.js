const db = firebase.firestore();

var sesion=false;
var nombreUsuario="";
var fec=new Date();
var numEn=0;
var registro=[new Map()];
var correoUs='@gmail.com';
let basico=[];
let intermedio=[];
let avanzado=[];

var querystring = window.location.search;
const params = new URLSearchParams(querystring);
window.addEventListener('load', function() {
    querystring = window.location.search.substr(1);
    sesion = params.get('sesion');
    nombreUsuario = params.get('nombre');
    correoUs = params.get('correo');
    //document.getElementById("nombre").innerHTML = nombreUsuario;
    obtenerdatos();
});
function obtenerdatos(){
    db.collection("Registrar_Usuario").where("correoU", "==",correoUs)
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
                var i=0;
                var j=0;
                var k=0;

                registro.forEach(element => {
                    console.log(element.nivel);
                    console.log(element.area);
                    if(element.nivel=='Principiante'){
                        basico[i]=element;
                        i++;

                    }
                    if(element.nivel=='Intermedio'){
                        intermedio[j]=element;
                        j++;

                    }
                    if(element.nivel=='Avanzado'){
                        avanzado[k]=element;
                        k++;

                    }
                    
                });
                console.log(registro.length);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}
function filterSelection(c){    

            //var aux=registro[0].nivel;
            if(c=='Basico'){
                console.log(basico);
            //console.log(basico[1].nivel);
            //codigo para mostrar principiante

            }
            if(c=='Intermedio'){
                console.log(intermedio);
            //console.log(basico[1].nivel);
            //codigo para mostrar intermedio

            }
            if(c=='Avanzado'){
                console.log(avanzado);
            //console.log(basico[1].nivel);
            //codigo para mostrar avanzado

            }
            //console.log(basico);
            
}