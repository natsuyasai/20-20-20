function main() {

    let countdownTimer = null;
    let statusTimer = null;


    function start() {
        startCountdown();
    }

    function startCountdown() {
        const countTime = document.getElementById("time").value;
        startStatusUpdate(countTime * 60);
        countdownTimer = setTimeout(() => {
            sound("sine", 1);
            const breakTime = document.getElementById("break").value;
            startStatusUpdate(breakTime);
            countdownTimer = setTimeout(() => {
                sound("triangle", 1);
                start();
            }, breakTime * 1000);
        }, countTime * 60 * 1000);
    }

    function startStatusUpdate(timeInSeconds) {
        clearInterval(statusTimer);
        statusTimer = null;
        timeInSeconds--;
        statusTimer = setInterval(() => {
            if (timeInSeconds <= 0) {
                clearInterval(statusTimer);
                statusTimer = null;
                document.getElementById('status').textContent = "00:00";
                return;
            }
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;
            document.getElementById('status').textContent =
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            timeInSeconds--;
        }, 1000);
    }

    function stop() {
        clear();
        console.log("Stopping the application...");
    }

    function restart() {
        clear();
        start();
        console.log("Restarting the application...");
    }

    function clear() {
        clearTimeout(countdownTimer);
        countdownTimer = null;
        clearInterval(statusTimer);
        statusTimer = null;
        document.getElementById('status').textContent = "00:00";
        console.log("Clearing the application...");
    }

    function notifyUser(title, message) {
        if (Notification.permission === "granted") {
            new Notification(title, { body: message });
        } else {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, { body: message });
                }
            });
        }
    }

    function sound(type, sec) {
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        osc.type = type
        osc.connect(ctx.destination)
        osc.start()
        osc.stop(sec)
    }

    document.getElementById("start").addEventListener("click", start);
    document.getElementById("stop").addEventListener("click", stop);
    document.getElementById("restart").addEventListener("click", restart);
    // if (Notification.permission !== "granted") {
    //     Notification.requestPermission().then(permission => {
    //         if (permission === "granted") {
    //             console.log("Notification permission granted.");
    //         } else {
    //             console.log("Notification permission denied.");
    //         }
    //     });
    // }
}

main();