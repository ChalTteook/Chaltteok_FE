import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeIcon from 'react-native-vector-icons/Octicons';
import MapIcon from 'react-native-vector-icons/Feather';
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/FontAwesome';

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <HomeIcon name="home" size={24} />
        <Text style={[styles.navText, styles.navTextActive]}>찰떡홈</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <MapIcon name="map" size={24} />
        <Text style={styles.navText}>주변</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <FavoriteIcon name="favorite-outline" size={26} />
        <Text style={styles.navText}>찜</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <UserIcon name="user-o" size={26} />
        <Text style={styles.navText}>내정보</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 8,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  navTextActive: {
    color: '#F71D6A',
  },
});

export default BottomNavigation;