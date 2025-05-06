import axios from 'axios';

export const kakaoLogout = async (token: string) => {
  try {
    const response = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('카카오 로그아웃 실패:', error);
    throw error;
  }
};