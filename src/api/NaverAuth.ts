import axios from 'axios';

export const sendTokenToBackend = async (authorizecode: string) => {
  try {
    const quotedAuthorizeCode = `"${authorizecode}"`;
    const response = await axios.post('https://39a9-112-218-106-221.ngrok-free.app/auth/social-login',
    {
      "socialLoginType":"NAVER",
      "code":quotedAuthorizeCode
    });
    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('백엔드 요청 실패:', error);
    throw error;
  }
};