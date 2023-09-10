import axios from 'axios';
import { BASE_URL, header } from './api-config';
export function fetchBreeds() {
  return axios('breeds').then(res => {
    if (res.data) {
      return res.data;
    }
    throw new Error(res.status);
  });
}

export function fetchCatByBreed(breedId) {
  return axios('images/search?breed_ids=' + `${breedId}`).then(res => {
    if (res.data) {
      return res.data;
    }
    throw new Error(res.status);
  });
}
