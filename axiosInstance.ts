import axios from 'axios';
import Constants from 'expo-constants';

// Access baseURL from the expoConfig.extra
const baseURL = Constants.expoConfig?.extra?.baseURL || 'https://chaltteok.com/api/v1';
console.log('Using API baseURL:', baseURL);

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Axios 요청:', config);
    return config;
  },
  (error) => {
    console.error('Axios 요청 오류:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios 응답:', response);
    return response;
  },
  (error) => {
    console.error('Axios 응답 오류:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;