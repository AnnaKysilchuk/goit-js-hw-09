import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputArea = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    chekingSelectedDate(selectedDate);
  },
};
const fp = flatpickr(inputArea, options);


function chekingSelectedDate(selectedDates) {
  const currentDate = Date.now();

  if (currentDate >= selectedDates) {
    Notiflix.Notify.failure("Please choose a date in the future");
    startBtn.setAttribute("disabled", "disabled");
  } else {
    startBtn.removeAttribute("disabled");
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimerInterface(days, hours, minutes, seconds) {
  if (days, hours, minutes, seconds >= 0) {
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  } else (
    timer.stop
  )
}

class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const selectedDate = Date.parse(fp.selectedDates[0]);
    startBtn.setAttribute("disabled", "disabled");
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const timeToTimer = selectedDate - currentDate;
      const { days, hours, minutes, seconds } = convertMs(timeToTimer);

      updateTimerInterface(days, hours, minutes, seconds);
    }, 1000)
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

const timer = new Timer();

startBtn.setAttribute("disabled", "disabled");
startBtn.addEventListener('click', timer.start);
