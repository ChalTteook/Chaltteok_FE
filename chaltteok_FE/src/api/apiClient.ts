import axios from 'axios';

const BASE_URL = 'https://your-backend-url.com/api';

/**
 * 백엔드에 로그인 데이터 전송
 * @param accessToken 카카오 액세스 토큰
 */
export const sendLoginDataToBackend = async (accessToken: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      token: accessToken,
    });

    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('백엔드 요청 에러:', error);
    throw new Error('백엔드 요청이 실패했습니다.');
  }
};
