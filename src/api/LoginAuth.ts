import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://39a9-112-218-106-221.ngrok-free.app/auth/login',
    {
        "email": email,
        "password": password
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};
