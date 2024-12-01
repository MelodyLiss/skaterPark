const exampleModal = document.getElementById('modalActualizar');
exampleModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const id = button.getAttribute('data-id');
    const nombre = button.getAttribute('data-nombre');
    const anos = button.getAttribute('data-anos');
    const especialidad = button.getAttribute('data-especialidad');

    const inputId = document.querySelector('#id');
    const inputNombre = document.querySelector('#nombre');
    const inputAnos = document.querySelector('#anos_experiencia');
    const inputEspecialidad = document.querySelector('#especialidad');
    const errorMsg = document.querySelector('#errorMsg');

    inputId.value = id;
    inputNombre.value = nombre;
    inputAnos.value = anos;
    inputEspecialidad.value = especialidad;
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
});

const formActualizar = document.getElementById('formActualizar');

formActualizar.addEventListener('submit', function (event) {
    const inputPassword = document.querySelector('#inputPassword').value;
    const inputConfirmPassword = document.querySelector('#inputConfirmPassword').value;
    const errorMsg = document.querySelector('#errorMsg');

    if (inputPassword || inputConfirmPassword) { 
        // Validar si las contraseñas coinciden
        if (!inputPassword || !inputConfirmPassword) {
            event.preventDefault();
            errorMsg.textContent = 'Debes confirmar tu contraseña correctamente en ambos campos si deseas cambiarla';
            errorMsg.style.display = 'block';
            return;
        }

        if (inputPassword !== inputConfirmPassword) {
            event.preventDefault(); 
            errorMsg.textContent = 'Las contraseñas no coinciden. Por favor, intenta nuevamente.';
            errorMsg.style.display = 'block'; 
            return; 
        }
    } else {
        // Si ambos campos están vacíos, ocultar cualquier mensaje de error
        errorMsg.style.display = 'none';
    }
});
