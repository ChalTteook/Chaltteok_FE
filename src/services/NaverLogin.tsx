import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { sendTokenToBackend } from "../api/NaverAuth";
import { useRecoilState } from 'recoil';
import { authState } from '../state/authState';

const CLIENT_ID = "GK2ORFcjWGkcsqlGPh8M";
const REDIRECT_URI = "https://chaltteok.com/api/auth/naver/callback";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage(window.location.href)`;
type RootStackParamList = {
  PhoneAuth: undefined;
  WelcomeJoin: undefined;
  SocialLogin: undefined;
  Main: undefined;
};

const NaverLoginScreen = () => {
  const [showWebView, setShowWebView] = useState(true);
  const [state] = useState(uuidv4());
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [auth, setAuth] = useRecoilState(authState);

  const handleWebViewMessage = async (data: string) => {
    const exp = "code=";
    const condition = data.indexOf(exp);

    if (condition !== -1) {
      const endIndex = data.indexOf("&", condition);
      const authorizeCode =
        endIndex === -1
          ? data.substring(condition + exp.length)
          : data.substring(condition + exp.length, endIndex);

      console.log("네이버 로그인 성공, 인가 코드:", authorizeCode);

      setShowWebView(false);

      try {
        const response = await sendTokenToBackend(authorizeCode);
        // const verified = response.data.verified;

        // if (verified === "N") {
        // auth 상태에 JWT 토큰과 사용자 정보를 저장
        setAuth({
          userEmail: response.user?.email || null,
          isLoggedIn: true,
          token: response.token, // JWT 토큰 저장
          nickname: response.user?.nickName || null,
          name: response.user?.name || null,
          phoneNumber: response.user?.phone || null,
        });
        
        navigation.navigate("Main");
        // } else {
        //   navigation.navigate("WelcomeJoin");
        // }
      } catch (error) {
        Alert.alert("로그인 실패", "인증에 실패했습니다. 다시 시도해주세요.");
        navigation.navigate("SocialLogin");
      }
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          style={{ flex: 1 }}
          originWhitelist={["*"]}
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
    backgroundColor: "#fff",
  },
});

export default NaverLoginScreen;
