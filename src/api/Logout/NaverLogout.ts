import axios from 'axios';

export const naverLogout = async (token: string) => {
  try {
    const response = await axios.post('https://openapi.naver.com/v1/nid/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('네이버 로그아웃 실패:', error);
    throw error;
  }
};