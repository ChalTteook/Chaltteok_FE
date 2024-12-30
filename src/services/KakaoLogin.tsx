import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  PhoneAuth: { code: string }; 
  Login: undefined;
};

const REST_API_KEY = 'c23206b22df9ce1d40d85f2aaa021980';
const REDIRECT_URI = 'http://172.141.218.227:8081/Home'; 
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; 

const KakaoLogin = () => {
  const [showWebView, setShowWebView] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'PhoneAuth'>>();

  const getAccessToken = async (authorize_code: string) => {
    const url = 'https://kauth.kakao.com/oauth/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', REST_API_KEY); 
    params.append('redirect_uri', REDIRECT_URI); 
    params.append('code', authorize_code); 

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      const data = await response.json();
      if (data.access_token) {
        console.log('액세스 토큰:', data.access_token);
        setShowWebView(false);
        setIsLoading(false);
        // 액세스 토큰 사용 로직 추가
      } else {
        console.error('액세스 토큰을 받을 수 없습니다.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('액세스 토큰 요청 오류:', error);
      setIsLoading(false);
    }
  };

  const KakaoLoginWebView = (data: string) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      // 인가 코드 추출
      const authorize_code = data.substring(condition + exp.length);
      console.log('로그인 성공, 인가 코드:', authorize_code);

      setShowWebView(false);
      setIsLoading(true); 
      getAccessToken(authorize_code);
      navigation.navigate('PhoneAuth', { code: authorize_code });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={(event) => KakaoLoginWebView(event.nativeEvent.data)}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default KakaoLogin;
