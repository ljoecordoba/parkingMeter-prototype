//carga la vista del controlador
//dicha vista se mostrara en la pantalla 1
//ademas se ocultaran el resto de las vistas
function desabilitarTodasLasVistas()
{
	document.getElementById("divInterno2").innerHTML = "";
	document.getElementById("texto").value = "";
	document.getElementById("pantalla2").style.display = "none";
	document.getElementById("pantalla3").style.display = "none";
	document.getElementById("pantalla4").style.display = "none";
	document.getElementById("idDescripcion").style.display = "none";
	document.getElementById("pantalla1").style.display = "none";
	document.getElementById("divRespUbicacion").style.display = "none";
	document.getElementById("divRespUbicacion").innerHTML = "";
}

function cargarVistaControlador()
{
	desabilitarTodasLasVistas();
	document.getElementById("pantalla1").style.display = "inline";
	cargarMapaControlador();
}
//carga la vista del usuario
//dicha vista se mostrara en la pantalla 2
//ademas se ocultaran el resto de las vistas
function cargarVistaUsuario()
{
	desabilitarTodasLasVistas();
	document.getElementById("pantalla2").style.display = "inline";
	cargarMapaUsuario();
}
//carga la vista de las infracciones
//dicha vista se mostrara en la pantalla 3
//ademas se ocultaran el resto de las vistas
function cargarVistaInfracciones()

{
	desabilitarTodasLasVistas();
	document.getElementById("pantalla3").style.display = "inline";
}
//borra campos de busqueda de la pantalla infraccion
function borrarCamposBusquedaInfraccion()
{
	document.getElementById("divInterno2").innerHTML = "";
	document.getElementById("texto").value = "";
}
//realiza la busqueda de las infracciones
//para ello utiliza la patente descripta en el textBox
function accion()
{
	var val = document.getElementById("texto").value;
	var url = "https://infraccionesya.herokuapp.com/api/"+val+"/infracciones/";
	borrarCamposBusquedaInfraccion();
	loadDoc(url);
}
//borra campos de busqueda de la pantalla acarreo
function borrarCamposBusquedaAcarreo()
{
	document.getElementById("divRespUbicacion").innerHTML = "";
	document.getElementById("idInfraccion").value = "";
}

// realiza una busqueda del acarreo asociado a una multa
//para ello utiliza la id descripta en el textBox
function requestUbicacion()
{
	var val = document.getElementById("idInfraccion").value;
	var url = "https://infraccionesya.herokuapp.com/api/acarreo/"+val;
	borrarCamposBusquedaAcarreo();
	loadDocUbicacion(url);
}
// realiza una busqueda del acarreo asociado a una multa
//para ello utiliza la id pasada como parametro
function requestUbicacion2(id)
{

	var idInfraccion = id;
	cargarVistaAcarreo();

	var url = "https://infraccionesya.herokuapp.com/api/acarreo/"+idInfraccion;
	borrarCamposBusquedaAcarreo();
	loadDocUbicacion(url);

}
//carga la vista de acarreos
//dicha vista se mostrara en la pantalla 4
//ademas se ocultaran el resto de las vistas
function cargarVistaAcarreo()
{
	desabilitarTodasLasVistas();
	document.getElementById("pantalla4").style.display = "inline";
	document.getElementById("divRespUbicacion").style.display = "inline";
}
//prepara la pantalla para mostrar el mensaje de bienvenida
function mostrarDescripcion()
{
	desabilitarTodasLasVistas();
	document.getElementById("idDescripcion").style.display = "inline";
}