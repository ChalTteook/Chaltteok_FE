import React from 'react';
import { RecoilRoot } from 'recoil';
import Login from './pages/emailLogin';

export default function App() {
  return (
    <RecoilRoot>
      <Login />
    </RecoilRoot>
  );
}