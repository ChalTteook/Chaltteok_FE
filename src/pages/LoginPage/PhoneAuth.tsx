import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../components/LeftHeader';
import BottomButton from '../../components/BottomButton';
import { sendVerificationCode } from '../../api/VerifyPhone';

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812;

type RootStackParamList = {
  PhoneAuth: { nickname: string; username?: string; }; // username을 선택적으로 추가
};

export default function PhoneVerificationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'PhoneAuth'>>();
  const { nickname, username } = route.params; // nickname과 username을 route에서 가져옴
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverCode, setServerCode] = useState('');
  const navigation = useNavigation();

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 11);
    const formatted = cleaned.replace(/^(\d{3})(\d{4})(\d{0,4})$/, '$1-$2-$3').replace(/-$/, '');
    setPhoneNumber(formatted);
  };

  const formatVerificationCode = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(cleaned);
  };

  const getPhoneNumberForServer = () => {
    return phoneNumber.replace(/-/g, '');
  };

  const formattedPhoneNumber = getPhoneNumberForServer();

  const handleSendVerificationCode = async () => {
    if (phoneNumber === '') {
      setErrorMessage('전화번호를 입력해주세요.');
      return;
    }

    setErrorMessage('');
    const response = await sendVerificationCode(formattedPhoneNumber);

    if (response.data.success) {
      setServerCode(response.data.message.code);
      console.log('인증번호 발송 성공:', response.data.message.code);
      Alert.alert('인증번호 발송 성공', '인증번호가 발송되었습니다.');
    } else {
      Alert.alert('인증번호 발송 실패', response.data.message);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === '') {
      setErrorMessage('인증번호를 입력해주세요.');
      return;
    }

    if (verificationCode.length !== 6) {
      setErrorMessage('6자리 인증번호를 입력해주세요.');
      return;
    }

    if (verificationCode === serverCode) {
      setErrorMessage('');
      navigation.navigate('WelcomeJoin', {
        username: username || nickname, // username이 설정되어 있을 경우 사용, 기본은 nickname
        nickname: nickname, // 전달받은 nickname 사용
        phone: phoneNumber, // 포맷된 전화번호
      });
    } else {
      setErrorMessage('인증번호가 일치하지 않습니다.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.screenContainer}>
        <Header style={styles.headerContainer} />
        <View style={styles.container}>
          <Text style={styles.title}>휴대폰 번호를 인증해 주세요.</Text>
          <View style={styles.inputRow}>
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
          </View>
          <TextInput
            style={[
              styles.input, 
              { paddingLeft: 16 },
              errorMessage ? { borderColor: 'red' } : null
            ]}
            value={verificationCode}
            onChangeText={formatVerificationCode}
            keyboardType="numeric"
            placeholder="6자리 인증번호 입력"
            placeholderTextColor="#D5D5D5"
            maxLength={6}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <BottomButton onPress={handleVerifyCode} text="인증하기" />
          <Text style={styles.retryText}>
            인증번호가 도착하지 않았을 경우 인증번호 발송 버튼을 다시 눌러 주세요.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16 * scaleWidth,
    marginTop: 85 * scaleHeight,
  },
  title: {
    fontFamily: 'PretendardJP-Bold',
    marginTop: 32 * scaleHeight,
    fontSize: 24,
    lineHeight: 32,
    color: '#202123',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16 * scaleHeight,
  },
  inputnum: {
    width: 202,
    height: 48,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#202123',
    borderRadius: 8,
    width: 123,
    height: 48,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'PretendardJP-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: 343,
    height: 48,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 10,
    marginTop: 16 * scaleHeight,
  },
  retryText: {
    marginTop: 16 * scaleHeight,
    fontFamily: 'PretendardJP-Regular',
    color: '#000000',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    alignSelf: 'center',
  },
});
