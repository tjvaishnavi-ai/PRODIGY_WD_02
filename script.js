let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimes');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerText = 'Stop';
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startStopBtn.innerText = 'Start';
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerText = '00:00:00.000';
    startStopBtn.innerText = 'Start';
    lapTimes = [];
    lapTimesList.innerHTML = '';
    lapBtn.disabled = true;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = difference % 1000;

    display.innerText =
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 100 ? '0' + (milliseconds < 10 ? '0' + milliseconds : milliseconds) : milliseconds);
}

function recordLap() {
    if (running) {
        const lapTime = display.innerText;
        lapTimes.push(lapTime);
        const li = document.createElement('li');
        li.innerText = lapTime;
        lapTimesList.appendChild(li);
    }
}
