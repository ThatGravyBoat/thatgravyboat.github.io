
const updateClock = () => {
    let clock = document.getElementById("clock");
    let date = new Date();
    clock.innerHTML = date.toLocaleString("en-US", {
        timeZone: "America/St_Johns",
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).replaceAll(",", " ");
}

updateClock();

setTimeout(function() {
    setInterval(updateClock, 60000);
    updateClock();
}, (60 - new Date().getSeconds()) * 1000);