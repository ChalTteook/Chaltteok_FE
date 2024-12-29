import React, { useState } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Header from '../components/LeftHeader';
import { useNavigation, useRoute  } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812;

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const handleSendVerificationCode = () => {
    if (phoneNumber === '') {
      setErrorMessage('전화번호를 입력해주세요.');
    } else {
      setErrorMessage('');
      console.log('인증번호 발송:', phoneNumber);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === '') {
      setErrorMessage('인증번호를 입력해주세요.');
    } else {
      setErrorMessage('');
      console.log('인증번호 확인:', verificationCode);
    }

    if (verificationCode.length !== 5) {
      setErrorMessage('유효한 인증번호를 입력해주세요.');
      return;
    }
  
    setErrorMessage('');
    console.log('인증번호 확인:', verificationCode);

    const userData = {
      email,
      phoneNumber,
      verificationCode,
    };

    axios.post('https://your-backend-url.com/verify-phone', userData)
      .then((response) => {
        if (response.data.success) {
          navigation.navigate('WelcomeJoin');
        } else {
          Alert.alert('인증 실패', response.data.message);
          navigation.navigate('WelcomeJoin'); // 테스트용
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('에러 발생', '서버에 문제가 발생했습니다.');
      });
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 11); 
    const formatted = cleaned
      .replace(/^(\d{3})(\d{4})(\d{0,4})$/, '$1-$2-$3') 
      .replace(/-$/, ''); 
    setPhoneNumber(formatted);
  };

  const formatVerificationCode = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 5); 
    setVerificationCode(cleaned);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header/>
        <Text style={styles.title}>휴대폰 번호를 인증해 주세요.</Text>
        <TextInput
          style={[styles.inputnum, { paddingLeft: 16 }]}
          value={phoneNumber}
          onChangeText={formatPhoneNumber}
          keyboardType="numeric"
          placeholder="010-0000-0000"
          placeholderTextColor="#D5D5D5"
          maxLength={13} 
        />
        <TouchableOpacity style={styles.button} onPress={handleSendVerificationCode}>
          <Text style={styles.buttonText}>인증번호 발송</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { paddingLeft: 16 }]}
          value={verificationCode}
          onChangeText={formatVerificationCode}
          keyboardType="numeric"
          placeholder="5자리 인증번호 입력"
          placeholderTextColor="#D5D5D5"
          maxLength={5} 
        />
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
  title: {
    fontFamily: 'PretendardJP-Bold',
    position: 'absolute',
    top: 164 * scaleHeight,
    left: 16 * scaleWidth,
    fontSize: 24,
    lineHeight: 32,
    color: '#202123',
    fontWeight: 'bold',
  },
  inputnum: {
    width: 202,
    height: 48,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 16,
    borderRadius: 10,
    position: 'absolute',
    top: 214 * scaleHeight,
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
    top: 284 * scaleHeight,
    left: 16 * scaleWidth,
  },
  button: {
    backgroundColor: '#202123',
    borderRadius: 8,
    width: 123,
    height: 48,
    position: 'absolute',
    top: 214 * scaleHeight,
    left: 215 * scaleWidth,
    justifyContent: 'center',
  },
  verifyButton: {
    width: 343,
    height: 48,
    backgroundColor: '#F71D6A',
    alignSelf: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 48 * scaleHeight,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'PretendardJP-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifyText: {
    fontFamily: 'PretendardJP-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  retryText: {
    fontFamily: 'PretendardJP-Regular',
    color: '#000000',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    position: 'absolute',
    top: 344 * scaleHeight,
    alignSelf: 'center',
  },
});
