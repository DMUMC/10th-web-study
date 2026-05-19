import axios, { type InternalAxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEY } from "../constans/key";

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
            
            if (!refreshToken) {
              throw new Error("No refresh token");
            }

            const res = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`, { 
              refresh: refreshToken 
            });
            
            const { accessToken, refreshToken: newRefresh } = res.data.data;
            
            localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefresh);
            
            return accessToken;
          } catch (e) {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
            return null;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest); 
      }
    }
    return Promise.reject(error);
  }
);