const start = document.querySelector('.btn-start');
const [densidadActual, viaArea, resFinal, timeCheck, mensajeFestivo] = ["densidadActual", "viaAerea", "resultadoFinal", "ritmo", "mensaje"].map((el) => { return document.getElementById(el) })
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const festividades = [
    { "fecha": "Jan 01", "descripcion": "Año Nuevo" },
    { "fecha": "Apr 19", "descripcion": "Declaración de la Independencia" },
    { "fecha": "May 01", "descripcion": "Día del Trabajo" },
    { "fecha": "Jun 24", "descripcion": "Batalla de Carabobo" },
    { "fecha": "Jul 05", "descripcion": "Día de la Independencia" },
    { "fecha": "Jul 24", "descripcion": "Natalicio de Simón Bolívar" },
    { "fecha": "Oct 12", "descripcion": "Día de la Resistencia Indígena" },
    { "fecha": "Dec 24", "descripcion": "Víspera de Navidad" },
    { "fecha": "Dec 25", "descripcion": "Navidad" },
    { "fecha": "Dec 31", "descripcion": "Fiesta de Fin de Año" }
];

start.addEventListener('click', async () => {

    const date = {
        time: new Date(document.getElementById('initialDate').value).getTime() / 1000,
        timeStep: 900,
        addHours() {
            this.time += 3600;
        },
        addMinutes() {
            this.time += 60;
        },
        addSeconds() {
            this.time += 1;
        },
        forwardStep() {
            this.time += this.timeStep;
        },
        isHoliday(holiday) {
            const date = new Date(this.time);
            if (date.toDateString().includes(holiday)) return true;
            else return false;
        }
    }

    const endDate = new Date(document.getElementById('endDate').value).getTime() / 1000

    if(endDate >= date.time + 900) {
        const viaNS = new Via(false)
        const viaSN = new Via(true)
        const aerea = new Aerea()

        while (date.time < endDate) {
            let festividad = false
            for (holiday of festividades) {
                festividad = date.isHoliday(holiday.fecha)
                if (festividad) {
                    mensajeFestivo.innerText = holyday.descripcion
                }
            }

            viaNS.variarDensidad(viaNS.entrarHoraPico(date.time), 125, festividad, aerea)
            viaSN.variarDensidad(viaSN.entrarHoraPico(date.time), 125, festividad, aerea)
            viaNS.revisarEmbotellamiento()
            viaSN.revisarEmbotellamiento()
            if (viaNS.densidadVehicular >= 125) {
                aerea.escogerDireccion(viaNS)
            } else if (viaSN.densidadVehicular >= 125) {
                aerea.escogerDireccion(viaSN)
            }
            date.forwardStep();
            aerea.enfriar(timeStep)
        }

        const [reporteNS, reporteSN] = [viaNS, viaSN].map((el) => { return el.reportes() })
        const htmlReporte = `
            <p>Embotellamientos en vía con dirección al ${viaSN.direccion}: ${reporteSN.embotellamientos}</p>
            <p>Veces que se abrió la vía aérea con dirección al: ${viaSN.direccion}: ${reporteSN.aperturas}</p>
            <p>Embotellamientos en vía con dirección al: ${viaNS.direccion}: ${reporteNS.embotellamientos}</p>
            <p>Veces que se abrió la vía aérea con dirección al: ${viaNS.direccion}: ${reporteNS.aperturas}</p>
        `
        resFinal.innerHTML = htmlReporte
        if (timeCheck.checked) {
            await sleep(250)
        }
    } else {
        resFinal.innerHTML = `La fecha de fin tiene que ser mayor a la de inicio por un minimo de 15 minutos.`;
    }

    
})