import axios from 'axios';

export const joinAuth = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://your-backend-api.com/register',
    {
        "email":email,
        "password":password
    });
    return response.data; 
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
