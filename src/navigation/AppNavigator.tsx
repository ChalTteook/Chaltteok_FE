import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import NotificationScreen from '../pages/NotificationPage/Notification';
import StudioPage from '../pages/StudioPage/StudioPage';
import ReservationScreen from '../pages/ReservationPage/ReservationScreen';
import ReservationDetailScreen from '../pages/ReservationPage/ReservationDetailScreen';
import PaymentScreen from '../pages/ReservationPage/PaymentScreen';
import PaymentSuccessScreen from '../pages/ReservationPage/PaymentSuccessScreen';
<<<<<<< HEAD
import ProfileScreen from '../pages/ProfilePage/ProfileScreen'; // ProfileScreen으로 수정
=======
import ProfilePage from '../pages/ProfilePage/ProfileScreen';
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
<<<<<<< HEAD
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="StudioPage" component={StudioPage} options={{ headerShown: false }} />
      <Stack.Screen name="ReservationPage" component={ReservationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ReservationDetailPage" component={ReservationDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfilePage" component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
=======
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StudioPage" component={StudioPage} options={{ headerShown: false }} />
        <Stack.Screen name="ReservationPage" component={ReservationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReservationDetailPage" component={ReservationDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} options={{ headerShown: false }} />       
        <Stack.Screen name="ProfilePage" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1
  );
};

export default AppNavigator;