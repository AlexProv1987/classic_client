import axios,{AxiosRequestConfig} from 'axios';
import { sessionManager } from './utils/session-manager';

export const axiosBaseURL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL? process.env.REACT_APP_API_BASE_URL : "http://192.168.1.227:8000/",
});

export const getConfig = () => {
  let config:AxiosRequestConfig
    return config = {
      headers: {
        'Authorization': `Token  ${sessionManager.getToken()}`,
        'Content-Type': 'application/json',
      }
    }
}