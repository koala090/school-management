// frontend/src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password })
};

export const notesAPI = {
  getNotes: () => api.get('/notes'),
  getStats: (studentId) => api.get(`/notes/stats/${studentId}`),
  createNote: (data) => api.post('/notes', data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`)
};

export const absencesAPI = {
  getAbsences: () => api.get('/absences'),
  getStats: (studentId) => api.get(`/absences/stats/${studentId}`), // ✅ AJOUT
  createAbsence: (data) => api.post('/absences', data),
  updateAbsence: (id, data) => api.put(`/absences/${id}`, data),
  deleteAbsence: (id) => api.delete(`/absences/${id}`)
};

export default api;