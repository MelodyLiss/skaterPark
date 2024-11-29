const exampleModal = document.getElementById('modalActualizar');
exampleModal.addEventListener('show.bs.modal', function (event) {
    
    const button = event.relatedTarget; 
    const id = button.getAttribute('data-id'); 
    const nombre = button.getAttribute('data-nombre'); 
    const anos = button.getAttribute('data-anos'); 
    const especialidad = button.getAttribute('data-especialidad'); 

    const inputNombre = document.querySelector('#nombre');
    const inputAnos = document.querySelector('#anos_experiencia');
    const inputEspecialidad = document.querySelector('#especialidad');

    inputNombre.value = nombre;
    inputAnos.value = anos;
    inputEspecialidad.value = especialidad;
});