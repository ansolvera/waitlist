// ********************
// COUNTDOWN
// ********************

const countdown = document.querySelectorAll('.countdown');
const retreatDate = new Date("September 19, 2021 3:00:00 EDT").getTime();

const timer = () => {
    const now = new Date().getTime();
    let diff = retreatDate - now;

    if(diff < 0) {
        countdown.remove();
    }

    let days = Math.floor(diff / (1000*60*60*24));
    let hours = Math.floor(diff % (1000*60*60*24) / (1000*60*60));
    let minutes = Math.floor(diff % (1000*60*60) / (1000*60));
    let seconds = Math.floor(diff % (1000*60) / 1000);

    days <= 9 ? days = `0${days}` : days;
    hours <= 9 ? hours = `0${hours}` : hours;
    minutes <= 9 ? minutes = `0${minutes}` : minutes;
    seconds <= 9 ? seconds = `0${seconds}` : seconds;

    document.querySelectorAll('.days').forEach(function(item) {
        this.textContent = days;
    })
    document.querySelectorAll('.hours').textContent = hours;
    document.querySelectorAll('.minutes').textContent = minutes;
    document.querySelectorAll('.seconds').textContent = seconds;

}

timer();
setInterval(timer, 1000);