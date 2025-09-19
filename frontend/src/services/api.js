import axios from 'axios';

// Completely remove import.meta.env for test environment
const API_BASE_URL = process.env.NODE_ENV === 'test' ? 'http://localhost:3000/api' : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // If the error is 401 Unauthorized and it's not a login/refresh request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token`, { refreshToken });
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Optionally, redirect to login page
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
