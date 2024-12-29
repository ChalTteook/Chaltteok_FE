import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Text, Image, Dimensions, PixelRatio, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const { width, height } = Dimensions.get('window'); 
const scaleWidth = width / 375; 
const scaleHeight = height / 812; 

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSendVerificationCode = () => {
      // 인증번호 전송 로직 (예시로 에러 처리)
      if (phoneNumber === '') {
        setErrorMessage('전화번호를 입력해주세요.');
      } else {
        setErrorMessage('');
  
        console.log('인증번호 발송:', phoneNumber);
      }
    };
  
    const handleVerifyCode = () => {
      // 인증번호 확인 로직 (예시)
      if (verificationCode === '') {
        setErrorMessage('인증번호를 입력해주세요.');
      } else {
        setErrorMessage('');
        // 인증번호 확인 처리 로직
        console.log('인증번호 확인:', verificationCode);
      }
    };
  

    return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Image source={require('../assets/left.png')} style={styles.leftIcon} />
          <View style={styles.container}>
            <Text style={styles.title}>휴대폰 번호를 인증해 주세요.</Text>
            <TextInput
              style={[styles.inputnum, { paddingLeft: 16 }]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              placeholder="010-0000-0000"
              placeholderTextColor='#D5D5D5'
            />
            <TouchableOpacity style={styles.button} onPress={handleSendVerificationCode}>
              <Text style={styles.buttonText}>인증번호 발송</Text>
            </TouchableOpacity>
    
            {/* 인증번호 입력 */}
            <TextInput
              style={[styles.input, { paddingLeft: 16 }]}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
              placeholder="5자리 인증번호 입력"
              placeholderTextColor='#D5D5D5'
            />
    
            {/* 인증하기 버튼 */}
            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
              <Text style={styles.verifyText}>인증하기</Text>
            </TouchableOpacity>

          <Text style={styles.retryText}>
            인증번호가 도착하지 않았을 경우 인증번호 발송 버튼을 다시 눌러 주세요.
          </Text>           
          </View>
        </KeyboardAvoidingView>
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
      title: {
        fontFamily: 'PretendardJP-Bold',
        position: 'absolute',
        top: 73 * scaleHeight,
        left: 16 * scaleWidth,
        fontSize: 24,
        lineheight: 32,
        letter: -1,
        height: 32,
        color: '#202123',
        fontWeight: 'bold',
      },
      inputnum: {
        width: 202,
        height: 48,
        borderColor: '#D5D5D5',
        textColor: '#D5D5D5',
        borderWidth: 1,
        fontSize: 14,
        marginBottom: 16,
        borderRadius: 10,
        position: 'absolute',
        top: 121 * scaleHeight,
        left: 16 * scaleWidth,
      },
      input: {
        width: 343,
        height: 48,
        borderColor: '#D5D5D5',
        borderWidth: 1,
        fontSize: 14,
        marginBottom: 20,
        borderRadius: 10,
        position: 'absolute',
        top: 185 * scaleHeight,
        left: 16 * scaleWidth,
      },
      button: {
        backgroundColor: '#202123',
        borderRadius: 8,
        width: 123,
        height: 48,
        position: 'absolute',
        top: 121 * scaleHeight,
        left: 215 * scaleWidth,
        justifyContent: 'center',
      },
      verifyButton: {
        backgroundColor: '#F71D6A',
        borderRadius: 10,
        width: 343,
        height: 48,
        position: 'absolute',
        bottom: 16 * scaleHeight,
        alignSelf: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontFamily: 'PretendardJP-Bold',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 24,
      },
      verifyText: {
        fontFamily: 'PretendardJP-Regular',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19.2,
      },
      retryText: {
        fontFamily: 'PretendardJP-Regular',
        color: '#000000',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        position: 'absolute',
        top: 249 * scaleHeight,
        alignSelf: 'center',
      },
    });
    
