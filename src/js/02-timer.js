import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStart = document.querySelector('button[data-start]');
buttonStart.setAttribute('disabled', true);
let selectedTime = null;

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const curentTime = Date.now();
      deltaTime = selectedTime - curentTime;

      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
      updateComponentsTimer({ days, hours, minutes, seconds });
      if (deltaTime <= 0) {
        this.stop();
        Notify.success('Ура на.., распродажа на...');
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};
// timer.start();

buttonStart.addEventListener('click', () => {
  timer.start();
  // timerId = setInterval(() => {
  //   const date = new Date();
  //   console.log(date);
  //   // buttonChangeColorStart.setAttribute('disabled', true);
  //   // document.body.style.backgroundColor = getRandomHexColor();
  // }, 1000);
});

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] < new Date()) {
//       //   window.alert('Please choose a date in the future');
//       Notify.failure('Please choose a date in the future');
//     } else {
//       buttonStart.removeAttribute('disabled');
//     }
//     console.log(selectedDates[0]);
//   },
// };

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      // refs.startBtn.disabled = false;
      buttonStart.removeAttribute('disabled');
      selectedTime = selectedDates[0];
    }
  },
};

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function updateComponentsTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
