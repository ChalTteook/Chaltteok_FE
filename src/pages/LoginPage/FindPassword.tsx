import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/LeftHeader";
import BottomButton from "../../components/BottomButton";
import { sendEmailVerificationCode } from "../../api/VerifyEmail";

const { width, height } = Dimensions.get("window");
const scaleWidth = width / 375;
const scaleHeight = height / 812;

export default function FindPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSendEmail = async () => {
    if (email === "") {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("올바른 이메일 형식이 아닙니다.");
      return;
    }

    console.log(email);
    const response = await sendEmailVerificationCode(email);

    if (response.data.success) {
      console.log("인증번호 발송 성공:", response.data.success);
      Alert.alert("인증번호 발송 성공", "인증번호가 발송되었습니다.");
    } else {
      Alert.alert("인증번호 발송 실패", response.data.message);
    }

    Alert.alert(
      "이메일 발송 완료",
      "비밀번호 재설정 링크가 발송되었습니다.\n이메일을 확인해 주세요."
    );
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.screenContainer}>
        <Header style={styles.headerContainer} />
        <View style={styles.container}>
          <Text style={styles.title}>비밀번호 찾기</Text>

          <TextInput
            style={[
              styles.input,
              { paddingLeft: 16 },
              errorMessage ? { borderColor: "red" } : null,
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage("");
            }}
            placeholder="가입한 이메일 주소 입력"
            placeholderTextColor="#D5D5D5"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Text style={styles.helperText}>
            입력하신 이메일 주소로 비밀번호 재설정 메일이 발송됩니다.{"\n"}
            소셜 계정회원은 비밀번호 찾기가 불가능 합니다.
          </Text>

          <BottomButton onPress={handleSendEmail} text="이메일 발송하기" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16 * scaleWidth,
    marginTop: 85 * scaleHeight,
  },
  title: {
    fontFamily: "PretendardJP-Bold",
    marginTop: 32 * scaleHeight,
    fontSize: 24,
    lineHeight: 32,
    color: "#202123",
    fontWeight: "bold",
    marginBottom: 24 * scaleHeight,
  },
  input: {
    width: 343,
    height: 48,
    borderColor: "#D5D5D5",
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  helperText: {
    marginTop: 16 * scaleHeight,
    fontFamily: "PretendardJP-Regular",
    color: "#666666",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
});
