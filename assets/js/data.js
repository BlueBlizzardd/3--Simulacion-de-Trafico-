const tope = 125;

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
};

console.log(circulacion);

class Via {
    constructor(direccionNorte) {
        this.densidadVehicular = 0
        if (direccionNorte) {
            this.direccion = "Norte"
        } else if (!direccionNorte) {
            this.direccion = "Sur"
        }
    }
    variarDensidad(minimo, maximo, festivo) {
        if (!festivo) {
            this.densidadVehicular = Math.floor((Math.random() * maximo) + minimo);
        } else {
            // Cuando el día sea festivo (festivo es un boolean), se debería correr este código acá instead
            this.densidadVehicular = Math.floor((Math.random() * maximo) + 125);
        }
    }
};

class Aerea {
    constructor() {
        this.cooldown = 7200
    }
    escogerDireccion(via) {
        if (this.cooldown >= 7200) {
            this.direccion = via.direccion
        }
    }
    vaciar(via) {
        if (this.direccion == via.direccion) {
            via.densidadVehicular = via.densidadVehicular / 2
        }
    }
};