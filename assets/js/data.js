const tope = 125
const circulacion = {
    "norteSur": {
        "diasHabiles": {
            "mañana": ["06:00", "09:00", 119],
            "tarde": ["11:30", "13:00", 105],
            "noche": ["17:00", "19:30", 120]
        },
        "finDeSemana": {
            "mañana": ["06:00", "13:00", 80],
            "tarde": ["13:00", "15:00", 107],
            "noche": ["15:00", "20:00", 80]
        },
    },
    "surNorte": {
        "diasHabiles": {
            "mañana": ["06:00", "09:00", 117],
            "tarde": ["11:30", "13:00", 98],
            "noche": ["17:00", "21:15", 76]
        },
        "finDeSemana": {
            "mañana": ["04:30", "07:00", 54],
            "tarde": ["07:00", "09:30", 105],
            "noche": ["09:30", "20:00", 54]
        },
    }
}

const festividades = [
    { "fecha": "2023-01-01", "descripcion": "Año Nuevo" },
    { "fecha": "2023-04-19", "descripcion": "Declaración de la Independencia" },
    { "fecha": "2023-05-01", "descripcion": "Día del Trabajo" },
    { "fecha": "2023-06-24", "descripcion": "Batalla de Carabobo" },
    { "fecha": "2023-07-05", "descripcion": "Día de la Independencia" },
    { "fecha": "2023-07-24", "descripcion": "Natalicio de Simón Bolívar" },
    { "fecha": "2023-10-12", "descripcion": "Día de la Resistencia Indígena" },
    { "fecha": "2023-12-24", "descripcion": "Víspera de Navidad" },
    { "fecha": "2023-12-25", "descripcion": "Navidad" },
    { "fecha": "2023-12-31", "descripcion": "Fiesta de Fin de Año" }
]

class Via {
    constructor(direccionNorte) {
        this.densidadVehicular = 0
        this.embotellamientos = 0
        this.aperturas = 0
        if (direccionNorte) {
            this.direccion = "Norte"
        } else if (!direccionNorte) {
            this.direccion = "Sur"
        }
    }
    variarDensidad(minimo, maximo, festivo, aerea) {
        if (!festivo) {
            const densidadAleatoria = random(minimo, maximo);
            if (this.direccion == aerea.direccion) {
                this.densidadVehicular = densidadAleatoria*0.6
                aerea.densidadVehicular = densidadAleatoria*0.4
            } else {
                this.densidadVehicular = densidadAleatoria
            }
        } else {
            // Cuando el día sea festivo (festivo es un boolean), se debería correr este código acá instead
            this.densidadVehicular = random(tope, maximo)
        }
    }
    entrarHoraPico(unixTimestamp) {
        const direccion = this.direccion == "Norte" ? "norteSur" : "surNorte"
        const fecha = new Date(unixTimestamp * 1000);

        // Día hábil o fin de semana
        const diaDeLaSemana = fecha.getDay();
        const esFinDeSemana = diaDeLaSemana === 0 || diaDeLaSemana === 6;
        const tipoDia = esFinDeSemana ? "finDeSemana" : "diasHabiles";

        // Hora y minutos de la fecha
        const horaActual = fecha.getHours();
        const minutosActuales = fecha.getMinutes();
        const totalMinutosActuales = horaActual * 60 + minutosActuales;

        for (const rango in circulacion[direccion][tipoDia]) {
            const [horaInicio, horaFin, valor] = circulacion[direccion][tipoDia][rango];

            const [horaInicioH, horaInicioM] = horaInicio.split(':').map(Number);
            const [horaFinH, horaFinM] = horaFin.split(':').map(Number);
            const totalMinutosInicio = horaInicioH * 60 + horaInicioM;
            const totalMinutosFin = horaFinH * 60 + horaFinM;

            if (totalMinutosActuales >= totalMinutosInicio && totalMinutosActuales <= totalMinutosFin) {
                return valor;
            }
        }
        return 1;
    }
    contarApertura(){
        this.aperturas++
    }
    revisarEmbotellamiento(){
        if(this.densidadVehicular>=tope){
            this.embotellamientos++
        }
    }
    reportes(){
        return {embotellamientos: this.embotellamientos, aperturas: this.aperturas}
    }
}

class Aerea {
    constructor() {
        this.cooldown = 7200
        this.direccion = ""
    }
    escogerDireccion(via) {
        if (this.cooldown >= 7200 && this.direccion != via.direccion) {
            this.cooldown = 0
            this.direccion = via.direccion
            via.contarApertura()
        }
    }
    enfriar(tiempo){
        this.cooldown += tiempo
    }
    // vaciar(via) {
    //     if (this.direccion == via.direccion) {
    //         console.log("Vaciando en direccion: " + this.direccion)
    //         via.densidadVehicular = via.densidadVehicular / 2
    //     }
    // }
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}