import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const logoutUser = async (token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}api/v1/auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};