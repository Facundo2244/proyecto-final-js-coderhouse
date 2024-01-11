//creación de variables

const pregunta = document.querySelector('#pregunta');
const opciones = Array.from(document.querySelectorAll('.opcionTexto'));
const textoProgreso = document.querySelector('#textoProgreso');
const textoPuntaje= document.querySelector('#puntaje');
const barraProgresoLlena = document.querySelector('#barraProgresoLlena');

let preguntaActual = {}
let respuestaCorrecta = true
let punataje = 0
let contPreguntas = 0
let pregDisponibles = []

//generar arreglo de objetos para las preguntas

let preguntas = [
    {
        pregunta: 'Cuánto es 4x4',
        opcion1: '2',
        opcion2: '16',
        opcion3: '32',
        opcion4: '24',
        respuesta: 2,
    },
    {
        pregunta:
            "Cuál es el nombre de pila del jugador Messi",
        opcion1: "Lionel",
        opcion2: "Roberto",
        opcion3: "Pablo",
        opcion4: "Juan",
        respuesta: 1,
    },
    {
        pregunta: "En cuál de la siguientes películas actuó Tom Hanks?",
        opcion1: "Harriet la espía",
        opcion2: "Duro de matar",
        opcion3: "Náufrago",
        opcion4: "Titanic",
        respuesta: 3,
    },
    {
        pregunta: "Quién es el rey de copas a nivel clubes?",
        opcion1: "Real Madrid",
        opcion2: "Boca",
        opcion3: "Independiente",
        opcion4: "Manchester United",
        respuesta: 1,
    }
]

const puntajeSuma = 100
const totalPreguntas = 4

//funciones

iniciarJuego = () => {
    contPreguntas = 0
    punataje = 0
    pregDisponibles = [...preguntas]
    nuevaPregunta()
}

nuevaPregunta = () => {
    if(pregDisponibles.length === 0 || contPreguntas > puntajeSuma) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../pages/pantalla-final.html')
    }

    contPreguntas++
    textoProgreso.innerText = `Pregunta ${contPreguntas} of ${totalPreguntas}`
    barraProgresoLlena.style.width = `${(contPreguntas/totalPreguntas) * 100}%`
    
    const pregIndice = Math.floor(Math.random() * pregDisponibles.length)
    preguntaActual = pregDisponibles[pregIndice]
    pregunta.innerText = preguntaActual.pregunta

    opciones.forEach(opcion => {
        const numero = opcion.dataset['number']
        opcion.innerText = preguntaActual['opcion' + numero]
    })

    pregDisponibles.splice(pregIndice, 1)

    respuestaCorrecta = true
}

opciones.forEach(opcion => {
    opcion.addEventListener('click', e => {
        if(!respuestaCorrecta) return

        respuestaCorrecta = false
        const opcionSelec = e.target
        const respuestaSelec = opcionSelec.dataset['number']

        let claseCorresponde = respuestaSelec == preguntaActual.respuesta ? 'correcta' : 'incorrecta'

        if(claseCorresponde === 'correcta') {
            incrementScore(puntajeSuma)
        }

        opcionSelec.parentElement.classList.add(claseCorresponde)

        setTimeout(() => {
            opcionSelec.parentElement.classList.remove(claseCorresponde)
            nuevaPregunta()

        }, 1000)
    })
})

incrementScore = num => {
    puntaje +=num
    textoPuntaje.innerText = puntaje
}

iniciarJuego()
