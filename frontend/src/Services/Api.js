import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const customerApi = {
  getAll: () => api.get('/customer'),
  getById: (id) => api.get(`/customer/${id}`),
  create: (data) => api.post('/customer', data),
  update: (id, data) => api.put(`/customer/${id}`, data),
  delete: (id) => api.delete(`/customer/${id}`),
};

export const trainerApi = {
  getAll: () => api.get('/trainer'),
  getById: (id) => api.get(`/trainer/${id}`),
  create: (data) => api.post('/trainer', data),
  update: (id, data) => api.put(`/trainer/${id}`, data),
  delete: (id) => api.delete(`/trainer/${id}`),
};

export const subscriptionApi = {
  getAll: () => api.get('/subscription'),
  getById: (id) => api.get(`/subscription/${id}`),
  create: (data) => api.post('/subscription', data),
  update: (id, data) => api.put(`/subscription/${id}`, data),
  delete: (id) => api.delete(`/subscription/${id}`),
};

export default api;
