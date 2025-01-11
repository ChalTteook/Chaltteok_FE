import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { sendTokenToBackend } from '../api/KakaoAuth';

const REST_API_KEY = 'c23206b22df9ce1d40d85f2aaa021980';
const REDIRECT_URI = 'http://192.168.0.93:8081/Home';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`;

type RootStackParamList = {
  PhoneAuth: undefined;
  WelcomeJoin: undefined;
  SocialLogin: undefined;
};

const KakaoLogin = () => {
  const [showWebView, setShowWebView] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const KakaoLoginWebView = async (data: string) => {
    if (data.includes('code=')) {
      const authorize_code = data.split('code=')[1].split('&')[0];
      console.log('kakao 로그인 성공, 인가 코드:', authorize_code);

      setShowWebView(false);

      try {
        const response = await sendTokenToBackend(authorize_code);
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
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled={true}
          onMessage={(event) => KakaoLoginWebView(event.nativeEvent.data)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
});

export default KakaoLogin;
