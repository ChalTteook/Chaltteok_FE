// filepath: /Users/idong-won/Documents/PROJECT/Chaltteok_FE/src/api/JoinAuth.ts
import axios from 'axios';

export const joinAuth = async (email: string, password: string, confirmPassword: string) => {
  try {
    const response = await axios.post('http://192.168.219.187:9801/auth/register', {
      email: email,
      password: password,
      passwordConfirm: confirmPassword
    });
    console.log('백엔드 응답:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('회원가입 실패:', error.message);
      if (error.response) {
        // 서버가 응답을 반환한 경우 (2xx 외의 상태 코드)
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
      } else if (error.request) {
        // 요청이 만들어졌으나 응답을 받지 못한 경우
        console.error('요청 데이터:', error.request);
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        console.error('오류 메시지:', error.message);
      }
    } else {
      console.error('예상치 못한 오류:', error);
    }
    throw error;
  } finally {
    console.log('요청이 완료되었습니다.');
  }
};