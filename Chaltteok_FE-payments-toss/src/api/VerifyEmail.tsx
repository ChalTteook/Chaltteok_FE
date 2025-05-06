import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const sendEmailVerificationCode = async (formattedEmail: string) => {  
  try {
    const response = await axios.post(`${BASE_URL}api/v1/common/send/email`,
    {
        "email": formattedEmail
    });
    return response; 

  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};
