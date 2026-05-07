import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    // headers: {
    //     Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    // }
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    // const token = getItem();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})