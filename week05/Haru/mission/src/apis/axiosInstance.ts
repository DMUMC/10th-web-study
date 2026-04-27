import axios, { type InternalAxiosRequestConfig } from 'axios';

interface CustomConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

export const axiosInstance = axios.create({
    baseURL: '여러분의_서버_주소', 
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
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
                        const refreshToken = localStorage.getItem('refreshToken');
                        const res = await axios.post('서버_주소/v1/auth/refresh', { refresh: refreshToken });
                        
                        const { accessToken, refreshToken: newRefresh } = res.data.data;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', newRefresh);
                        
                        return accessToken;
                    } catch (e) {
                       
                        localStorage.clear();
                        window.location.href = '/login';
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