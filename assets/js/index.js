const start = document.querySelector('.btn-start');
const [densidadActual, viaArea, resFinal, timeCheck] = ["densidadActual", "viaAerea", "resultadoFinal", "ritmo"].map((el) => { return document.getElementById(el) })
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

start.addEventListener('click', async () => {
    const timeStep = 900

    const date = {
        time: new Date(document.getElementById('initialDate').value).getTime() / 1000,
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
            this.time += timeStep
        }
    }

    const endDate = new Date(document.getElementById('endDate').value).getTime() / 1000

    const viaNS = new Via(false)
    const viaSN = new Via(true)
    const aerea = new Aerea()

    let i = 0
    while (date.time < endDate) {
        // console.log(aerea.cooldown)
        // console.log(vecesAbiertaN, vecesAbiertaS)
        //añadir código que verifique si la fecha es festivo

        viaNS.variarDensidad(viaNS.entrarHoraPico(date.time), 125, false, aerea)
        viaSN.variarDensidad(viaSN.entrarHoraPico(date.time), 125, false, aerea)
        viaNS.revisarEmbotellamiento()
        viaSN.revisarEmbotellamiento()
        if (viaNS.densidadVehicular >= 125) {
            aerea.escogerDireccion(viaNS)
        } else if (viaSN.densidadVehicular >= 125) {
            aerea.escogerDireccion(viaSN)
        }
    }

    const [reporteNS, reporteSN] = [viaNS, viaSN].map((el) => { return el.reportes() })
    const htmlReporte = `
        <p>Embotellamientos en vía con dirección al ${viaSN.direccion}: ${reporteSN.embotellamientos}</p>
        <p>Veces que se abrió la vía aérea con dirección al: ${viaSN.direccion}: ${reporteSN.aperturas}</p>
        <p>Embotellamientos en vía con dirección al: ${viaNS.direccion}: ${reporteNS.embotellamientos}</p>
        <p>Veces que se abrió la vía aérea con dirección al: ${viaNS.direccion}: ${reporteNS.aperturas}</p>
    `
    resFinal.innerHTML = htmlReporte
    if(timeCheck.value){
        await sleep(250)
    }
    date.forwardStep();
    aerea.enfriar(timeStep)
})