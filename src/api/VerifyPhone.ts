import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.baseURL;

export const sendVerificationCode = async (formattedPhoneNumber: string) => {    
  try {
    const response = await axios.post(`${BASE_URL}api/v1/common/send/auth`,
    {
        "phone_number": formattedPhoneNumber
    });
    return response; 

  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};
