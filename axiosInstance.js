import axios from 'axios';
import { getCookie, setCookie } from './src/utils/getCookie';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api',
//   withCredentials: true, 
// });
const api = axios.create({
  baseURL: 'https://dialecto-api.onrender.com/api',
  withCredentials: true, 
});

// Token refresh management
let isRefreshing = false;
let refreshSubscribers = [];

const onRefresh = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie('refreshToken');

      if (!refreshToken) {
        // No refresh token available, redirect to login or show session expired
        console.error('No refresh token available');
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await api.post('/refresh', {
            refreshToken,
          });
          const { accessToken } = response.data;

          setCookie('accessToken', accessToken, {
            expires: 1, // 1 day
            secure: true,
            sameSite: 'Strict'
          });

          onRefresh(accessToken);
          isRefreshing = false;
          
          // Retry the original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          console.error('Token refresh failed:', refreshError);
          
          // Clear tokens on refresh failure
          setCookie('accessToken', '', { expires: -1 });
          setCookie('refreshToken', '', { expires: -1 });
          
          // You can add custom logic here for session expiration handling
          // For example: window.location.href = '/login';
          
          return Promise.reject(refreshError);
        }
      }

      // If refresh is already in progress, queue this request
      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
