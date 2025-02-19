import axios from 'axios';
import Constants from 'expo-constants';

const REDIRECT_URI = Constants.expoConfig?.extra?.kakaoRedirectUri;

export const sendTokenToBackend = async (authorizecode: string) => {
  try {
    const quotedAuthorizeCode = `"${REDIRECT_URI}api/v1/auth/social-login"`;
    const response = await axios.post(`${REDIRECT_URI}api/v1/auth/social-login`, {
      provider: "kakao",
      code: authorizecode
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('axios.post social-login 실패:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        requestURL: error.config?.url,
        requestMethod: error.config?.method,
        requestData: error.config?.data
      });
    }
    throw error;
  }
};

