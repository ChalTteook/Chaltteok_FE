# API 연동 가이드

## 📋 개요

이 문서는 Chaltteok FE 앱의 API 연동 방법과 설정에 대해 설명합니다.

## 🏗️ 현재 구조

### 1. API 설정 파일
- `src/config/api.ts` - API 설정 및 타입 정의
- `axiosInstance.ts` - Axios 인스턴스 설정
- `src/api/userApi.ts` - 사용자 관련 API 함수들

### 2. Mock API 지원
- 개발 모드에서 자동으로 Mock API 사용
- 실제 API 연동 전 테스트 가능
- `API_CONFIG.USE_MOCK_API` 설정으로 제어

## 🔧 API 연동 단계

### 1단계: Mock API 테스트 (현재 상태)
```typescript
// 개발 모드에서 자동으로 Mock API 사용
const profile = await getMyProfile(); // Mock 데이터 반환
```

### 2단계: 실제 API 연동
```typescript
// src/config/api.ts에서 설정 변경
export const API_CONFIG = {
  USE_MOCK_API: false, // 실제 API 사용
  BASE_URL: 'https://your-api-domain.com',
  // ...
};
```

### 3단계: 인증 토큰 추가
```typescript
// axiosInstance.ts에서 토큰 처리 추가
const token = await getAuthToken();
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## 📡 API 엔드포인트

### 사용자 프로필 API
- `GET /api/v1/user/me` - 기본 사용자 정보
- `GET /api/v1/user/me/profile` - 상세 프로필 정보
- `PATCH /api/v1/user/me/profile` - 프로필 수정
- `POST /api/v1/user/change-password` - 비밀번호 변경
- `POST /api/v1/user/me/profile-image` - 프로필 이미지 업로드
- `DELETE /api/v1/user/me/profile-image` - 프로필 이미지 삭제

## 🧪 테스트 방법

### 1. Mock API 테스트
```bash
# 개발 모드로 실행
npm run android:dev

# 프로필 수정 화면에서 테스트
# - 현재 Mock 데이터가 로드됨
# - 수정 후 Mock 응답 확인
```

### 2. 실제 API 테스트
```bash
# 프로덕션 모드로 실행
npm run android:release:local

# 실제 API 서버와 통신
# - 네트워크 로그 확인
# - API 응답 확인
```

### 3. 로그 확인
```bash
# React Native 로그 확인
adb logcat | grep ReactNativeJS

# Axios 요청/응답 로그 확인
adb logcat | grep Axios
```

## 🔍 디버깅

### 1. 네트워크 요청 확인
- `axiosInstance.ts`에서 모든 요청/응답이 로깅됨
- 콘솔에서 `[Axios 요청]`, `[Axios 응답]` 로그 확인

### 2. 에러 처리
- 401 에러: 인증 실패
- 403 에러: 권한 없음
- 404 에러: 리소스 없음
- 500 에러: 서버 오류

### 3. 타임아웃 설정
- 기본 10초 타임아웃
- `API_CONFIG.TIMEOUT`에서 조정 가능

## 🚀 실제 연동 시 체크리스트

### [ ] 1. API 서버 준비
- [ ] API 서버가 `https://chaltteok.com`에서 실행 중
- [ ] CORS 설정 완료
- [ ] API 문서 확인

### [ ] 2. 인증 시스템
- [ ] JWT 토큰 발급/검증 시스템
- [ ] 토큰 저장소 구현 (AsyncStorage 등)
- [ ] 토큰 갱신 로직

### [ ] 3. 에러 처리
- [ ] 네트워크 오류 처리
- [ ] 서버 오류 처리
- [ ] 사용자 친화적 에러 메시지

### [ ] 4. 보안
- [ ] HTTPS 사용
- [ ] 토큰 보안 저장
- [ ] 민감한 정보 암호화

## 📝 예시 코드

### 프로필 수정 예시
```typescript
import { updateMyProfile } from '../api/userApi';

const handleProfileUpdate = async () => {
  try {
    const response = await updateMyProfile({
      nickname: "새닉네임",
      name: "홍길동",
      phone: "01012345678"
    });
    
    console.log('프로필 업데이트 성공:', response.data);
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
  }
};
```

### 에러 처리 예시
```typescript
try {
  const response = await getMyProfile();
} catch (error: any) {
  if (error.response?.status === 401) {
    // 인증 오류 처리
    navigation.navigate('Login');
  } else if (error.response?.status === 500) {
    // 서버 오류 처리
    Alert.alert('오류', '서버 오류가 발생했습니다.');
  } else {
    // 기타 오류 처리
    Alert.alert('오류', '알 수 없는 오류가 발생했습니다.');
  }
}
```

## 🔄 Mock API에서 실제 API로 전환

1. **API 서버 준비 확인**
2. **`src/config/api.ts`에서 `USE_MOCK_API: false` 설정**
3. **인증 토큰 시스템 구현**
4. **테스트 및 검증**
5. **에러 처리 보완**

## 📞 지원

API 연동 관련 문의사항이 있으면 개발팀에 문의해주세요. 