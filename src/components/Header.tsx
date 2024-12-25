import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import NotificationIcon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.searchContainer}>
          <SearchIcon name="search" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <NotificationIcon name="notifications-outline" size={24} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchContainer: {
    position: 'relative',
  },
  notificationContainer: {
    position: 'relative',
    marginLeft: 8,
    marginRight: 16,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#FF4081',
  },
});

export default Header;