// src/apis/authApi.ts
import type { LoginFormData, SignupFormData } from '../utils/validation';
import { axiosInstance } from './axios';

export const postSignup = (data: Omit<SignupFormData, 'confirmPassword'>) => {
  return axiosInstance.post('/v1/auth/signup', data);
};

export const postLogin = (data: LoginFormData) => {
  return axiosInstance.post('/v1/auth/signin', data); 
};

export const postLogout = () => {
  return axiosInstance.post('/v1/auth/signout'); 
};

export const getMyInfo = () => {
  return axiosInstance.get('v1/users/me'); 
};