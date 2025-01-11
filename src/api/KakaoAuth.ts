import axios from 'axios';

export const sendTokenToBackend = async (authorizecode: string) => {
  try {
    const quotedAuthorizeCode = `"${authorizecode}"`;
    const response = await axios.post('p/auth/social-login', {
      socialLoginType: "KAKAO",
      code: quotedAuthorizeCode
    });
    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('백엔드 요청 실패:', error);
    throw error;
  }
};

