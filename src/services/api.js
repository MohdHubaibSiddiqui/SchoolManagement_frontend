import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => API.post('/auth/login', data);
export const getDashboard = (month) => API.get('/dashboard', { params: month ? { month } : {} });
export const getReport = (month) => API.get('/reports/monthly', { params: { month } });
export const getClasses = () => API.get('/classes');
export const createClass = (data) => API.post('/classes', data);
export const updateClass = (id, data) => API.put(`/classes/${id}`, data);
export const deleteClass = (id) => API.delete(`/classes/${id}`);
export const getStudents = (params = {}) => API.get('/students', { params });
export const getStudent = (id) => API.get(`/students/${id}`);
export const createStudent = (data) => API.post('/students', data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);
export const getFees = (params = {}) => API.get('/fees', { params });
export const getFeeStructures = () => API.get('/fees/structures');
export const payFee = (id, data = {}) => API.patch(`/fees/${id}/pay`, data);
export const getFinanceUsers = () => API.get('/finance-users');
export const createFinanceUser = (data) => API.post('/finance-users', data);
export const updateFinanceUser = (id, data) => API.put(`/finance-users/${id}`, data);
export const deleteFinanceUser = (id) => API.delete(`/finance-users/${id}`);
export const getAdminUsers = () => API.get('/admin');
export default API;
