import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812;

interface HeaderProps {
  title: string;
  onClose?: () => void; 
}

const CloseHeader: React.FC<HeaderProps> = ({ title }) => {

    const navigation = useNavigation();

    const handleClose = () => {
        navigation.goBack(); 
    };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleClose}>
        <Image source={require('../assets/close.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top:60 * scaleHeight,
    height: 41,
    width: width,
  },
  closeIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16 * scaleWidth,
    top: 4 * scaleHeight,
  },
  title: {
    fontFamily: 'PretendardJP-Bold',
    fontSize: 16,
    color: '#202123',
    textAlign: 'center',
    top: 6 * scaleHeight,
    fontWeight: 'bold',
  },
});

export default CloseHeader;
