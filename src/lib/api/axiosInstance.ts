import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/lib/constants';
import { logger } from '@/lib/logger';
import type { ApiError } from '@/types';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    logger.error('Request interceptor error', 'API', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    logger.error(`API Error [${status}]: ${message}`, 'API', {
      url: error.config?.url,
      method: error.config?.method,
      status,
    });

    if (status === 401) {
      sessionStorage.removeItem('accessToken');
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export { axiosInstance };
