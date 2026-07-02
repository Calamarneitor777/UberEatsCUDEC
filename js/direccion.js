document.addEventListener('DOMContentLoaded', function() {
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, { edge: 'right' });
});

let contenidodireccion = "";


db.collection("Direccion").onSnapshot((datos) => {
  datos.docChanges().forEach((registro) => {
    if (registro.type === "added"){
      agregarALista(registro.doc.data(),registro.doc.id);
    }
    
  });
  var elems = document.querySelectorAll('select');
   M.FormSelect.init(elems);


})


function agregarALista(Direccion, id){
    contenidodireccion += `<option value="${id}">

    ${Direccion.nombre}
    </option>`;
    document.getElementById("listadireccion").innerHTML = contenidodireccion;
}

M.AutoInit();