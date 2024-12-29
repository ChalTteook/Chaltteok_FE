import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Text, Image, Dimensions, PixelRatio, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/authState'; 
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { sendLoginDataToBackend } from '../api/apiClient'; 
import { KAKAO_NATIVE_APP_KEY } from '@env';

const { width, height } = Dimensions.get('window'); 
const scaleWidth = width / 375; 
const scaleHeight = height / 812; 

export default function WelcomeScreen() {
    return (
      <View style={styles.container}>
                <TouchableOpacity onPress={() => Alert.alert('아이콘 클릭')}>
                  <Image source={require('../assets/left.png')} style={styles.leftIcon} />
                </TouchableOpacity>

        <Text style={styles.header}>XXX님의{'\n'}찰떡스러운 세계가 시작됩니다.</Text>
        <Text style={styles.subHeader}>휴대폰 번호와 닉네임 모두 로그인 시 아이디로{'\n'}사용 가능합니다.</Text>
  
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabelN}>휴대폰 번호</Text>
          <Text style={styles.infoTextN}>01000000000</Text>
          
          <Text style={styles.infoLabel}>닉네임</Text>
          <Text style={styles.infoText}>찰떡_00001</Text>
        </View>
  
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>찰떡의 덕후 시작하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    leftIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 16 * scaleWidth,
        top: 4 * scaleHeight,
        zIndex: 1,
      },
    header: {
        position: 'absolute',
        left: 16 * scaleWidth,
        top: 73 * scaleHeight,
        fontFamily: 'PretendardJP-Bold',
        color: '#202123',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 32,
        letter: -1,
    },
    subHeader: {
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 155 * scaleHeight,
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    infoContainer: {
      position: 'absolute',
      alignSelf: 'center',
      top: 229 * scaleHeight,
      backgroundColor: '#F5F5F5',
      width: 343,
      height: 104,
      borderRadius: 10,
    },
    infoLabelN: {
      position: 'absolute',
      left: 34 * scaleWidth,
      top: 20 * scaleHeight,
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      width: 80,
    },
    infoTextN: {
      position: 'absolute',
      left: (34 * scaleWidth) + 80 + 14,
      top: 20 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    infoLabel: {
      position: 'absolute',
      left: 34 * scaleWidth,
      top: 60 * scaleHeight,
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      width: 45,
    },
    infoText: {
      position: 'absolute',
      left: (34 * scaleWidth) + 45 + 14,
      top: 60 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    startButton: {
      width: 343,
      height: 48,
      backgroundColor: '#F71D6A',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 48 * scaleHeight,
      justifyContent: 'center',
    },
    startButtonText: {
      fontFamily: 'PretendardJP-Regular',
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
      lineHeight:19.2,
      textAlign: 'center',
    },
    errorMsg: {

    },
  });