// Verificar la contraseña
function verificar(campo, contraseñaCorrecta) {
    const input = document.getElementById(`input${campo}`);
    const mensaje = document.getElementById(`mensaje${campo}`);
    
    if (input.value === contraseñaCorrecta) {
        mensaje.classList.remove('hidden');
    } else {
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
    }
}

// Función para deshabilitar todos los campos de contraseñas
function deshabilitarCampos() {
    const inputs = document.querySelectorAll('input[type="password"]');
    inputs.forEach(input => {
        input.disabled = true; // Desactiva el campo
    });
}

// Función para iniciar y continuar el contador de 24 horas
function iniciarContador() {
    // Verifica si ya se guardó el tiempo restante
    let tiempoRestante = localStorage.getItem('tiempoRestante');
    if (!tiempoRestante) {
        tiempoRestante = 24 * 60 * 60; // 24 horas en segundos
    } else {
        tiempoRestante = parseInt(tiempoRestante);
    }

    // Actualiza el contador cada segundo
    setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            localStorage.setItem('tiempoRestante', tiempoRestante);
        }

        // Calcula las horas, minutos y segundos
        const horas = Math.floor(tiempoRestante / 3600);
        const minutos = Math.floor((tiempoRestante % 3600) / 60);
        const segundos = tiempoRestante % 60;

        // Muestra el contador
        document.getElementById('contador').textContent = 
            `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        // Si el tiempo se acaba, deshabilita los campos
        if (tiempoRestante <= 0) {
            deshabilitarCampos();
        }
    }, 1000);
}

// Inicia el contador cuando se carga la página
document.addEventListener('DOMContentLoaded', iniciarContador);
