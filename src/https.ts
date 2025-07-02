import axios from 'axios';
export const axiosBaseURL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL? process.env.REACT_APP_API_BASE_URL : "http://192.168.1.227:8000/",
});