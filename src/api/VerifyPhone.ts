import axios from 'axios';

export const sendVerificationCode = async (phoneNumber: string) => {
  try {
    const response = await axios.post('https://your-backend-api.com/',
    {
        "phoneNumber": phoneNumber
    });
    return response.data; 
  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};

export const verifyPhoneNumber = async (phoneNumber: string, verificationCode: string) => {
  try {
    const response = await axios.post('https://your-backend-api.com/',
    {
        "phoneNumber": phoneNumber,
        "verificationCode": verificationCode
    });
    return response.data; 
  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};
