import axiosInstance from '../../axiosInstance';

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
