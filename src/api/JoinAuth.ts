// filepath: /Users/idong-won/Documents/PROJECT/Chaltteok_FE/src/api/JoinAuth.ts
import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const joinAuth = async (email: string, password: string, username: string) => {
  try {
    console.log('회원가입 시도:', { email, password, username });
    console.log('BASE_URL:', `${BASE_URL}api/v1/auth/register`);
    
    const response = await axios.post(`${BASE_URL}api/v1/auth/register`, {
      email,
      password,
      username
    });
    
    console.log('회원가입 응답:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('회원가입 실패:', {
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