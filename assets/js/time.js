const start = document.querySelector('.btn-start');

start.addEventListener('click', () => {

    const date = {
        date: new Date(document.getElementById('initialDate').value),
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
        },
        isHoliday(holiday) {
            if(this.date.toDateString().includes(holiday)) return true;
            else return false; 
        }
    }

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

    const endDate = new Date(document.getElementById('endDate').value).getTime()

    const viaNS = new Via(false)
    const viaSN = new Via(true)
    const aerea = new Aerea()

    while (date.time < endDate) {
        date.forwardStep();
        //añadir código que verifique si la fecha es festivo
        for(holiday of festividades) {
            if(date.isHoliday(holiday.fecha)) {
                viaNS.variarDensidad(1, 125, true);
                viaSN.variarDensidad(1, 125, true);
            }
        }
        viaNS.variarDensidad(1, 125);
        viaSN.variarDensidad(1, 125);
        if (viaNS.densidadVehicular == 125) {
            aerea.vaciar(viaNS)
        } else if (viaSN.densidadVehicular == 125) {
            aerea.vaciar(viaSN)
        }
    }
});