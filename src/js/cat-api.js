import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_ArwZ5FQbdEO9JEaPL9lt29Bd5vQ1BQWcfYtXLyZyQUO1zLKhna3wIM9pin9mvn0g';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios('breeds').then(res => {
    if (res.data) {
      return res.data;
    }
    throw new Error(res.status);
  });
}

export function fetchCatByBreed(breedId) {
  return axios('images1/search?breed_ids=' + `${breedId}`).then(res => {
    if (res.data) {
      return res.data;
    }
    throw new Error(res.status);
  });
}
