import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  PhoneAuth: { code: string }; // 코드 전달
  Login: undefined;
};

const REST_API_KEY = 'c23206b22df9ce1d40d85f2aaa021980'; 
const REDIRECT_URI = 'http://192.168.0.102:8081/Home'; 
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; 

const KakaoLogin = () => {
  const [showWebView, setShowWebView] = useState(true); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'PhoneAuth'>>();

  const KakaoLoginWebView = (data: string) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      // 인가 코드 추출
      const authorize_code = data.substring(condition + exp.length);
      console.log('로그인 성공, 인가 코드:', authorize_code);

      setShowWebView(false);
      navigation.navigate('PhoneAuth', { code: authorize_code });
    } else {
      //setShowWebView(false);
      //navigation.navigate('Login');
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
