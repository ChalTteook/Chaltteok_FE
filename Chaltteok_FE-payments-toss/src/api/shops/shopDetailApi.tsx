import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const getStudioInfo = async (studioId: string) => {
  try {
    console.log("id: ", studioId);
    const response = await axios.get(`${BASE_URL}api/v1/shops/${studioId}`, {
    });
    console.log("사진관 상세 정보:", response.data);
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error('사진관 정보 가져오기 실패:', error);
    throw error; // 에러 발생 시 throw
  }
};