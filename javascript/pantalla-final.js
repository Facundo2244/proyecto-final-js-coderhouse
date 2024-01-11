const nombreUsuario = document.querySelector('#nombreUsuario')
const botonGuardarPuntaje = document.querySelector('#botonGuardarPuntaje')
const puntajeFinal = document.querySelector('#puntajeFinal')
const ultimoPuntaje = localStorage.getItem('ultimoPuntaje')

const puntajes = JSON.parse(localStorage.getItem('puntajes')) || []

const topPuntajes = 10

puntajeFinal.innerText = ultimoPuntaje

nombreUsuario.addEventListener('keyup', () => {
    botonGuardarPuntaje.disabled = !nombreUsuario.value
})

guardarPuntaje = e => {
    e.preventDefault()

    const puntaje = {
        puntaje: ultimoPuntaje,
        nombre: nombreUsuario.value
    }

    puntajes.push(puntaje)

    puntajes.sort((a,b) => {
        return b.puntaje - a.puntaje
    })

    puntajes.splice(10)

    localStorage.setItem('puntajes', JSON.stringify(puntajes))
    window.location.assign('../index.html')

    
}