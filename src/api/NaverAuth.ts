import axios from 'axios';
import Constants from 'expo-constants';
import axiosInstance from '../../axiosInstance';

const REDIRECT_URI = Constants.expoConfig?.extra?.naverRedirectUri;
const BASE_URL = REDIRECT_URI?.replace(/\/$/, ''); // 끝의 슬래시 제거

export const sendTokenToBackend = async (authorizecode: string) => {
  try {
    const quotedAuthorizeCode = `"${authorizecode}"`;
    const response = await axiosInstance.post('/auth/social-login',
    {
      provider: "naver",
      code: authorizecode
    });
    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('axios.post social-login 실패:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        requestURL: error.config?.url,
        requestMethod: error.config?.method,
        requestData: error.config?.data
      });
    }
    throw error;
  }
};