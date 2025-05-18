import axios from 'axios';
import Constants from 'expo-constants';
import axiosInstance from '../../../axiosInstance';

export const getStudioInfo = async (studioId: string) => {
  try {
    console.log("요청 사진관 ID:", studioId);
    
    // API 요청 전 현재 환경 및 baseURL 확인
    console.log('현재 환경:', Constants.expoConfig?.extra?.environment);
    console.log('baseURL 설정:', Constants.expoConfig?.extra?.baseURL);
    
    // URL 경로 수정 - `/api/v1`은 이미 axiosInstance에 포함되어 있음
    const requestUrl = `/shops/${studioId}`;
    console.log('상세 정보 API 요청 URL:', axiosInstance.defaults.baseURL + requestUrl);
    
    const response = await axiosInstance.get(requestUrl);
    console.log("사진관 상세 정보:", response.data);
    return response.data;
  } catch (error) {
    console.error('사진관 상세 정보 가져오기 실패:', error);
    
    // 더 자세한 에러 정보 로깅
    if (axios.isAxiosError(error)) {
      console.error('API 에러 세부정보:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        requestURL: error.config?.url,
        baseURL: error.config?.baseURL,
        requestMethod: error.config?.method
      });
      
      // 404 에러일 경우 임시 데이터 반환 (개발 환경)
      if (error.response?.status === 404 && process.env.NODE_ENV !== 'production') {
        console.log('404 에러 - 테스트용 임시 데이터 사용');
        return {
          data: {
            id: studioId,
            title: '테스트 사진관',
            address: '서울시 마포구 예시로 123',
            description: '테스트 사진관 설명',
            img: 'https://via.placeholder.com/150',
            price: '30,000원~',
            open_time: '09:00',
            close_time: '18:00',
            phone_number: '02-123-4567',
            is_partner: 1
          },
          success: true
        };
      }
    }
    
    throw error;
  }
};