import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = 'http://localhost:8080/api/v1';
axiosInstance.defaults.withCredentials = true;

export default axiosInstance