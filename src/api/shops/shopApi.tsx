import axios from 'axios';
import Constants from 'expo-constants';
import axiosInstance from '../../../axiosInstance';

export const getAllShops = async () => {
  try {
    // baseURL이 이미 포함된 axiosInstance 사용
    const requestUrl = `/shops`;
    console.log('사진관 API 요청 URL:', axiosInstance.defaults.baseURL + requestUrl);
    
    // API 요청 전 현재 환경 및 baseURL 확인
    console.log('현재 환경:', Constants.expoConfig?.extra?.environment);
    console.log('baseURL 설정:', Constants.expoConfig?.extra?.baseURL);
    
    const response = await axiosInstance.get(requestUrl);
    console.log('사진관 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('사진관 정보 가져오기 실패:', error);
    
    // 더 자세한 에러 정보 로깅
    if (axios.isAxiosError(error)) {
      console.error('API 에러 세부정보:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        requestURL: error.config?.url,
        baseURL: error.config?.baseURL,
        requestMethod: error.config?.method
      });
    }
    
    throw error;
  }
};