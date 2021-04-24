
    const nombre = document.getElementById("name1");
    const correo = document.getElementById("correo"); 
    const contrasenia = document.getElementById("contrasenia");
    const contrasenia2 = document.getElementById("contrasenia2");
    const peligro = document.getElementById("peligro");
    const enviar = document.getElementById("enviar");
    var val = 0;
    function validarFormulario(){
        //alert("Todo en Orden");
        var formulario = document.forms;
        var al = 'Ingrese sus Nombres y Apellidos<br>';
        var al2 = "Solo se permite Caracteres";
        var al3 = "Favor Ingresar Correo Electronico";
        var al4 = "Ingresar un Correo Valido";
        var al5 = "Favor Ingresar Contraseña";
        var al6 = "Las Contraseñas son distintas";
        if(nombre.value == ""){
            //alert("Favor Ingresar Nombre y Apellido")
            document.getElementById("alerta").innerHTML = al.fontsize(4).fontcolor("red");
            nombre.style.backgroundColor="red";
            nombre.focus();
            val++;
            return false;
        }else if(validarTexto(nombre.value) == false){
            document.getElementById("alerta").innerHTML = al2.fontsize(4).fontcolor("red");
            nombre.style.backgroundColor="red";
            nombre.value = "";
            nombre.focus();
            val++;
            return false; 
        }else{
            error1=false;
            nombre.style.backgroundColor="green";
            document.getElementById("alerta").innerHTML = "";
        }
        if(correo.value == ""){
            //alert("HOla peep");
            document.getElementById("alerta").innerHTML= al3.fontsize(4).fontcolor("red");
            correo.style.backgroundColor="red";
            correo.focus();
            val++;
            return false;
        }else if(validarCorreo(correo.value) == false){
            document.getElementById("alerta").innerHTML = al4.fontsize(4).fontcolor("red");
            correo.style.backgroundColor="red";
            correo.value = "";
            correo.focus();
            val++;
            return false; 
        }else{
            correo.style.backgroundColor="green";
            document.getElementById("alerta").innerHTML = "";
        }
        if(contrasenia.value == ""){
            document.getElementById("alerta").innerHTML= al5.fontsize(4).fontcolor("red");
            contrasenia.style.backgroundColor="red";
            contrasenia.value = "";
            contrasenia.focus();
            val++;
            return false;

        }else{
            contrasenia.style.backgroundColor="green";
            document.getElementById("alerta").innerHTML = "";
        }
        if(contrasenia2.value == ""){
            document.getElementById("alerta").innerHTML= al5.fontsize(4).fontcolor("red");
            contrasenia2.style.backgroundColor="red";
            contrasenia2.value = "";
            contrasenia2.focus();
            val++;
            return false;

        }else{
            contrasenia2.style.backgroundColor="green";
            document.getElementById("alerta").innerHTML = "";
        }
        if(contrasenia.value!= contrasenia2.value){
            document.getElementById("alerta").innerHTML= al6.fontsize(4).fontcolor("red");
            contrasenia.style.backgroundColor="red";
            contrasenia2.style.backgroundColor="red";
            contrasenia.value = "";
            contrasenia2.value = "";
            contrasenia.focus();
            val++;
            return false;
        }else{
            contrasenia.style.backgroundColor="green";
            contrasenia2.style.backgroundColor="green";
            document.getElementById("alerta").innerHTML = "";
        }
        
        formulario.submit();
    }
    function validarTexto(parametro){
        var patron = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
        if(parametro.search(patron)){
            return false;
        }else{
            return true;
        }
    }
    function validarCorreo(parametro){
        var patron = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(!patron.test(parametro)){
            return false;
        }else{
            return true;
        }
    }
    function validacionBoton(){
        if(val == 0){
            enviar.toggleAttribute('disabled',false);
        }else{
            val=0;
            enviar.toggleAttribute('disabled',true);
       }
    }
    document.getElementById("name1").addEventListener("keyup",validacionBoton);
    document.getElementById("correo").addEventListener("keyup",validacionBoton);
    document.getElementById("contrasenia").addEventListener("keyup",validacionBoton);
    document.getElementById("contrasenia2").addEventListener("keyup",validacionBoton);
    document.getElementById("enviar").addEventListener("click",()=>{
      //aqui tiene que redirigir a la parte principal
    });

