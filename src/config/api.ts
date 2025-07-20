// API 설정 관리
export const API_CONFIG = {
  // API Base URL
  BASE_URL: 'https://chaltteok.com',
  
  // API 버전
  API_VERSION: 'v1',
  
  // 타임아웃 설정 (ms)
  TIMEOUT: 10000,
  
  // 재시도 횟수
  RETRY_COUNT: 3,
  
  // 개발 모드에서 Mock API 사용 여부
  USE_MOCK_API: __DEV__, // 개발 모드에서만 true
  
  // API 엔드포인트
  ENDPOINTS: {
    // 사용자 관련
    USER: {
      ME: '/api/v1/user/me',
      PROFILE: '/api/v1/user/me/profile',
      CHANGE_PASSWORD: '/api/v1/user/change-password',
      PROFILE_IMAGE: '/api/v1/user/me/profile-image',
    },
    
    // 인증 관련
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      LOGOUT: '/api/v1/auth/logout',
      REFRESH: '/api/v1/auth/refresh',
    },
    
    // 스튜디오 관련
    STUDIO: {
      LIST: '/api/v1/studios',
      DETAIL: (id: string) => `/api/v1/studios/${id}`,
      RESERVATION: '/api/v1/reservations',
    },
  },
  
  // 에러 메시지
  ERROR_MESSAGES: {
    NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
    TIMEOUT_ERROR: '요청 시간이 초과되었습니다.',
    SERVER_ERROR: '서버 오류가 발생했습니다.',
    UNAUTHORIZED: '인증이 필요합니다.',
    FORBIDDEN: '접근 권한이 없습니다.',
    NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
    VALIDATION_ERROR: '입력 정보를 확인해주세요.',
  },
};

// API 응답 타입 정의
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 사용자 프로필 타입 (확장)
export interface UserProfile {
  id?: string;
  nickname?: string;
  name?: string;
  phone?: string;
  email?: string;
  profileImage?: string | null;
  gender?: string | null; // '여성', '남성', '선택 안 함'
  birthDate?: string; // '1994년 4월 8일' 형식
  interests?: number[]; // 관심사 인덱스 배열
  region?: string; // 관심 지역
  createdAt?: string;
  updatedAt?: string;
}

// 프로필 업데이트 요청 타입 (확장)
export interface UpdateProfileRequest {
  nickname?: string;
  name?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  interests?: number[];
  region?: string;
}

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
} 