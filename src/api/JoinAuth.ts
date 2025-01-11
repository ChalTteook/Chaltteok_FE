import axios from 'axios';

export const joinAuth = async (email: string, password: string, confirmPassword: string) => {
  try {
    const response = await axios.post('https://39a9-112-218-106-221.ngrok-free.app/auth/register',
    {
        "email": email,
        "password": password,
        "passwordConfirm": confirmPassword
    });
    console.log('백엔드 응답:', response.data);
    return response.data; 
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
