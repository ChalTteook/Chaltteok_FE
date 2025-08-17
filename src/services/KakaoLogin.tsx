import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { sendTokenToBackend } from '../api/KakaoAuth';
import CookieManager from '@react-native-cookies/cookies';
import Constants from 'expo-constants';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import LeftHeader from '../components/LeftHeader';
import { useRecoilState } from 'recoil';
import { authState } from '../state/authState';

const REST_API_KEY = Constants.expoConfig?.extra?.kakaoRestApiKey;
const REDIRECT_URI = Constants.expoConfig?.extra?.kakaoRedirectUri ;
const BASE_URL = REDIRECT_URI?.replace(/\/$/, ''); // 끝의 슬래시 제거
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`;

type RootStackParamList = {
  PhoneAuth: undefined;
  WelcomeJoin: undefined;
  SocialLogin: undefined;
  Main: undefined;
};

const KakaoLogin = () => {
  const [showWebView, setShowWebView] = useState(true);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    // 웹뷰 쿠키 삭제
    // CookieManager.clearAll().then((success) => {
    //   console.log('쿠키 삭제 성공:', success);
    // });

    // 카카오 인증 URL 요청
    const getKakaoAuthUrl = async () => {
      try {
        console.log('카카오 인증 URL 요청: /auth/kakao_auth');
        const response = await axiosInstance.get('/auth/kakao_auth');
        
        const receivedUrl = response.data.data;
        const urlParams = new URLSearchParams(receivedUrl.split('?')[1]);
        const continueParams = new URLSearchParams(decodeURIComponent(urlParams.get('continue')?.split('?')[1] || ''));
        
        const kakaoRestApiKey = continueParams.get('client_id');
        const kakaoRedirectUri = decodeURIComponent(continueParams.get('redirect_uri') || '');
        
        const formattedUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUri}`;
        setAuthUrl(formattedUrl);
      } catch (error) {
        console.error('카카오 인증 URL 요청 실패:', error);
        Alert.alert('오류', '카카오 로그인을 시작할 수 없습니다.');
      }
    };

    getKakaoAuthUrl();
  }, []);

  const KakaoLoginWebView = async (data: string) => {
    if (data.includes('code=')) {
      const authorize_code = data.split('code=')[1].split('&')[0];
      setShowWebView(false);

      try {
        const response = await sendTokenToBackend(authorize_code);
        if (response) {
          console.log('로그인 성공:', response);
          console.log('저장할 토큰:', response.token);
          console.log('저장할 사용자 정보:', response.user);
          
          // auth 상태에 JWT 토큰과 사용자 정보를 저장
          const newAuthState = {
            userEmail: response.user?.email || null,
            isLoggedIn: true,
            token: response.token, // JWT 토큰 저장
            nickname: response.user?.nickName || null,
            name: response.user?.name || null,
            phoneNumber: response.user?.phone || null,
          };
          
          console.log('새로운 auth 상태:', newAuthState);
          setAuth(newAuthState);
          
          // 저장 후 상태 확인
          setTimeout(() => {
            console.log('저장 후 auth 상태 확인:', auth);
          }, 100);
          
          navigation.navigate('Main');
        } else {
          throw new Error('로그인 실패: 응답이 비어있습니다.');
        }
      } catch (error) {
        console.error('백엔드 요청 상세 에러:', error);
        
        let errorMessage = '인증에 실패했습니다.';
        if (axios.isAxiosError(error) && error.response) {
          errorMessage = `서버 오류 (${error.response.status}): ${error.response.data?.message || '알 수 없는 오류가 발생했습니다.'}`;
        }

        Alert.alert('로그인 실패', errorMessage, [
          {
            text: '확인',
            onPress: () => navigation.navigate('SocialLogin')
          }
        ]);
      }
    }
  };



  // 실제 WebView에 전달되는 URL 로그
  if (authUrl) {
    console.log('[KakaoLogin] WebView source uri:', authUrl);
  } else {
    return;
  }

  return (
    <View style={styles.container}>
      {showWebView && (
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{ uri: authUrl }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={(event) => KakaoLoginWebView(event.nativeEvent.data)}
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onHttpError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView HTTP error: ', nativeEvent);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FEE500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default KakaoLogin;