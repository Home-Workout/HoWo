const db = firebase.firestore();

var sesion = false;
var nombreUsuario = "";
var fec = new Date();
var numEn = 0;
var registro = [new Map()];
var correoUs = '@gmail.com';
let basico = [];
let intermedio = [];
let avanzado = [];

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

async function obtenerdatos() {
    await db.collection("Registrar_Usuario").where("correoU", "==", correoUs)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                flag = true;
                //passUsuario = doc.data().passU;
                nombreUsuario = doc.data().nombreU;
                fec = doc.data().fecRegistro;
                correoUS = doc.data().correoU;
                numEn = doc.data().numEntrenamiento;
                registro = doc.data().Ejercicio;
                var i = 0;
                var j = 0;
                var k = 0;
                const unixTime = fec;
                var date = new Date(unixTime * 1000);
                date = fecEspañol(date);

                var u = document.getElementById("iniSesion").innerHTML;

                document.getElementById('iniSesion').innerHTML = u + "  " + nombreUsuario;
                document.getElementById("entrenarI").innerHTML = document.getElementById("entrenarI").innerHTML + " " + numEn;
                document.getElementById("fechaR").innerHTML = document.getElementById("fechaR").innerHTML + " " + date;

                registro.forEach(element => {
                    if (element.nivel == 'Principiante') {
                        basico[i] = element;
                        i++;

                    }
                    if (element.nivel == 'Intermedio') {
                        intermedio[j] = element;
                        j++;

                    }
                    if (element.nivel == 'Avanzado') {
                        avanzado[k] = element;
                        k++;

                    }

                });

            });

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        var num = 0
        deleteTable();
        basico.forEach(element => {
            num++
            const unixTime = element.fecha;
            var date = new Date(unixTime * 1000);
            date = fecEspañol(date);
            newRowTable(num, element.nivel, element.area, date.toString());
            document.getElementById("bas").style.backgroundColor="#003566";
            document.getElementById("interme").style.backgroundColor="#7a838523";
            document.getElementById("avan").style.backgroundColor="#7a838523";
        });
}

var numero = 0

function filterSelection(c) {
    //var aux=registro[0].nivel;
    if (c == 'Basico') {
        deleteTable();
        basico.forEach(element => {
            numero++
            const unixTime = element.fecha;
            var date = new Date(unixTime * 1000);
            date = fecEspañol(date);
            newRowTable(numero, element.nivel, element.area, date.toString());
            document.getElementById("bas").style.backgroundColor="#003566";
            document.getElementById("interme").style.backgroundColor="#7a838523";
            document.getElementById("avan").style.backgroundColor="#7a838523";
        });

    }
    if (c == 'Intermedio') {
        deleteTable();
        intermedio.forEach(element => {
            numero++
            const unixTime = element.fecha;
            var date = new Date(unixTime * 1000);
            date = fecEspañol(date);
            newRowTable(numero, element.nivel, element.area, date.toString());
            document.getElementById("bas").style.backgroundColor="#7a838523";
            document.getElementById("interme").style.backgroundColor="#003566";
            document.getElementById("avan").style.backgroundColor="#7a838523";
        });

    }
    if (c == 'Avanzado') {
        deleteTable();
        avanzado.forEach(element => {
            numero++
            const unixTime = element.fecha;
            var date = new Date(unixTime * 1000);
            date = fecEspañol(date);
            newRowTable(numero, element.nivel, element.area, date.toString());
            document.getElementById("bas").style.backgroundColor="#7a838523";
            document.getElementById("interme").style.backgroundColor="#7a838523";
            document.getElementById("avan").style.backgroundColor="#003566";
        });
    }

}


function newRowTable(Numero, Nivel, Area, Fecha) {
    var Nro = Numero;
    var NIVEL = Nivel;
    var AREA_CORPORAL = Area;
    var FECHA = Fecha;

    var name_table = document.getElementById("rutinasRealizadas");

    var row = name_table.insertRow(0 + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = '<p name ="Nro_f[]" class = "non_margin">' + Nro + '</p>';
    cell2.innerHTML = '<p name ="NIVEL_p[]" class = "non_margin">' + NIVEL + '</p>';
    cell3.innerHTML = '<p name ="AREA_CORPORAL_p[]" class = "non_margin">' + AREA_CORPORAL + '</p>';
    cell4.innerHTML = '<p name ="FECHA_p[]" class = "non_margin">' + FECHA + '</p>';

}

function deleteTable() {
    numero = 0
    var tableHeaderRowCount = 1;
    var table = document.getElementById('rutinasRealizadas');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

function home() {

    var r = "?sesion=true&nombre=" + nombreUsuario + "&correo=" + correoUs;
    window.location.href = "index.php" + r;
}

function fecEspañol(fec) {
    fec.setFullYear(fec.getFullYear() - 1969);
    var dtf = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "full",
        timeStyle: "full"
    }).format(fec);
    return dtf;

}