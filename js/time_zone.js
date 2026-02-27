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
        // Americas usa o fuso de New York (EST/EDT)
        document.getElementById('clockAmericas').textContent = formatTime("America/New_York");
        
        // Europe usa UTC (Londres é a base técnica do Albion Europe)
        document.getElementById('clockEurope').textContent = formatTime("UTC");
        
        // Asia usa o fuso de Singapura (SGT)
        document.getElementById('clockAsia').textContent = formatTime("Asia/Singapore");
    };

    update();
    setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', updateAllServerTimes);