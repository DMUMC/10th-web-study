import axios from 'axios';

const token = import.meta.env.VITE_TMDB_API_KEY;

export const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});