import { useState } from 'react';
import { View, StyleSheet, Alert, Text, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../../components/LeftHeader';
import BottomButton from '../../components/BottomButton';
import { joinAuth } from '../../api/JoinAuth';
import { useNavigation } from '@react-navigation/native';

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
  
    const handleSignUp = async () => {
      let isValid = true;
    
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

      const username = email.split('@')[0];
      const nickname = username;

      if (isValid) {
        try {
          const response = await joinAuth(email, password, username);
          console.log('백엔드 응답:', response);
          navigation.navigate('PhoneAuth', {
            nickname: nickname,
          });
        } catch (error) {
          console.error('회원 가입 중 오류 발생:', error);
          Alert.alert('에러 발생', '서버에 문제가 발생했습니다.');
        }
      }
    };
  
    return (
      
      <View style={styles.screenContainer}>
        <Header title="회원가입" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <View style={styles.container}>
            <Text style={styles.headerText}>회원 가입</Text>
            <Text style={styles.emailText}>이메일 주소</Text>
            <TextInput
                style={[styles.inputEmail, emailError ? styles.inputError : null, { paddingLeft: 16 }]}
                placeholder="이메일 주소 입력"
                placeholderTextColor='#D5D5D5'
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={[styles.errorMsg, { marginTop: 4 * scaleHeight }]}>{emailError}</Text> : null}

            <Text style={styles.passText}>비밀번호</Text>
            <TextInput
                style={[styles.inputPass, passwordError ? styles.inputError : null, { paddingLeft: 16 }]}
                placeholder="영어, 숫자, 특문 포함 8자리 이상"
                placeholderTextColor='#D5D5D5'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {passwordError ? <Text style={[styles.errorMsg, { marginTop: 4 * scaleHeight }]}>{passwordError}</Text> : null}

            <Text style={styles.passCText}>비밀번호 확인</Text>
            <TextInput
                style={[styles.inputPassC, confirmPasswordError ? styles.inputError : null, { paddingLeft: 16 }]}
                placeholder="비밀번호 확인"
                placeholderTextColor='#D5D5D5'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {confirmPasswordError ? (
              <Text style={[styles.errorMsg, { marginTop: 4 * scaleHeight }]}>{confirmPasswordError}</Text>
            ) : null}
            {confirmPassword.length > 0 && password === confirmPassword && !confirmPasswordError ? (
              <Text style={[styles.successMsg, { marginTop: 4 * scaleHeight }]}>비밀번호가 일치합니다</Text>
            ) : null}

            <BottomButton onPress={handleSignUp} text="다음" />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
            }
  
  
const styles = StyleSheet.create({
  inputError: {
    borderColor: '#FF4438',
    borderWidth: 1,
  },
  successMsg: {
    fontFamily: 'PretendardJP-Regular',
    color: '#1DA1F2',
    fontSize: 12,
    lineHeight: 16,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: 128, // 하단으로 이동
    width: '100%',
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16 * scaleWidth,
      marginTop: 85 * scaleHeight,
    },
  headerText: {
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 32,
  },
  emailText: {
      marginTop: 16 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
  },
  inputEmail: {
      width: 343,
      height: 48,
      marginTop: 8 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
  },
  passText: {
      marginTop: 12 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
  },
  inputPass: {
      width: 343,
      height: 48,
      marginTop: 8 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
  },
  passCText: {
      marginTop: 12 * scaleHeight,
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
  },
  inputPassC: {
      width: 343,
      height: 48,
      marginTop: 8 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
  },
  errorMsg: {
      fontFamily: 'PretendardJP-Regular',
      color: '#FF4438', 
      fontSize: 12,
      lineHeight: 16,
  },
});