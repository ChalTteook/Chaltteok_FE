import axios from 'axios';

export const sendVerificationCode = async (formattedPhoneNumber: string, codeToSend: string) => {  
  console.log(    {
    "phone": formattedPhoneNumber,
    "authcode": codeToSend
})
  
  try {
    const response = await axios.post('https://39a9-112-218-106-221.ngrok-free.app/user/verify-phone',
    {
        "phone": formattedPhoneNumber,
        "authcode": codeToSend
    });
    console.log('백엔드 응답:', response.data);
    return response.data; 

  } catch (error) {
    console.error('전송 실패:', error);
    throw error;
  }
};
