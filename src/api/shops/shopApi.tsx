import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL || 'http://43.201.211.39/';

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}api/v1/shops`, {
    });
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error('사진관 정보 가져오기 실패:', error);
    throw error; // 에러 발생 시 throw
  }
};