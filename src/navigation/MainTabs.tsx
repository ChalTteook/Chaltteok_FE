import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomePage/HomeScreen';
import NearbyScreen from '../pages/NearbyPage/NearbyScreen';
import FavoriteScreen from '../pages/HomePage/FavoriteScreen';
import ProfileStackNavigator from './ProfileStakNavigator';
import HomeIcon from '../assets/bannerIcons/HomeIcon';
import ActiveHomeIcon from '../assets/bannerIcons/ActiveHomeIcon';
import MapIcon from '../assets/bannerIcons/MapIcon';
import ActiveMapIcon from '../assets/bannerIcons/ActiveMapIcon';
import FavoriteIcon from '../assets/bannerIcons/FavoriteIcon';
import ActiveFavoriteIcon from '../assets/bannerIcons/ActiveFavoriteIcon';
import UserIcon from '../assets/bannerIcons/ProfileIcon';
import ActiveUserIcon from '../assets/bannerIcons/ActiveProfileIcon';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent;
            // 기본 size를 28로 설정
            let iconSize = 34;

            if (route.name === '찰떡홈') {
              IconComponent = focused ? ActiveHomeIcon : HomeIcon;
            } else if (route.name === '주변') {
              IconComponent = focused ? ActiveMapIcon : MapIcon;
            } else if (route.name === '찜') {
              IconComponent = focused ? ActiveFavoriteIcon : FavoriteIcon;
              iconSize = 32; // '찜' 아이콘을 조금 더 크게 설정
            } else if (route.name === '내정보') {
              IconComponent = focused ? ActiveUserIcon : UserIcon;
              iconSize = 36; // '찜' 아이콘을 조금 더 크게 설정
            }

            return (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeIndicator} />}
                <IconComponent width={iconSize} height={iconSize} />
              </View>
            );
          },
          ...tabBarOptions,
        })}
      >
        <Tab.Screen name="찰떡홈" component={HomeScreen} />
        <Tab.Screen name="주변" component={NearbyScreen} />
        <Tab.Screen name="찜" component={FavoriteScreen} />
        <Tab.Screen name="내정보" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </>
  );
};

const tabBarOptions = {
  tabBarActiveTintColor: '#F71D6A',
  tabBarInactiveTintColor: '#202123',
  tabBarStyle: {
    height: 90,
  },
  tabBarLabelStyle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarIconStyle: {
    marginTop: 5,
    marginBottom: -5,
  },
  headerShown: false,
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50 // 아이콘 컨테이너의 높이를 증가
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#F71D6A',
  },
});

export default MainTabs;

