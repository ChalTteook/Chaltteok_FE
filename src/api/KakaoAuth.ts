import axios from 'axios';


export const sendTokenToBackend = async (accessToken: string, authorizeCode: string) => {
  try {
    const response = await axios.post('http://your-backend-url.com/api/auth/kakao', {
      access_token: accessToken,
      authorize_code: authorizeCode,
    });
    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('백엔드 요청 실패:', error);
    throw error;
  }
};
