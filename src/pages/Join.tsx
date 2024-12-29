import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Text, Image, Dimensions, PixelRatio, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/LeftHeader';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window'); 
const scaleWidth = width / 375; 
const scaleHeight = height / 812; 

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigation = useNavigation();
  
    const handleSignUp = () => {
      let isValid = true;
    
      // 유효성 검사
      if (!email.includes('@')) {
        setEmailError('유효한 이메일 주소를 입력하세요');
        isValid = false;
      } else {
        setEmailError('');
      }
    
      if (password.length < 8) {
        setPasswordError('영어, 숫자, 특수기호 포함 8자리 이상');
        isValid = false;
      } else {
        setPasswordError('');
      }
    
      if (password !== confirmPassword) {
        setConfirmPasswordError('비밀번호가 일치하지 않습니다');
        isValid = false;
      } else {
        setConfirmPasswordError('');
      }
    
      if (isValid) {
        const userData = {
          email: email,
          password: password,
        };
    
        axios.post('https://your-backend-url.com/signup', userData)
          .then((response) => {
            if (response.data.success) {
              navigation.navigate('PhoneAuth');
            } else {
              Alert.alert('회원 가입 실패', response.data.message);
              navigation.navigate('PhoneAuth'); // 테스트용
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            Alert.alert('에러 발생', '서버에 문제가 발생했습니다.');
          });
      }
    };
  
    return (
      
      <View style={styles.container}>
          <Header/>
            <Text style={styles.headerText}>회원 가입</Text>

            <Text style={styles.emailText}>이메일 주소</Text>
            <TextInput
                style={[styles.inputEmail, emailError ? styles.inputError : null, { paddingLeft: 16 }]}
                placeholder="이메일 주소 입력"
                placeholderTextColor='#D5D5D5'
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={[styles.errorMsg, { top: 241 * scaleHeight }]}>{emailError}</Text> : null}

            <Text style={styles.passText}>비밀번호</Text>
            <TextInput
                style={[styles.inputPass, passwordError ? styles.inputError : null, { paddingLeft: 16 }]}
                placeholder="비밀번호"
                placeholderTextColor='#D5D5D5'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {passwordError ? <Text style={[styles.errorMsg, { top: 345 * scaleHeight }]}>{passwordError}</Text> : null}

            <Text style={styles.passCText}>비밀번호 확인</Text>
            <TextInput
                style={[styles.inputPassC, confirmPasswordError ? styles.inputError : null, { paddingLeft: 16 }]}
                placeholder="비밀번호 확인"
                placeholderTextColor='#D5D5D5'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {confirmPasswordError ? <Text style={[styles.errorMsg, { top: 449 * scaleHeight }]}>{confirmPasswordError}</Text> : null}

            <TouchableOpacity style={styles.nextButton} onPress={handleSignUp}>
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
            </View>
            );
            }
  
  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  headerText: {
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 117 * scaleHeight,
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 32,
  },
  emailText: {
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 165 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'center',
  },
  inputEmail: {
      width: 343 * scaleWidth,
      height: 48,
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 189 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
  },
  passText: {
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 269 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'center',
  },
  inputPass: {
      width: 343 * scaleWidth,
      height: 48,
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 293 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
  },
  passCText: {
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 373 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'center',
  },
  inputPassC: {
      width: 343 * scaleWidth,
      height: 48,
      position: 'absolute',
      left: 16 * scaleWidth,
      top: 397 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
  },
  nextButton: {
      width: 343,
      height: 48,
      backgroundColor: '#F71D6A',
      alignSelf: 'center',
      borderRadius: 10,
      position: 'absolute',
      bottom: 48 * scaleHeight,
      justifyContent: 'center',
  },
  nextButtonText: {
      fontFamily: 'PretendardJP-Regular',
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 19.2,
      textAlign: 'center',
  },
  errorMsg: {
      position: 'absolute',
      left: 16 * scaleWidth,
      fontFamily: 'PretendardJP-Regular',
      color: '#FF4438', 
      fontSize: 12,
      lineHeight: 16,
  },
});