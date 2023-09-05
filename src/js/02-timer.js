import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/dark.css');

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  valueOutput: document.querySelectorAll('.value'),
};

refs.startBtn.disabled = true;

// Створений клас таймеру//
class Countdown {
  constructor({ updateValueOnPage, stopCountdown }) {
    this.dateForTimer = null;
    this.isCountdownRun = false;
    this.countdownId = null;
    this.updateValueOnPage = updateValueOnPage;
    this.onStopCountdown = stopCountdown;
  }

  startCountdown() {
    refs.startBtn.disabled = true;
    this.isCountdownRun = true;
    this.countdownId = setInterval(() => {
      const leftTime = this.dateForTimer - Date.now();
      console.log(leftTime);
      const timer = convertMs(leftTime);
      const arrayFromSpan = [...refs.valueOutput];
      const timeValues = Object.values(timer);
      this.updateValueOnPage(arrayFromSpan, timeValues);
      this.onStopCountdown(leftTime, this.countdownId);
      if (!this.isCountdownRun) {
        this.updateValueOnPage(arrayFromSpan, 0);
      }
    }, 1000);
  }
}

const myCountdown = new Countdown({
  updateValueOnPage: setValueInOutput,
  stopCountdown: stopCountdown,
});

refs.startBtn.addEventListener('click', () => myCountdown.startCountdown());

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (myCountdown.isCountdownRun) {
      return;
    }
    myCountdown.dateForTimer = selectedDates[0].getTime();
    if (myCountdown.dateForTimer <= Date.now()) {
      refs.startBtn.disabled = true;
      return Notify.failure('Please choose a date in the future', {
        width: '350px',
        position: 'center-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
        timeout: 4000,
      });
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setValueInOutput(elemArr, value) {
  for (let i = 0; i < elemArr.length; i += 1) {
    if (Array.isArray(value)) {
      elemArr[i].textContent = addLeadingZero(value[i]);
    } else {
      elemArr[i].textContent = addLeadingZero(value);
    }
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopCountdown(time, countdown) {
  //console.log(Math.floor(time / 1000));
  if (Math.floor(time / 1000) <= 0) {
    clearInterval(countdown);
    myCountdown.isCountdownRun = false;
  }
}
