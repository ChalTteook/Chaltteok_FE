import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

type RootStackParamList = {
  Login: undefined;
};

const CLIENT_ID = 'Fu0jy9r1JgUxld5djIaM';
const NAVER_CLIENT_SECRET = '4EoJ1dQ_DA'
const REDIRECT_URI = 'http://172.141.218.227:8081/Home';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; 

const NaverLoginScreen = () => {
  const [showWebView, setShowWebView] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const state = uuidv4();

  const getAccessToken = async (authorizeCode: string) => {
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
      const data = await response.json();
      if (data.access_token) {
        console.log('네이버 액세스 토큰:', data.access_token);
        setShowWebView(false);
        setIsLoading(false);
        // 네이버 로그인 후 처리
        navigation.navigate('PhoneAuth');
      } else {
        console.error('네이버 액세스 토큰 요청 실패:', data);
        setShowWebView(false);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('네이버 액세스 토큰 요청 오류:', error);
      setShowWebView(false);
      navigation.navigate('Login');
    }
  };

  const handleWebViewMessage = (data: string) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);
  
    if (condition !== -1) {
      // 인가 코드 추출
      const endIndex = data.indexOf('&', condition);
      const authorizeCode =
        endIndex === -1 ? data.substring(condition + exp.length) : data.substring(condition + exp.length, endIndex);
  
      console.log('네이버 인가 코드:', authorizeCode);
  
      setShowWebView(false);
      setIsLoading(true);
      getAccessToken(authorizeCode);
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
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=STATE`,
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
