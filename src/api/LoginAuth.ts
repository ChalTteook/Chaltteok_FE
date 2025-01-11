import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://your-backend-api.com/login',
    {
        "email":email,
        "password":password
    });
    return response.data; 
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};
