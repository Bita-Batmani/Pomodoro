let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let timers = document.querySelectorAll(".timer-display");
let session = document.getElementById("Pomodoro-session");
let shortBreak = document.getElementById("short-break");
let LongBreak = document.getElementById("long-break");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let timeMsg = document.getElementById("timer-message");
let button = document.querySelector(".btn");

let currentTimer = null;
let myInterval = null;

// Show the default timer
function showDefaultTimer() {
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";
}
showDefaultTimer();

function hideAll() {
  timers.forEach((timer) => {
    timer.style.display = "none";
  });
}

session.addEventListener("click", () => {
  hideAll();

  pomodoro.style.display = "block";

  session.classList.add("active");
  shortBreak.classList.remove("active");
  LongBreak.classList.remove("active");

  currentTimer = pomodoro;
});

shortBreak.addEventListener("click", () => {
  hideAll();

  short.style.display = "block";

  session.classList.remove("active");
  shortBreak.classList.add("active");
  LongBreak.classList.remove("active");

  currentTimer = short;
});

LongBreak.addEventListener("click", () => {
  hideAll();

  long.style.display = "block";

  session.classList.remove("active");
  shortBreak.classList.remove("active");
  LongBreak.classList.add("active");

  currentTimer = long;
});

// start the timer on click
function startTimer(timerDisplay) {
  if (myInterval) {
    clearInterval(myInterval);
  }

  timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0];

  let durationMilliSeconds = timerDuration * 60 * 1000;
  let endTimestamp = Date.now() + durationMilliSeconds;

  myInterval = setInterval(function () {
    const timeRemaining = new Date(endTimestamp - Date.now());

    if (timeRemaining <= 0) {
      clearInterval(myInterval);
      timerDisplay.textContent = "00:00";

      const alarm = new Audio(
        "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
      );
      alarm.play();
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTime = `${minutes} : ${seconds
        .toString()
        .padStart(2, "0")}`;
      timerDisplay.textContent = formattedTime;
      timerDisplay.classList.add("time");
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (currentTimer) {
    startTimer(currentTimer);
    timeMsg.style.display = "none";
  } else {
    timeMsg.style.display = "block";
  }
});

stopBtn.addEventListener("click", () => {
  if (currentTimer) {
    clearInterval(myInterval);
  }
});
