import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import fillSelectBreeds from './js/render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
fetchBreeds()
  .then(catBreeds => {
    breeds.innerHTML = fillSelectBreeds(catBreeds);
  })
  .catch(error => {
    Notify.failure(error.message);
  });

breeds.addEventListener('change', createCatCard);

function createCatCard(e) {
  catInfo.classList.add('visually-hidden');
  loader.classList.remove('visually-hidden');
  fetchCatByBreed(e.target.value)
    .then(cat => {
      console.log(cat);
      const [breed] = cat;
      const { breeds, url } = breed;
      const [catBreeds] = breeds;
      const { name, description, temperament } = catBreeds;
      catInfo.innerHTML = `<img src='${url}' class='cat-info-img' alt='cat' width='320'><h2 class='cat-info-title'>${name}</h2><p class='cat-info-desc'>${description}</p><p class='cat-info-temp'>Temperament: ${temperament}</p>`;
      catInfo.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
    })
    .catch(error => {
      Notify.failure(error.message, {
        cssAnimationStyle: 'zoom',
        closeButton: true,
        position: 'center-top',
      });
    });
}
