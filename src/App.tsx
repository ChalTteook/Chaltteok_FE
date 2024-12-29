
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecoilRoot } from 'recoil';

import SocialLogin from './pages/SocialLogin';
import EmailLogin from './pages/EmailLogin';
import Join from './pages/Join';
import PhoneAuth from './pages/PhoneAuth';
import WelcomeJoin from './pages/WelcomeJoin';
import KakaoLogin from './services/KakaoLogin';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    (Text as any).defaultProps = {
      ...(Text as any).defaultProps,
      style: { fontFamily: 'PretendardJP-Regular' },
    };
  }, []);

    return (
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={SocialLogin}
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
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    );
  }

