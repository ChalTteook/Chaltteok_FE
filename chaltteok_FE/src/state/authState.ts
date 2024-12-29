import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',  // 고유한 key 이름 설정
  default: {
    isLoggedIn: false, 
    token: '',          
  },
});
