// src/axiosInstance.js
import axios from 'axios';
import React, { useContext } from 'react';
import {AuthContext} from './src/dialecto_backend/authContext';
import {getCookie} from './src/dialecto_backend/getCookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

let isRefreshing = false;
let refreshUser = []

const onRefresh = (accessToken) => {
  refreshUser.forEach(callback => callback(accessToken));
  refreshUser = [];
}

const addUser = (callback) => {
    refreshUser.push(callback);
}

// Request interceptor to include the token in every request
axiosInstance.interceptors.request.use((config) => {
    const token = getCookie('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    const { logout, showSessionExpiredPopup } = useContext(AuthContext);
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie('refreshToken');
       if (!isRefreshing) {
            isRefreshing = true;
            
        try {
            const response = await axiosInstance.post('/refresh-token', {refreshToken} );
            const { accessToken } = response.data;

            document.cookie = `accessToken=${accessToken}; Path=/; `;
            onRefresh(accessToken);
            isRefreshing = false;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            isRefreshing = false;
            showSessionExpiredPopup();// Log out on refresh token failure
            return Promise.reject(refreshError);
        }
    }
    return new Promise((resolve) => {
      addUser((newToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
      });
  });
}
return Promise.reject(error);
});

export default axiosInstance;
