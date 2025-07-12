import axiosInstance from '../../axiosInstance';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login',
    {
        "email": email,
        "password": password
    });
    return response; 
  } catch (error) { 
    console.error('로그인 실패:', error);
    throw error;
  }
};
