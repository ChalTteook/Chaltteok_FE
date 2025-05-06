import axios from 'axios';
import Constants from 'expo-constants';

const REDIRECT_URI = Constants.expoConfig?.extra?.naverRedirectUri;

export const sendTokenToBackend = async (authorizecode: string) => {
  try {
    const quotedAuthorizeCode = `"${authorizecode}"`;
    const response = await axios.post(`${REDIRECT_URI}api/v1/auth/social-login`,
    {
      provider: "naver",
      code: authorizecode
    });
    console.log('백엔드 응답:', response.data);
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