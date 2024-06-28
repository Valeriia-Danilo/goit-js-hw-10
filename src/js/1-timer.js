import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const inputData = document.querySelector('#datetime-picker');

const timeElements = {
    day: document.querySelector('[data-days]'),
    hour: document.querySelector('[data-hours]'),
    minute: document.querySelector('[data-minutes]'),
    second: document.querySelector('[data-seconds]')
}

let userSelectedDate;
let interval;
startBtn.disabled = true;

const options = {
     enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
   dateFormat: "Y-m-d H:i",
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkDate(selectedDates);
    },
};

iziToast.settings({
    resetOnHover: true,
    icon: 'material-icons',
    class: 'custom-toast',
    icon: 'icon-person',
    color: '#ef4040',
    titleSize: '16px',
    titleColor: '#fff',
    titleLineHeight: '1.5',
    messageColor: '#fff',
    messageSize: '16px',
    messageLineHeight: '1.5',
    position: 'topRight',
    progressBarColor: '#b51b1b',
    iconUrl: './src/img/error-icon.svg',
    theme: 'light',
    progressBar: true,
    timeout: 2500,
    close: false,
    }
);

const currentTime = new Date();

function checkDate(selectedDates) {
const selectedDate = selectedDates[0];
        if (selectedDate < currentTime) {
            iziToast.show({
    title: 'Error',
    message: 'Please choose a date in the future',
});
        } else {
            userSelectedDate = selectedDate;
            startBtn.disabled = false;
        }
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


function updateTimer() {
    const now = new Date().getTime();
    const timeRemaining = userSelectedDate.getTime() - now;  
    if (timeRemaining <= 0) {
        clearInterval(interval);
        startBtn.disabled = false;
        inputData.disabled = false;
         return;
    } else {
   timeElements.day.innerText = String(convertMs(timeRemaining).days).padStart(2, '0');
   timeElements.hour.innerText = String(convertMs(timeRemaining).hours).padStart(2, '0');
   timeElements.minute.innerText = String(convertMs(timeRemaining).minutes).padStart(2, '0');
   timeElements.second.innerText = String(convertMs(timeRemaining).seconds).padStart(2, '0');
 }    
}

function btnSelected() {
    interval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
    inputData.disabled = true;

}

startBtn.addEventListener("click", btnSelected);