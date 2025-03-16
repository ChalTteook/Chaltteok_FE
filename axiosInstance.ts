import axios from 'axios';
import Constants from 'expo-constants';

const axiosInstance = axios.create({
  baseURL: Constants.manifest?.extra?.apiBaseUrl, // 환경 변수 사용
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