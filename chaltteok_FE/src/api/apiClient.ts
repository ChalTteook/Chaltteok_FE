import axiosInstance from '../../../axiosInstance';

/**
 * 백엔드에 로그인 데이터 전송
 * @param accessToken 카카오 액세스 토큰
 */
export const sendLoginDataToBackend = async (accessToken: string) => {
  try {
    const response = await axiosInstance.post('/login', {
      token: accessToken,
    });

    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('백엔드 요청 에러:', error);
    throw new Error('백엔드 요청이 실패했습니다.');
  }
};
