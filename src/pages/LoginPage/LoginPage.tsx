import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/CloseHeader";

const { width, height } = Dimensions.get("window");
const scaleHeight = height / 812;

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleKakaoLogin = () => {
    navigation.navigate("KakaoLogin");
  };

  const handleNaverLogin = () => {
    navigation.navigate("NaverLogin");
  };

  const handleEmailLogin = () => {
    navigation.navigate("EmailLogin");
  };
  const handleGuestLogin = () => {
    // Implement guest login logic here
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Header title="로그인 및 회원가입" />

      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Image
          source={require("../../assets/socialLoginIcons/kakao.png")}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.naverButton} onPress={handleNaverLogin}>
        <Image
          source={require("../../assets/socialLoginIcons/naver.png")}
          style={styles.buttonImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.emailButton} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>이메일로 로그인</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        회원 가입을 원하시는 분들도 위 버튼 중 하나를 선택하여 눌러주세요.
      </Text>
      <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
        <Text style={styles.guestButtonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  guestButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1DA1F2',
  },
  guestButtonText: {
    color: '#1DA1F2',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  kakaoButton: {
    width: 300,
    height: 45,
    borderRadius: 2,
    marginTop: 281 * scaleHeight,
  },
  naverButton: {
    width: 300,
    height: 45,
    borderRadius: 2,
    marginTop: 16,
  },
  emailButton: {
    backgroundColor: "#F71D6A",
    width: 300,
    height: 44,
    borderRadius: 2,
    marginTop: 16,
    justifyContent: "center",
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
  buttonText: {
    fontFamily: "PretendardJP-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  signupText: {
    fontFamily: "PretendardJP-Regular",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
    color: "#202123",
    marginTop: 32,
    width: 246,
  },
});
