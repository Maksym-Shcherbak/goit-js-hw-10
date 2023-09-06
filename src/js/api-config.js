import axios from 'axios';
export const header = (axios.defaults.headers.common['x-api-key'] =
  'live_ArwZ5FQbdEO9JEaPL9lt29Bd5vQ1BQWcfYtXLyZyQUO1zLKhna3wIM9pin9mvn0g');
export const BASE_URL = (axios.defaults.baseURL =
  'https://api.thecatapi.com/v1/');
