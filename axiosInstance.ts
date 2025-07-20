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

// 요청 인터셉터 - 로깅 및 향후 토큰 추가 가능
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: 인증 토큰이 필요하면 여기에 추가
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    console.log(`[${new Date().toISOString()}] Axios 요청:`, {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      hasAuth: !!config.headers.Authorization,
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

    // 401 Unauthorized 에러 처리 (토큰 만료 등)
    if (error.response?.status === 401) {
      console.log('[Axios] 401 에러 - 토큰 만료 또는 인증 실패');
      // TODO: 로그아웃 처리나 토큰 갱신 로직을 추가할 수 있습니다
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;