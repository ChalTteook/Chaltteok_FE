import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomePage/HomeScreen';
import NearbyScreen from '../pages/NearbyPage/NearbyScreen';
import FavoriteScreen from '../pages/HomePage/FavoriteScreen';
import ProfileScreen from '../pages/ProfilePage/ProfileScreen';
import HomeIcon from 'react-native-vector-icons/Octicons';
import MapIcon from 'react-native-vector-icons/Feather';
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let IconComponent;

            if (route.name === '찰떡홈') {
              IconComponent = HomeIcon;
              iconName = 'home';
            } else if (route.name === '주변') {
              IconComponent = MapIcon;
              iconName = 'map';
            } else if (route.name === '찜') {
              IconComponent = FavoriteIcon;
              iconName = 'favorite-outline';
              size = 28;
            } else if (route.name === '내정보') {
              IconComponent = UserIcon;
              iconName = 'user-o';
            }

            return (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeIndicator} />}
                <IconComponent name={iconName} size={size} color={color} />
              </View>
            );
          },
          ...tabBarOptions,
        })}
      >
        <Tab.Screen name="찰떡홈" component={HomeScreen} />
        <Tab.Screen name="주변" component={NearbyScreen} />
        <Tab.Screen name="찜" component={FavoriteScreen} />
        <Tab.Screen name="내정보" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

const tabBarOptions = {
  tabBarActiveTintColor: '#FF4081',
  tabBarInactiveTintColor: 'gray',
  tabBarStyle: {
    height: 90,
  },
  tabBarLabelStyle: {
    marginTop: 15,
    marginBottom: 10, // 텍스트의 위치를 조정
    fontSize: 12,
  },
  tabBarIconStyle: {
    marginTop: 10,
    marginBottom: -10,
  },
  headerShown: false, // 화면 상단에 route.name이 나타나지 않도록 설정
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: -17,
    width: '100%',
    height: 3,
    backgroundColor: '#FF4081',
  },
});

export default MainTabs;