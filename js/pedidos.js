document.addEventListener('DOMContentLoaded', function () {
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, { edge: 'right' });
});

let contenidoLista = "";

db.collection("platillo").onSnapshot((datos) => {
    contenidoLista = "";

    datos.forEach((doc) => {
        agregarPlatillo(doc.data(), doc.id);
    });

    document.getElementById("listaPlatillo").innerHTML = contenidoLista;

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

function agregarPlatillo(platillo, id) {
    contenidoLista += `
        <option value="${id}">
            ${platillo.nombre}
        </option>
    `;

}document.getElementById("btnPedido").addEventListener("click", function () {

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;

    const select = document.getElementById("listaPlatillo");

    const platilloid = select.value;
    const platillo = select.options[select.selectedIndex].text;

    db.collection("pedidos").add({
        nombre: nombre,
        direccion: direccion,
        platilloid: platilloid
    });

    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("listaPlatillo").selectedIndex = 0;

    M.FormSelect.init(document.querySelectorAll('select'));

});
document.getElementById("posicion").addEventListener("click", function(){

    navigator.geolocation.getCurrentPosition(exito, error);

});


function exito(posicion) {
  let latitud = posicion.coords.latitude;
  let longitud = posicion.coords.longitude;

  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}&format=json `, {
    headers: {
        
    }
  })
  
  .then(respuesta => respuesta.json())

  .then(data =>{
      let ciudad = data.address.city;
  let pais = data.address.country;
  document.getElementById("direccion").value = `${ciudad}, ${pais}`;
  var map = L.map('mapa').setView([latitud, longitud], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.marker([latitud, longitud]).addTo(map);
 
  })
  .catch(error =>  console.error(error));
  

}
function error() {
  M.toast({html: 'No se pudo obtener la ubicación'});
}



M.AutoInit();