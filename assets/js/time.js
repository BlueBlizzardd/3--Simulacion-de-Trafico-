const start = document.querySelector('.btn-start');

start.addEventListener('click', () => {

    const date = {
        time: new Date(document.getElementById('initialDate').value).getTime(),
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
            this.time += 900
        }
    }

    const endDate = new Date(document.getElementById('endDate').value).getTime()

    const viaNS = new Via(false)
    const viaSN = new Via(true)
    const aerea = new Aerea()

    console.log(date.time)
    while (date.time < endDate) {
        date.forwardStep();
        //añadir código que verifique si la fecha es festivo
        viaNS.variarDensidad(1, 125)
        viaSN.variarDensidad(1, 125)
        if (viaNS.densidadVehicular == 125) {
            aerea.vaciar(viaNS)
        } else if (viaSN.densidadVehicular == 125) {
            aerea.vaciar(viaSN)
        }
    }
    console.log(date.time)
})