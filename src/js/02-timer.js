import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnEl.setAttribute('disabled', true);

let timerId = null;
let choiceDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onChoice(selectedDates[0]);
    console.log(selectedDates[0]);
  },
};

flatpickr(inputEl, options);

function onChoice(selectedDates) {
  choiceDate = selectedDates.getTime();
  if (selectedDates < Date.now()) {
    Notiflix.Report.info('Please choose a date in the future');
    btnEl.setAttribute('disabled', true);
  } else if (selectedDates >= Date.now()) {
    btnEl.removeAttribute('disabled');
  }
}

const onClickBtnStart = () => {
  timerId = setInterval(onTimerStart, 1000);
};

function onTimerStart() {
  const deltaTime = choiceDate - Date.now();
  const timeComponent = convertMs(deltaTime);
  const { days, hours, minutes, seconds } = timeComponent;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);

  if (daysEl.textContent > days) {
    daysEl.textContent = days;
  }
  daysEl.textContent = addLeadingZero(days);

  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '00'
  ) {
    Notiflix.Report.success('Time is Over');
    clearInterval(timerId);
    btnEl.removeAttribute('disabled');
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
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
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnEl.addEventListener('click', onClickBtnStart);
