function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    document.getElementById("time").textContent =
        `${hours}:${minutes}:${seconds} ${period}`;
    document.getElementById("date").textContent =
    now.toDateString();
}

updateClock();

setInterval(updateClock, 1000);