import axiosInstance from '../../axiosInstance';

export const sendVerificationCode = async (formattedPhoneNumber: string) => {    
  try {
    const response = await axiosInstance.post('/common/send/auth',
    {
        "phone_number": formattedPhoneNumber
    });
    return response; 

  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};
