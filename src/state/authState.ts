import { atom } from 'recoil';

interface AuthState {
  userEmail: string | null;
  isLoggedIn: boolean;
  token: string | null;
  nickname: string | null;
  name: string | null;
  phoneNumber: string | null;
}

export const authState = atom<AuthState>({
  key: 'authState',  // 고유한 key 이름 설정
  default: {
    userEmail: null,
    isLoggedIn: false, 
    token: null,      
    nickname: null,        // 닉네임 추가
    name: null,            // 이름 추가
    phoneNumber: null,     // 연락처 추가
  },
});
