import axios from 'axios';

const API_URL = 'http://localhost:9999';

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getProjects = (token) => axios.get(`${API_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
export const getEmployeesByDepartment = (deptId, token) => axios.get(`${API_URL}/employees/${deptId}`, { headers: { Authorization: `Bearer ${token}` } });
export const createProject = (projectData, token) => axios.post(`${API_URL}/projects`, projectData, { headers: { Authorization: `Bearer ${token}` } });
export const getDepartments = (token) => axios.get(`${API_URL}/departments`, { headers: { Authorization: `Bearer ${token}` } });
export const createDepartment = (departmentData, token) => axios.post(`${API_URL}/departments`, departmentData, { headers: { Authorization: `Bearer ${token}` } });
