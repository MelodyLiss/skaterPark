/* CERRAR SESIÓN */

function logout() {
    window.location.href = '/skaterpark/auth/logout';
}


/* Cambios check */

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', async (event) => {
        const id = event.target.getAttribute('data-id'); 
        const estado = event.target.checked; 

        try {
            const respuesta = await fetch('/skaterpark/skaters/actualizarEstado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, estado }),
            });

            if (!respuesta.ok) {
                throw new Error('Error al actualizar el estado');
            }

            const data = await respuesta.json();
            console.log(data.msg);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al actualizar el estado. Por favor, inténtalo de nuevo.');
        }
    });
});
