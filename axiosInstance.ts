import axios from 'axios';
import Constants from 'expo-constants';

// Access baseURL from the expoConfig.extra and append /api/v1
const baseURL = Constants.expoConfig?.extra?.baseURL || 'https://chaltteok.com';
const fullBaseURL = `${baseURL}/api/v1`;
console.log('Using API baseURL:', fullBaseURL);

const axiosInstance = axios.create({
  baseURL: fullBaseURL,
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