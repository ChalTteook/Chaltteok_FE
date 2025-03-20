// src/navigation/ProfileStackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../pages/ProfilePage/ProfileScreen';
import { EditProfileScreen } from '../pages/ProfilePage/EditProfileScreen';
import TermsOfServiceScreen from '../pages/ProfilePage/support/TermsOfServiceScreen.tsx';

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;