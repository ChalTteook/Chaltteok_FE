import { useEffect } from 'react';
import { Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './navigation/LoginNavigator';
import AppNavigator from './navigation/AppNavigator';
import RootNavigator from './navigation/RootNavigator';

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={RootNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
