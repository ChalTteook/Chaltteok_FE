import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid'; // 고유한 state 값을 생성하기 위해 uuid 사용
import 'react-native-get-random-values';
import { sendTokenToBackend } from '../api/NaverAuth';

const CLIENT_ID = 'Fu0jy9r1JgUxld5djIaM'; // 네이버 클라이언트 아이디
const NAVER_CLIENT_SECRET = 'x2PhRQmHb7'; // 네이버 클라이언트 시크릿 (보안상 실제 서비스에서는 코드에 포함시키지 말 것)
const REDIRECT_URI = 'http://192.168.0.93:8081/Home'; // 리다이렉트 URI (백엔드에서 수신할 URI)
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`; // WebView가 현재 URL을 React Native로 전달하는 코드

type RootStackParamList = {
  PhoneAuth: undefined;
  WelcomeJoin: undefined;
  SocialLogin: undefined;
};

const NaverLoginScreen = () => {
  const [showWebView, setShowWebView] = useState(true); // WebView 표시 여부 상태
  const [state] = useState(uuidv4()); // 고유한 state 값 생성
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // WebView에서 메시지를 받을 때 실행되는 함수
  const handleWebViewMessage = async (data: string) => {
    const exp = 'code='; // URL에서 code 파라미터 찾기
    const condition = data.indexOf(exp); // 'code='가 포함된 위치 확인

    if (condition !== -1) {
      const endIndex = data.indexOf('&', condition); // '&'가 있다면, 그 위치까지 추출
      const authorizeCode =
        endIndex === -1 ? data.substring(condition + exp.length) : data.substring(condition + exp.length, endIndex);

      console.log('네이버 로그인 성공, 인가 코드:', authorizeCode); // 인가 코드를 콘솔에 출력

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
            uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`, // 네이버 로그인 URL
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT} // JavaScript를 삽입하여 URL을 React Native로 전달
          javaScriptEnabled={true}
          onMessage={(event) => handleWebViewMessage(event.nativeEvent.data)} // WebView에서 메시지를 받을 때 처리
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
