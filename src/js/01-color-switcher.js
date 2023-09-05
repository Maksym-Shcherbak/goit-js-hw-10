const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;
stopBtn.disabled = true;
startBtn.addEventListener('click', onAutoChangeColor);
stopBtn.addEventListener('click', stopAutoChangeColor);

function onAutoChangeColor() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
  intervalId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
  //startBtn.removeEventListener('click', onAutoChangeColor);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopAutoChangeColor() {
  clearInterval(intervalId);
  //startBtn.addEventListener('click', onAutoChangeColor);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
