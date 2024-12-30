import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  PhoneAuth: { code: string }; // 코드 전달
  Login: undefined;
};

const NAVER_CLIENT_ID = 'Fu0jy9r1JgUxld5djIaM'; 
const REDIRECT_URI = 'http://172.141.218.227:8081/Home'; // 네이버 리디렉션 URI
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; 

const NaverLogin = () => {
  const [showWebView, setShowWebView] = useState(true); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'PhoneAuth'>>();

  const NaverLoginWebView = (data: string) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      // 인가 코드 추출
      const authorize_code = data.substring(condition + exp.length);
      console.log('네이버 로그인 성공, 인가 코드:', authorize_code);

      setShowWebView(false);
      navigation.navigate('PhoneAuth', { code: authorize_code });
    } else {
      console.log('로그인 실패');
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
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=12345`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={(event) => NaverLoginWebView(event.nativeEvent.data)}
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

export default NaverLogin;
