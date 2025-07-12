import axiosInstance from '../../../axiosInstance';

export const logoutUser = async (token: string) => {
  try {
    const response = await axiosInstance.post('/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};