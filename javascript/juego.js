//creación de variables

const pregunta = document.querySelector('#pregunta');
const opciones = Array.from(document.querySelectorAll('.opcionTexto'));
const textoProgreso = document.querySelector('#textoProgreso');
const textoPuntaje= document.querySelector('#puntaje');
const barraProgresoLlena = document.querySelector('#barraProgresoLlena');

let preguntaActual = {}
let respuestaCorrecta = true
let puntaje = 0
let contPreguntas = 0
let pregDisponibles = []

//generar arreglo de objetos para las preguntas

let preguntas = [
    {
        pregunta: '¿En qué año se produjo la caída de fortaleza La Bastilla de París?',
        opcion1: '1792',
        opcion2: '1795',
        opcion3: '1788',
        opcion4: '1789',
        respuesta: 4,
    },
    {
        pregunta:
            "¿Dónde fue capturado el Rey Luis XVI el 20 de junio de 1791?",
        opcion1: "Varennes",
        opcion2: "Bayona",
        opcion3: "París",
        opcion4: "Niza",
        respuesta: 1,
    },
    {
        pregunta: "¿En qué año se produjo la Revolución Mexicana?",
        opcion1: "1905",
        opcion2: "1903",
        opcion3: "1910",
        opcion4: "1915",
        respuesta: 3,
    },
    {
        pregunta: "¿Dónde y cuándo se inventó la pólvora?",
        opcion1: "En Estados Unidos en el siglo XIX",
        opcion2: "En China en el siglo IX",
        opcion3: "En Rusia en el siglo XII",
        opcion4: "En Francia en el siglo XVII",
        respuesta: 2,
    },
    {
        pregunta: "¿Qué se conmemora el 20 de noviembre en Argentina?",
        opcion1: "Día del respeto a la Divsersidad Cultural",
        opcion2: "Día del Trabajador",
        opcion3: "Paso a la Inmortalidad del Gral. José de San Martin",
        opcion4: "Día de la Soberanía Nacional",
        respuesta: 4,
    },
    {
        pregunta: "¿Quién fue el primer presidente CONSTITUCIONAL argentino?",
        opcion1: "Bartolomé Mitre",
        opcion2: "Domingo F. Sarmiento",
        opcion3: "Justo José de Urquiza",
        opcion4: "Santiago Derqui",
        respuesta: 3,
    },
    {
        pregunta: "¿Quién fue el lider del golpe de Estado cubano el 10 de marzo de 1952?",
        opcion1: "Carlos Prío Socarrás",
        opcion2: "Fulgencio Batista",
        opcion3: "Fidel Castro",
        opcion4: "Ernesto Guevara",
        respuesta: 2,
    },
    {
        pregunta: "¿Con qué nombre en clave se conocía el desembarco de Normandía?",
        opcion1: "Operación Führer",
        opcion2: "Operación Freedom",
        opcion3: "Operación Fury",
        opcion4: "Operación Overlord",
        respuesta: 4,
    },
    {
        pregunta: "¿Cómo se llamaba el avión que transportó la bomba atómica que se lanzó sobre Hiroshima?",
        opcion1: "Little Boy",
        opcion2: "Little Wings",
        opcion3: "Big Tasty",
        opcion4: "Enola Gay",
        respuesta: 4,
    },
    {
        pregunta: "¿En qué país se inició la primera Revolución Industrial?",
        opcion1: "Reino Unidos",
        opcion2: "Estados Unidos",
        opcion3: "Francia",
        opcion4: "Alemania",
        respuesta: 1,
    }

]

const puntajeSuma = 100
const totalPreguntas = 10

//funciones

iniciarJuego = () => {
    contPreguntas = 0
    punataje = 0
    pregDisponibles = [...preguntas]
    nuevaPregunta()
}

nuevaPregunta = () => {
    if(pregDisponibles.length === 0 || contPreguntas > totalPreguntas) {
        localStorage.setItem('ultimoPuntaje', puntaje)

        return window.location.assign('/pages/pantalla-final.html')
    }

    contPreguntas++
    textoProgreso.innerText = `Pregunta ${contPreguntas} de ${totalPreguntas}`
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
