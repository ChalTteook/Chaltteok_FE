import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SocialLogin from '../pages/LoginPage/LoginPage';
import EmailLogin from '../pages/LoginPage/EmailLogin';
import Join from '../pages/LoginPage/Join';
import PhoneAuth from '../pages/LoginPage/PhoneAuth';
import WelcomeJoin from '../pages/LoginPage/WelcomeJoin';
import ProfileEdit from '../pages/ProfileEdit';
import KakaoLogin from '../services/KakaoLogin';
import NaverLogin from '../services/NaverLogin';
import FindEmail from '../pages/LoginPage/FindEmail';
import FindPassword from '../pages/LoginPage/FindPassword';

const Stack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SocialLogin">
      <Stack.Screen
        name="SocialLogin"
        component={SocialLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailLogin"
        component={EmailLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Join"
        component={Join}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindEmail"
        component={FindEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindPassword"
        component={FindPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelcomeJoin"
        component={WelcomeJoin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KakaoLogin"
        component={KakaoLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NaverLogin"
        component={NaverLogin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;