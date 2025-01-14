import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid'; 
import 'react-native-get-random-values';
import { sendTokenToBackend } from '../api/NaverAuth';

const CLIENT_ID = 'Fu0jy9r1JgUxld5djIaM'; 
const NAVER_CLIENT_SECRET = 'x2PhRQmHb7'; 
const REDIRECT_URI = 'http://192.168.0.93:8081/Home'; 
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; 
type RootStackParamList = {
  PhoneAuth: undefined;
  WelcomeJoin: undefined;
  SocialLogin: undefined;
};

const NaverLoginScreen = () => {
  const [showWebView, setShowWebView] = useState(true); 
  const [state] = useState(uuidv4()); 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleWebViewMessage = async (data: string) => {
    const exp = 'code='; 
    const condition = data.indexOf(exp); 

    if (condition !== -1) {
      const endIndex = data.indexOf('&', condition); 
      const authorizeCode =
        endIndex === -1 ? data.substring(condition + exp.length) : data.substring(condition + exp.length, endIndex);

      console.log('네이버 로그인 성공, 인가 코드:', authorizeCode); 

      setShowWebView(false); 

      try {
        const response = await sendTokenToBackend(authorizeCode);
        const verified = response.data.verified;

        if (verified === 'N') {
          navigation.navigate('PhoneAuth');
        } else {
          navigation.navigate('WelcomeJoin');
        }
      } catch (error) {
        Alert.alert('로그인 실패', '인증에 실패했습니다. 다시 시도해주세요.');
        navigation.navigate('SocialLogin');
      }
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
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NaverLoginScreen;
