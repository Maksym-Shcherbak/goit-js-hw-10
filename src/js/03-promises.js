import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formForCreatePromises = document.querySelector('.form');

const STORAGE_KEY = 'userDataPromise';
let promiseData = {};
const {
  elements: { delay, step, amount },
} = formForCreatePromises;

formForCreatePromises.addEventListener('submit', onCreatePromises);
formForCreatePromises.addEventListener(
  'input',
  throttle(savePromisesValues, 1000)
);

restorePromisesInputs();

function savePromisesValues(e) {
  promiseData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(promiseData));
}

function restorePromisesInputs() {
  const savedPromiseData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedPromiseData) {
    setInputValue(delay, savedPromiseData);
    setInputValue(step, savedPromiseData);
    setInputValue(amount, savedPromiseData);
    setObjectValue(delay, promiseData, savedPromiseData);
    setObjectValue(step, promiseData, savedPromiseData);
    setObjectValue(amount, promiseData, savedPromiseData);
  }
}

function onCreatePromises(e) {
  e.preventDefault();
  let { delayValue, stepValue, amountValue } = getValuesFromForm();
  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue).then(onSucces).catch(onError);
    delayValue += stepValue;
  }
  e.currentTarget.reset();
  resetValues();
}

function resetValues() {
  promiseData = {};
  localStorage.removeItem(STORAGE_KEY);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });
}

function getValuesFromForm() {
  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);
  return { delayValue, stepValue, amountValue };
}

function setInputValue(input, dataFromLocaleStorage) {
  input.value = dataFromLocaleStorage[input.name] || '';
}

function setObjectValue(input, object, dataFromLocaleStorage) {
  object[input.name] = dataFromLocaleStorage[input.name] || '';
}

function onSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
