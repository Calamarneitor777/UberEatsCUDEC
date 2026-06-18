let contenidoLista='';
function AgregarALista(platillo, id){
    contenidoLista = `<option value='${id}'>
    ${mostrarPlatillo.nombre}
    </option>`;
    document.getElementById('listaPlatillos').innerHTML=
    contenidoLista;

}