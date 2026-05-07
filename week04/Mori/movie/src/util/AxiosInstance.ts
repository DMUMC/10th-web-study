import axios from 'axios'

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined

export const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

apiClient.interceptors.request.use((config) => {
  if (apiKey) {
    config.params = { ...config.params, api_key: apiKey }
  }
  return config
})
