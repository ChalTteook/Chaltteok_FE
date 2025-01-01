import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { sendNaverTokensToBackend } from '../api/NaverAuth';

type RootStackParamList = {
  Login: undefined;
};

const CLIENT_ID = 'Fu0jy9r1JgUxld5djIaM';
const NAVER_CLIENT_SECRET = 'WP2lkTDz_q';
const REDIRECT_URI = 'http://192.168.0.102:8081/Home';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; 

const NaverLoginScreen = () => {
  const [showWebView, setShowWebView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(uuidv4());
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const getAccessToken = async (authorizeCode: string, stateFromWebView: string) => {
    if (stateFromWebView !== state) { 
      Alert.alert('오류', '잘못된 요청입니다.');
      setShowWebView(false);
      navigation.navigate('Login');
      return;
    }

    const url = 'https://nid.naver.com/oauth2.0/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', NAVER_CLIENT_SECRET);
    params.append('code', authorizeCode);
    params.append('state', state);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const responseText = await response.text();
      const data = JSON.parse(responseText);
      
      if (data.access_token) {
        console.log('네이버 액세스 토큰:', data.access_token);
        console.log('네이버 리프레시 토큰:', data.refresh_token);

        setShowWebView(false);
        setIsLoading(false);
        await sendNaverTokensToBackend(data.access_token, data.refresh_token, authorizeCode);
        navigation.navigate('PhoneAuth');
      } else {
        console.error('네이버 액세스 토큰 요청 실패:', data);
        Alert.alert('오류', '로그인에 실패했습니다.');
        setShowWebView(false);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('네이버 액세스 토큰 요청 오류:', error);
      Alert.alert('오류', '네트워크 요청 중 문제가 발생했습니다.');
      setShowWebView(false);
      navigation.navigate('Login');
    }
  };

  const handleWebViewMessage = (data: string) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      const endIndex = data.indexOf('&', condition);
      const authorizeCode =
        endIndex === -1 ? data.substring(condition + exp.length) : data.substring(condition + exp.length, endIndex);

      const stateFromWebView = data.substring(data.indexOf('state=') + 6); // WebView에서 전달된 state 값 추출

      console.log('네이버 인가 코드:', authorizeCode);
      console.log('WebView에서 받은 state:', stateFromWebView);

      setShowWebView(false);
      setIsLoading(true);
      getAccessToken(authorizeCode, stateFromWebView);
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
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={(event) => handleWebViewMessage(event.nativeEvent.data)}
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
    backgroundColor: '#fff',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default NaverLoginScreen;
