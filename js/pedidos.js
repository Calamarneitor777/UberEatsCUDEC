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


function exito(posicion){

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`, {
        headers: {
            'User-Agent': 'FoodNinja'
        }
    })
    .then(respuesta => respuesta.json())
    .then(data => {

        document.getElementById("direccion").value = data.display_name;

    })
    .catch(error => console.error(error));

}


function error(error){
    alert("error al obtener la ubicacion");
    console.log(error);
}




M.AutoInit();