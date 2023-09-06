import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { fillSelectBreeds, renderingCatInfo } from './js/render';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

const breeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds(loader)
  .then(catBreeds => {
    breeds.classList.remove('visually-hidden');
    fillSelectBreeds(catBreeds, breeds);
    new SlimSelect({
      select: breeds,
      settings: {
        placeholderText: 'Choose your kitty',
      },
    });
  })
  .catch(error => {
    Notify.failure(error.message, {
      cssAnimationStyle: 'zoom',
      closeButton: true,
      position: 'center-top',
    });
  })
  .finally(() => {
    loader.classList.add('visually-hidden');
  });

breeds.addEventListener('change', createCatCard);

function createCatCard(e) {
  fetchCatByBreed(e.target.value, loader, catInfo)
    .then(cat => {
      const { breeds, url } = cat[0];
      const { name, description, temperament } = breeds[0];
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
    })
    .finally(() => {
      catInfo.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
    });
}
