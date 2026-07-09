btnAgregarPlatillo = document.getElementById('btnAgregarPlatillo');
let contenido ="";

document.addEventListener('DOMContentLoaded', function() {
  
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
 
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

btnAgregarPlatillo.addEventListener('click', function() {
  alert('Platillo agregado');
});

function mostrarPlatillo(platillo, id){
 contenido += 
  `<div class="card-panel recipe white row" 
  id="${id}"> 
    <div class= "recipe-details">
      <div class= "recipe-title">
         Nombre: ${platillo.nombre}
      </div>
      <div class="recipe-ingredients">
  Ingredientes: ${platillo.ingredientes}
      </div>
      <div class="recipe-price">
  Precio: $${platillo.precio}
      </div> 
    </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>

  </div>`;
document.querySelector('.recipes').innerHTML = contenido
}


function actualizarPlatillo(platillo, id){
  let tarjeta =document.getElementById(`${id}`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
    tarjeta.querySelector(".recipe-price").innerHTML = `$${platillo.precio}`;
}

document.querySelector('.recipes').addEventListener('click', function(e) {

  const icono = e.target.closest('.recipe-delete .material-icons');

  if (!icono) return;

  const id = icono.dataset.id;

  db.collection("platillos").doc(id).delete()
    .then(() => {

      const tarjeta = document.getElementById(id);

      if (tarjeta) {
        tarjeta.remove();
      }

      alert('Platillo eliminado');

    })
    .catch((error) => {

      console.log(error);
      alert('Error al eliminar el platillo');

    });

});