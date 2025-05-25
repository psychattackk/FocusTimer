let timer;
let isRunning = false;
let timeLeft = 25 * 60;

const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const taskInput = document.getElementById('taskInput');
const currentTask = document.getElementById('currentTask');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  const task = taskInput.value.trim();
  if (task) {
    localStorage.setItem('focusTask', task);
    currentTask.textContent = `🔎 Focus: ${task}`;
  }

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up! Take a break.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  isRunning = false;
  updateTimerDisplay();
}

const savedTask = localStorage.getItem('focusTask');
if (savedTask) {
  currentTask.textContent = `🔎 Focus: ${savedTask}`;
  taskInput.value = savedTask;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

const timeSelect = document.getElementById('timeSelect');

timeSelect.addEventListener('change', () => {
  pauseTimer(); // optional: stop current timer
  timeLeft = parseInt(timeSelect.value); // update time
  updateTimerDisplay(); // refresh display
});