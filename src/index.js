import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { fillSelectBreeds, renderingCatInfo } from './js/render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

const breeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

breeds.classList.add('visually-hidden');
loader.classList.remove('visually-hidden');
fetchBreeds()
  .then(catBreeds => {
    fillSelectBreeds(catBreeds, breeds);
    breeds.classList.remove('visually-hidden');
    loader.classList.add('visually-hidden');
    new SlimSelect({
      select: breeds,
      settings: {
        placeholderText: 'Choose your kitty',
      },
    });
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
      const [breed] = cat;
      const { breeds, url } = breed;
      const [catBreeds] = breeds;
      const { name, description, temperament } = catBreeds;
      renderingCatInfo(url, name, description, temperament, catInfo);
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
