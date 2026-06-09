import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const apiClient = axios.create({
  baseURL: 'https://linked-posts.routemisr.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to automatically add token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    // Note: API doc says "Headers: token"
    config.headers.token = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Global error handling, e.g., token expiration
  if (error.response?.status === 401) {
    useAuthStore.getState().logout();
  }
  return Promise.reject(error);
});
