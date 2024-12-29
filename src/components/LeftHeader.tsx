import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812;

interface HeaderProps {
  onLeft?: () => void;
}

const LeftHeader: React.FC<HeaderProps> = () => {
  const navigation = useNavigation();

  const handleLeftPress = () => {
      navigation.goBack(); 
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleLeftPress}>
        <Image source={require('../assets/left.png')} style={styles.leftIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 50 * scaleHeight,
    height: 41,
    width: width,
  },
  leftIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16 * scaleWidth,
    top: 4 * scaleHeight,
  },
});

export default LeftHeader;