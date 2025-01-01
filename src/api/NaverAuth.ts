import axios from 'axios';

export const sendNaverTokensToBackend = async (
  accessToken: string,
  refreshToken: string,
  authorizeCode: string
) => {
  try {
    const response = await axios.post('http://your-backend-url.com/api/auth/naver', {
      access_token: accessToken,
      refresh_token: refreshToken,
      authorize_code: authorizeCode,
    });

    console.log('백엔드 응답:', response.data);
    return response.data; 
  } catch (error) {
    console.error('백엔드 전송 실패:', error);
    throw error; 
  }
};
