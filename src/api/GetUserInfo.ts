import axiosInstance from '../../axiosInstance';

export const getUserInfo = async (token: string) => {
  try {
    const response = await axiosInstance.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
      },
    });
    console.log("사용자 정보:", response.data)
    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error; // 에러 발생 시 throw
  }
};