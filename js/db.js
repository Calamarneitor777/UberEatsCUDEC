db.collection("platillo").onSnapshot((datos) => {
   datos.forEach((registro) => {
    console.log(registro);
    
   });
});