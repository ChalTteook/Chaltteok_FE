import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}api/v1/auth/login`,
    {
        "email": email,
        "password": password
    });
    return response; 
  } catch (error) { 
    console.error('로그인 실패:', error);
    throw error;
  }
};
