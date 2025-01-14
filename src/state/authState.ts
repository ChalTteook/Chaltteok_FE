import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',  
  default: {
    userEmail: '',
    isLoggedIn: false,         
  },
});
