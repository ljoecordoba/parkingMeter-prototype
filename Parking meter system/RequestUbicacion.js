function loadDocUbicacion(url) 
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() 
  {
     //detecta si la pagina no existe (debido a si existe dicha patente)
    if(this.readyState = 4 && this.status >= 400 & this.status < 500)
    {
      var textnode = document.createTextNode("No se encontro conicidencia con ese codigo.");
      document.getElementById("divRespUbicacion").appendChild(textnode);
      var element = document.createElement("BR");
      document.getElementById("divRespUbicacion").appendChild(element);
    }
    //detecta si el servidor no responde
    else if(this.readyState = 4 && this.status >= 500 & this.status < 600)
    {
      var textnode = document.createTextNode("El servidor no responde.");
      document.getElementById("divRespUbicacion").appendChild(textnode);
      var element = document.createElement("BR");
      document.getElementById("divRespUbicacion").appendChild(element);
    }
    //esta OK para realizar el request
     else if (this.readyState == 4 && this.status == 200) 
    {
      //parsea el JSON de respuesta
      var obj = JSON.parse(this.responseText);
      var deposito = obj.deposito;
      //solamente lee infracciones definidas, para evitar traer datos inconsistentes
      //del servidor
      if(obj.infraccionId != undefined)
      {
        var info = "El vehiculo remolcado asociado a la infraccion " + obj.infraccionId + " esta ubicado en:";

        if(obj.deposito != undefined)
        {
          var msjDeposito = "Deposito: " + deposito.nombre;
          var msjDireccion = "Direccion: " + deposito.direccion;
          var msjTelefono = "Telefono: " + deposito.telefono;
          var msjHorarios = "Horarios: " + deposito.horarios;
        }
        mostrarResultadoUbicacionAcarreo(info,msjDeposito,msjDireccion,msjTelefono,msjHorarios);
      }  
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
//muestra la informacion del acarreo
function mostrarResultadoUbicacionAcarreo(info,msjDeposito,msjDireccion,msjTelefono,msjHorarios)
{
        var textnode = document.createTextNode(info);
        document.getElementById("divRespUbicacion").appendChild(textnode);
        var element = document.createElement("BR");
        document.getElementById("divRespUbicacion").appendChild(element);
        var textnode2 = document.createTextNode(msjDeposito);
        document.getElementById("divRespUbicacion").appendChild(textnode2);
        var element = document.createElement("BR");
        document.getElementById("divRespUbicacion").appendChild(element);
        var textnode3 = document.createTextNode(msjDireccion);
        document.getElementById("divRespUbicacion").appendChild(textnode3);
        var element = document.createElement("BR");
        document.getElementById("divRespUbicacion").appendChild(element);
        var textnode4 = document.createTextNode(msjTelefono);
        document.getElementById("divRespUbicacion").appendChild(textnode4);
        var element = document.createElement("BR");
        document.getElementById("divRespUbicacion").appendChild(element);
        var textnode5 = document.createTextNode(msjHorarios);
        document.getElementById("divRespUbicacion").appendChild(textnode5);
}