import axios from 'axios';
import { BASE_URL, header } from './api-config';
export function fetchBreeds(elem_1) {
  elem_1.classList.remove('visually-hidden');
  return axios('breeds').then(res => {
    if (res.data) {
      return res.data;
    }
    throw new Error(res.status);
  });
}

export function fetchCatByBreed(breedId, elem_1, elem_2) {
  elem_1.classList.remove('visually-hidden');
  elem_2.classList.add('visually-hidden');
  return axios('images/search?breed_ids=' + `${breedId}`).then(res => {
    if (res.data) {
      return res.data;
    }
    throw new Error(res.status);
  });
}
