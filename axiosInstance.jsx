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


export default axiosInstance;
