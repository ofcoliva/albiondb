function updateAllServerTimes() {
    const formatTime = (timeZone) => {
        return new Date().toLocaleString("en-US", {
            timeZone: timeZone,
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    const update = () => {
        document.getElementById('clockAmericas').textContent = formatTime("America/New_York");
        
        document.getElementById('clockEurope').textContent = formatTime("UTC");
        
        document.getElementById('clockAsia').textContent = formatTime("Asia/Singapore");
        
        document.getElementById('clockSouthAmerica').textContent = formatTime("America/Sao_Paulo");
    };

    update();
    setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', updateAllServerTimes);