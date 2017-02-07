function loadDoc(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    //detecta si la pagina no existe (debido a si existe dicha patente)
    if(this.readyState = 4 && this.status >= 400 & this.status < 500)
    {
      var textnode = document.createTextNode("No se encontro coincidencia con ese codigo.");
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
      var infracciones = obj.infracciones;
      var table = document.createElement("TABLE");
      var numIncremental = 0;
      var row = table.insertRow(numIncremental);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      //contador de filas, se utiliza para agregar infracciones
      //como filas en la tabla creada.
      numIncremental++;

      //se agregan los encabezados de la tabla
      cell1.innerHTML = "<b>idInfraccion</b>";
      cell2.innerHTML = "<b>tipoInfraccion</b>";
      cell3.innerHTML = "<b>montoAPagar</b>";
      cell4.innerHTML = "<b>existeAcarreo</b>";

      for ( i = 0 ; i < infracciones.length ; i++)
      {
        if(infracciones[i].id != undefined)

        {
          //recolecto informacion sobre la infraccion Nº I
          var id = infracciones[i].id;
          var tipoInfraccion = infracciones[i].tipoInfraccion;
          var tipoInfraccion2 = determinarInfraccion(tipoInfraccion);
          var montoAPagar = infracciones[i].montoAPagar;
          var existeAcarreo = infracciones[i].existeAcarreo;
          var acarreo;
          if(existeAcarreo)
          {
            acarreo = "si";
          }
          else
          {
            acarreo = "no";
          }

          //creo los registros de la fila con la infraccion
          var rowA = table.insertRow(numIncremental);
          var cell1A = rowA.insertCell(0);
          var cell2A = rowA.insertCell(1);
          var cell3A = rowA.insertCell(2);
          var cell4A = rowA.insertCell(3);
          //si la infraccion es con acarreo agrego un boton extra como acceso rapido
          //para determinar la ubicacion del vehiculo
          if(existeAcarreo)
          {
            var cell5A = rowA.insertCell(4);
            cell5A.innerHTML = "<button onclick="+"requestUbicacion2("+id+");"+">Consultar Informacion acarreo</button>";
            cell5A.style.border = "none";

          }
          //agrego datos de los registros a la fila
          cell1A.innerHTML = id;
          cell2A.innerHTML = tipoInfraccion2;
          cell3A.innerHTML = montoAPagar;
          cell4A.innerHTML = acarreo;
          numIncremental++;
        }
       
      }
      document.getElementById("divInterno2").appendChild(table);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

//determina el tipo de infraccion, recibe un id infraccion como parametro
//y busca dentro de la base de datos de infraccionesYA dicha descripcion
function determinarInfraccion(numero){
var xmlhttp = new XMLHttpRequest();
var url = "https://infraccionesya.herokuapp.com/api/tiposInfraccion/" + numero +"/";
var descripcion;

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        descripcion = myArr.descripcion;
    }
};
xmlhttp.open("GET", url, false);
xmlhttp.send();

return descripcion;
}