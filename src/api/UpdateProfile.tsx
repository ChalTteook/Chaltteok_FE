import axiosInstance from '../../axiosInstance';

export const updateUserProfile = async (
  token: string,
  profileData: { nickName?: string; name?: string; phone?: string }
) => {
  try {
    const response = await axiosInstance.patch('/user/me/profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    throw error; // 에러 발생 시 throw
  }
};