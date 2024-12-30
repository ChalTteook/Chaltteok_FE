import React, { useState } from 'react';
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
import Header from '../components/CloseHeader';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812;

export default function LoginScreen() {
  const setAuth = useSetRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    navigation.navigate('KakaoLogin'); // 카카오 로그인 화면으로 네비게이션
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

  const handleEmailLogin = () => {
    navigation.navigate('ProfileEdit');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="로그인 및 회원가입" 
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>

          <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
            <Image source={require('../assets/kakao.png')} style={styles.buttonImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
            <Image source={require('../assets/naver.png')} style={styles.buttonImage} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.emailButton} 
            onPress={handleEmailLogin} 
          >
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

const KakaoLoginScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={`window.ReactNativeWebView.postMessage(window.location.href);`}
        javaScriptEnabled
        onMessage={(event) => {
          const url = event.nativeEvent.data;
          return <Text>{url}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  kakaoButton: {
    width: 300,
    height: 45,
    borderRadius: 2,
    position: 'absolute',
    top: 325 * scaleHeight,
    alignSelf: 'center',
  },
  naverButton: {
    width: 300,
    height: 45,
    borderRadius: 2,
    position: 'absolute',
    top: 386 * scaleHeight,
    alignSelf: 'center',
  },
  emailButton: {
    backgroundColor: '#F71D6A',
    width: 300,
    height: 44,
    borderRadius: 2,
    position: 'absolute',
    top: 447 * scaleHeight,
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
    top: 523 * scaleHeight,
    alignSelf: 'center',
    width: 246,
  },
});
  
