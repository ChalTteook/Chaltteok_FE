// filepath: /Users/idong-won/Documents/PROJECT/Chaltteok_FE/src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();

// 딥링크 라우팅 설정
const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      // 실제 네비게이션 구조에 맞게 작성
      Login: 'login',
      Main: {
        screens: {
          // AppNavigator 내부의 스크린도 필요하면 추가
          PaymentSuccess: 'payment/success',
          PaymentFail: 'payment/fail',
        }
      }
    }
  }
};

const RootNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;