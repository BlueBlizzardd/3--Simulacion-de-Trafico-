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
        }
    }

    const endDate = new Date(document.getElementById('endDate').value).getTime()

    while(date.time < endDate) {
        date.addMinutes();
    }

    console.log(new Date(date.time));
})