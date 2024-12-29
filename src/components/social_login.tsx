import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  TouchableOpacity, 
  Text, 
  Image, 
  Dimensions 
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/authState';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { sendLoginDataToBackend } from '../api/apiClient';

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812;

export default function LoginScreen() {
  const setAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    NaverLogin.initialize({
      appName: 'chaltteok',
      consumerKey: 'Fu0jy9r1JgUxld5djIaM', 
      consumerSecret: 'kqMfbzOTNU', 
      // serviceUrlScheme: 'yourappscheme',
    });
  }, []); 

  const handleKakaoLogin = async () => {
    setLoading(true);
    try {
      const token = await KakaoLogin.login();
      console.log('카카오 로그인 응답:', token);

      if (token) {
        await sendLoginDataToBackend(token.accessToken);
        setAuth({ isLoggedIn: true, token: token.accessToken });
        Alert.alert('로그인 성공', '카카오 로그인에 성공했습니다.');
      } else {
        Alert.alert('로그인 실패', '토큰을 받을 수 없습니다.');
      }
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
      Alert.alert('로그인 실패', `에러 내용: ${error.message || '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNaverLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const { failureResponse, successResponse } = await NaverLogin.login();

      if (successResponse) {
        setAuth({ isLoggedIn: true, token: successResponse.accessToken });
        await sendLoginDataToBackend(successResponse.accessToken);
        Alert.alert('로그인 성공', '네이버 로그인에 성공했습니다.');
        console.log('네이버 로그인 성공:', successResponse);
      }

      if (failureResponse) {
        Alert.alert('로그인 실패', `에러 메시지: ${failureResponse}`);
        console.error('네이버 로그인 실패:', failureResponse);
      }
    } catch (error) {
      console.error('네이버 로그인 에러:', error);
      Alert.alert('로그인 실패', '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert('아이콘 클릭')}>
          <Image source={require('../assets/close.png')} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>로그인 및 회원가입</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* 카카오 로그인 버튼 */}
          <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
            <Image source={require('../assets/kakao.png')} style={styles.buttonImage} />
          </TouchableOpacity>

          {/* 네이버 로그인 버튼 */}
          <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
            <Image source={require('../assets/naver.png')} style={styles.buttonImage} />
          </TouchableOpacity>

          {/* 이메일 로그인 버튼 */}
          <TouchableOpacity style={styles.emailButton} onPress={() => Alert.alert('이메일 로그인')}>
            <Text style={styles.buttonText}>이메일로 로그인</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            회원 가입을 원하시는 분들도 위 버튼 중 하나를 선택하여 눌러주세요.
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    top: 6 * scaleHeight,
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
  kakaoButton: {
    width: 300,
    height: 45,
    borderRadius: 2,
    position: 'absolute',
    top: 281 * scaleHeight,
    alignSelf: 'center',
  },
  naverButton: {
    width: 300,
    height: 45,
    borderRadius: 2,
    position: 'absolute',
    top: 342 * scaleHeight,
    alignSelf: 'center',
  },
  emailButton: {
    backgroundColor: '#F71D6A',
    width: 300,
    height: 44,
    borderRadius: 2,
    position: 'absolute',
    top: 403 * scaleHeight,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontFamily: 'PretendardJP-Regular',
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  signupText: {
    fontFamily: 'PretendardJP-Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
    color: '#202123',
    position: 'absolute',
    top: 479 * scaleHeight,
    alignSelf: 'center',
    width: 246,
  },
});
