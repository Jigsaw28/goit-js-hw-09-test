const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

body.style.minHeight = '100vh';

const onClickStart = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute("disabled", "true");
};

const onClickStop = () => {
    clearInterval(timerId);
    btnStart.removeAttribute("disabled");
    
    
};

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);
