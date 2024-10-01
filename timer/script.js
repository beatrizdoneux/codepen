// StopWatch buttons and display
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const timeDisplay = document.getElementById("time-display");

// Parameter inputs
const focusInput = document.getElementById("focus-input");
const breakInput = document.getElementById("break-input");
const sessionsInput = document.getElementById("sessions-input");

// Set initial values
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let isRunning = false;

// Set event listeners
startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);

// Define functions
function start() {
	if (!isRunning) {
		startTime = Date.now() - elapsedTime;
		timer = setInterval(updateDisplay, 1000);
		isRunning = true;
	}
}

function pause() {
	if (isRunning) {
		clearInterval(timer);
		elapsedTime = Date.now() - startTime;
		isRunning = false;
	}
}

function reset() {
	clearInterval(timer);
	startTime = 0;
	elapsedTime = 0;
	isRunning = false;
	timeDisplay.textContent = "00:00:00";
}

function updateDisplay() {
	const currentTime = Date.now();
	elapsedTime = currentTime - startTime;
	timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
	let hours = Math.floor(time / (1000 * 60 * 60));
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let seconds = Math.floor((time / 1000) % 60);

	hours = String(hours).padStart(2, "0");
	minutes = String(minutes).padStart(2, "0");
	seconds = String(seconds).padStart(2, "0");

	return `${hours}:${minutes}:${seconds}`;
}
