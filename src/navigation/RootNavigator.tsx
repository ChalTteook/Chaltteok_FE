// filepath: /Users/idong-won/Documents/PROJECT/Chaltteok_FE/src/navigation/RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
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
  );
};

export default RootNavigator;