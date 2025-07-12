import axios from 'axios';
import Constants from 'expo-constants';

// Access baseURL from the expoConfig.extra and append /api/v1
const baseURL = Constants.expoConfig?.extra?.baseURL || 'https://chaltteok.com';
const fullBaseURL = `${baseURL}/api/v1`;
console.log('Environment:', Constants.expoConfig?.extra?.environment);
console.log('Using API baseURL:', fullBaseURL);

const axiosInstance = axios.create({
  baseURL: fullBaseURL,
  timeout: 10000, // 10초 타임아웃 추가
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[${new Date().toISOString()}] Axios 요청:`, {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    });
    return config;
  },
  (error) => {
    console.error('[Axios] 요청 오류:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[${new Date().toISOString()}] Axios 응답 성공:`, {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    console.error(`[${new Date().toISOString()}] Axios 응답 오류:`, {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;