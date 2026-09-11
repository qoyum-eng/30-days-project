let time = 60;
let countdown;

const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
}

startBtn.addEventListener("click", function () {
    countdown = setInterval(function () {
        time--;

        updateTimer();

        if (time === 0) {
            clearInterval(countdown);
        }
    }, 1000);
});
pauseBtn.addEventListener("click", function () {
    clearInterval(countdown);
    countdown = null;
});

resetBtn.addEventListener("click", function () {
    clearInterval(countdown);
    time = 60;
    updateTimer();
});

updateTimer();