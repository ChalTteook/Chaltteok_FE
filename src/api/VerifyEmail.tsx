import axiosInstance from '../../axiosInstance';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const sendEmailVerificationCode = async (formattedEmail: string) => {  
  try {
    const response = await axiosInstance.post('/common/send/email',
    {
        "email": formattedEmail
    });
    return response; 

  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};
