let contenidoLista = '';

document.addEventListener('DOMContentLoaded', function(){

    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
})


let contenidoLista ='';

db.collection("platillo").onSnapshot((datos) => {
  datos.docChanges().forEach((registro) => {
    if (registro.type === "added"){
      agregarALista(registro.doc.data(),registro.doc.id);
    }
    
  });
  var elems = document.querySelectorAll('select');

})


function agregarALista(platillo, id){
contenidoLista = `<option value=''>
${platillo.nombre} </option>`;
document.getElementById ('listaPlatillo').innerHTML=contenidoLista;


}

M.AutoInit();