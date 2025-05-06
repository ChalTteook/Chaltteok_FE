import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleLogo from "../../assets/logo/BigCircleLogo";
import Header from "../../components/LeftHeader";
import { useRecoilState } from "recoil";
import { authState } from "../../state/authState";
import { updateUserProfile } from "../../api/UpdateProfile";
import EditPencil from "../../assets/EditPencil.png";
import { Image } from "react-native";
export const EditProfileScreen = ({ navigation }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [nickname, setNickname] = useState(auth.nickname || "");
  const [name, setName] = useState(auth.name || "");
  const [phoneNumber, setPhoneNumber] = useState(auth.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    // 유효성 검사 추가 (선택 사항)
    if (nickname.trim() === "") {
      Alert.alert("오류", "닉네임을 입력해주세요.");
      return;
    }

    if (name.trim() === "") {
      Alert.alert("오류", "이름을 입력해주세요.");
      return;
    }

    if (!/^\d{3}-\d{4}-\d{4}$/.test(phoneNumber.trim())) {
      Alert.alert("오류", "연락처 형식이 올바르지 않습니다. 예: 010-1234-5678");
      return;
    }

    setLoading(true);
    try {
      const sanitizedPhoneNumber = phoneNumber.replace(/-/g, ""); // '-' 제거
      const profileData = {
        nickName: nickname.trim() !== "" ? nickname : undefined,
        name: name.trim() !== "" ? name : undefined,
        phone: sanitizedPhoneNumber !== "" ? sanitizedPhoneNumber : undefined, // '-' 제거된 전화번호 사용
      };

      const updatedUser = await updateUserProfile(auth.token, profileData);
      // Recoil 상태 업데이트
      setAuth({
        ...auth,
        nickname: updatedUser.user.nickName || auth.nickname,
        phoneNumber: updatedUser.user.phone || auth.phoneNumber,
      });

      Alert.alert("성공", "프로필이 성공적으로 수정되었습니다.");
      navigation.goBack(); // 이전 화면으로 돌아가기
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      if (error.response) {
        // 서버가 응답한 에러
        console.error("에러 응답 데이터:", error.response.data);
        Alert.alert(
          "오류",
          `프로필 수정에 실패했습니다: ${error.response.data.message || "다시 시도해주세요."}`
        );
      } else if (error.request) {
        // 요청이 전송되었으나 응답이 없음
        console.error("에러 요청 데이터:", error.request);
        Alert.alert("오류", "응답을 받지 못했습니다. 네트워크를 확인해주세요.");
      } else {
        // 다른 에러
        Alert.alert("오류", "프로필 수정 중 문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>프로필 수정</Text>
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <View style={styles.logoIconContainer}>
          <CircleLogo style={styles.circleLogo} />
          <Image source={EditPencil} style={styles.editIcon} />
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.input}
            placeholder="짱픽_0001"
            placeholderTextColor="#999"
            onChangeText={setNickname}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="홍길동"
            placeholderTextColor="#999"
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>연락처</Text>
          <TextInput
            style={styles.input}
            placeholder="010-XXXX-XXXX"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>저장하기</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF568F",
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -10,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A90E2",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
  },
  logoIconContainer: {
    marginTop: -20,
    padding: 8,
  },
  logoIcon: {
    width: 40,
    height: 40,
  },
  form: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  saveButton: {
    position: "absolute",
    bottom: 34,
    left: 16,
    right: 16,
    backgroundColor: "#FF568F",
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
  },
  circleLogo: {
    width: 18,
    height: 18,
  },
});
