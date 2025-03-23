import axios from 'axios';
import Constants from 'expo-constants';


const BASE_URL = Constants.expoConfig?.extra?.baseURL || 'http://43.201.211.39/';

export const updateUserProfile = async (
  token: string,
  profileData: { nickName?: string; name?: string; phone?: string }
) => {
  try {
    const response = await axios.patch(`${BASE_URL}api/v1/user/me/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    throw error; // 에러 발생 시 throw
  }
};