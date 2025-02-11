// filepath: /Users/idong-won/Documents/PROJECT/Chaltteok_FE/src/navigation/LoginNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SocialLogin from '../pages/SocialLogin';
import EmailLogin from '../pages/EmailLogin';
import Join from '../pages/Join';
import PhoneAuth from '../pages/PhoneAuth';
import WelcomeJoin from '../pages/WelcomeJoin';
import ProfileEdit from '../pages/ProfileEdit';
import KakaoLogin from '../services/KakaoLogin';
import NaverLogin from '../services/NaverLogin';

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