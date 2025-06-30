import axios from 'axios'

import { ACCESS_TOKEN } from './constants'

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/";
console.log(API_URL);

const api = axios.create({
  baseURL: API_URL ? API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config.headers.Authorization)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;