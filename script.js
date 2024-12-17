
// Analog Clock Functionality
let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let seconds = document.getElementById("seconds");

let set_clock = setInterval(() => {
    let date_now = new Date();
    let hr = date_now.getHours();
    let min = date_now.getMinutes();
    let sec = date_now.getSeconds();

    let calc_hr = (hr % 12) * 30 + (min / 2);  // Hour hand with minute offset
    let calc_min = (min * 6) + (sec / 10);     // Minute hand with second offset
    let calc_sec = sec * 6;                    // Second hand

    hour.style.transform = `rotate(${calc_hr}deg)`;
    minute.style.transform = `rotate(${calc_min}deg)`;
    seconds.style.transform = `rotate(${calc_sec}deg)`;
}, 1000);

// Alarm Clock
let alarmTime = null;
let alarmTimeout = null;
const alarmMessage = document.getElementById('alarmMessage');
const setAlarmButton = document.getElementById('setAlarm');
const alarmInput = document.getElementById('alarmTime');

setAlarmButton.addEventListener('click', () => {
    const alarmHour = alarmInput.value.split(':')[0];
    const alarmMinute = alarmInput.value.split(':')[1];
    alarmTime = new Date();
    alarmTime.setHours(alarmHour);
    alarmTime.setMinutes(alarmMinute);
    alarmTime.setSeconds(0);
    alarmTime.setMilliseconds(0);

    const timeDiff = alarmTime - new Date();
    if (timeDiff > 0) {
        alarmMessage.textContent = `Alarm set for ${alarmInput.value}`;
        alarmTimeout = setTimeout(() => {
            alert('Time to wake up!');
            alarmMessage.textContent = 'Alarm triggered!';
        }, timeDiff);
    } else {
        alarmMessage.textContent = 'Alarm time must be in the future.';
    }
});

// Stopwatch Functionality
let stopwatchInterval = null;
let stopwatchSeconds = 0;
const stopwatchTimeDisplay = document.getElementById('stopwatchTime');
const startStopwatchButton = document.getElementById('startStopwatch');
const resetStopwatchButton = document.getElementById('resetStopwatch');

startStopwatchButton.addEventListener('click', () => {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        startStopwatchButton.textContent = 'Start';
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchSeconds++;
            const minutes = Math.floor(stopwatchSeconds / 60).toString().padStart(2, '0');
            const seconds = (stopwatchSeconds % 60).toString().padStart(2, '0');
            stopwatchTimeDisplay.textContent = `${minutes}:${seconds}`;
        }, 1000);
        startStopwatchButton.textContent = 'Stop';
    }
});

resetStopwatchButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchSeconds = 0;
    stopwatchTimeDisplay.textContent = '00:00';
    startStopwatchButton.textContent = 'Start';
});

// Timer Functionality
let timerInterval = null;
let timerSeconds = 0;
const timerInput = document.getElementById('timerInput');
const startTimerButton = document.getElementById('startTimer');
const timerDisplay = document.getElementById('timerDisplay');

startTimerButton.addEventListener('click', () => {
    const minutes = parseInt(timerInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    timerSeconds = minutes * 60;

    const timerIntervalDisplay = setInterval(() => {
        if (timerSeconds <= 0) {
            clearInterval(timerIntervalDisplay);
            alert('Timer done!');
            timerDisplay.textContent = '00:00';
        } else {
            const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
            const seconds = (timerSeconds % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
            timerSeconds--;
        }
    }, 1000);
});
