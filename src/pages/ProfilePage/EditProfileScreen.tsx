import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleLogo from "../../assets/logo/BigCircleLogo";
import Header from "../../components/LeftHeader";
import { updateMyProfile, getMyProfile } from "../../api/userApi"; // API 함수 임포트
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState } from '../../state/authState';

export const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const auth = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 컴포넌트 마운트 시 현재 프로필 정보 로드
  useEffect(() => {
    loadCurrentProfile();
  }, []);

  const loadCurrentProfile = async () => {
    try {
      console.log("[EditProfileScreen] 현재 프로필 정보 로드 시작");
      console.log("[EditProfileScreen] Auth 상태:", {
        isLoggedIn: auth.isLoggedIn,
        token: auth.token ? `${String(auth.token).substring(0, 20)}...` : 'null',
        userEmail: auth.userEmail,
        tokenLength: auth.token ? String(auth.token).length : 0
      });
      const response = await getMyProfile(auth.token || undefined);
      console.log("[EditProfileScreen] 현재 프로필 정보:", response.data);
      
      const profile = response.data.profile; // response.data.profile로 접근
      setNickname(profile.nickname || "");
      setName(profile.name || "");
      
      // authState의 nickname과 phoneNumber 업데이트
      if (profile.nickname && profile.nickname !== auth.nickname) {
        setAuth(prev => ({
          ...prev,
          nickname: profile.nickname
        }));
        console.log("[EditProfileScreen] authState nickname 업데이트:", profile.nickname);
      }
      
      if (profile.phone && profile.phone !== auth.phoneNumber) {
        setAuth(prev => ({
          ...prev,
          phoneNumber: profile.phone
        }));
        console.log("[EditProfileScreen] authState phoneNumber 업데이트:", profile.phone);
      }
      
      // 전화번호 형식 변환 (01012345678 -> 010-1234-5678)
      if (profile.phone) {
        const phone = profile.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        setPhoneNumber(phone);
      }
    } catch (error: any) {
      console.error("[EditProfileScreen] 프로필 정보 로드 실패:", error);
      Alert.alert("오류", "프로필 정보를 불러오는데 실패했습니다.");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSave = async () => {
    console.log("[EditProfileScreen] 저장 시도:", { nickname, name, phoneNumber });
    
    // 유효성 검사
    if (nickname.trim() === "") {
      Alert.alert("오류", "닉네임을 입력해주세요.");
      return;
    }
    if (name.trim() === "") {
      Alert.alert("오류", "이름을 입력해주세요.");
      return;
    }
    if (phoneNumber.trim() !== "" && !/^\d{3}-\d{4}-\d{4}$/.test(phoneNumber.trim())) {
      Alert.alert("오류", "연락처 형식이 올바르지 않습니다. 예: 010-1234-5678");
      return;
    }

    setLoading(true);
    try {
      const sanitizedPhoneNumber = phoneNumber.replace(/-/g, "");
      const profileData = {
        nickname: nickname.trim(),
        name: name.trim(),
        phone: sanitizedPhoneNumber || undefined,
      };
      
      console.log("[EditProfileScreen] updateMyProfile 호출:", profileData);
      const response = await updateMyProfile(profileData, auth.token || undefined);
      console.log("[EditProfileScreen] updateMyProfile 응답:", response);
      
      // authState의 nickname과 phoneNumber 업데이트
      setAuth(prev => ({
        ...prev,
        nickname: nickname.trim(),
        phoneNumber: sanitizedPhoneNumber || null
      }));
      console.log("[EditProfileScreen] 프로필 수정 후 authState 업데이트:", {
        nickname: nickname.trim(),
        phoneNumber: sanitizedPhoneNumber || null
      });
      
      Alert.alert("성공", "프로필이 성공적으로 수정되었습니다.", [
        { text: "확인", onPress: () => navigation.goBack() }
      ]);
    } catch (error: any) {
      console.error("[EditProfileScreen] 프로필 수정 실패:", error);
      if (error?.response) {
        console.error("[EditProfileScreen] 에러 응답 데이터:", error.response.data);
        Alert.alert(
          "오류",
          `프로필 수정에 실패했습니다: ${error.response.data.message || "다시 시도해주세요."}`
        );
      } else if (error?.request) {
        console.error("[EditProfileScreen] 에러 요청 데이터:", error.request);
        Alert.alert("오류", "응답을 받지 못했습니다. 네트워크를 확인해주세요.");
      } else {
        Alert.alert("오류", "프로필 수정 중 문제가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 전화번호 자동 포맷팅
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF568F" />
          <Text style={styles.loadingText}>프로필 정보를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>프로필 수정</Text>
        </View>
        
        {/* Profile Image Section */}
        <View style={styles.profileSection}>
          <View style={styles.logoIconContainer}>
            <CircleLogo style={styles.circleLogo} />
          </View>
        </View>
        
        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>닉네임</Text>
            <TextInput
              style={styles.input}
              placeholder="짱픽_001"
              placeholderTextColor="#999"
              value={nickname}
              onChangeText={setNickname}
              maxLength={20}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="홍길동"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              maxLength={10}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>연락처</Text>
            <TextInput
              style={styles.input}
              placeholder="010-XXXX-XXXX"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              maxLength={13}
            />
          </View>
        </View>
        
        {/* Bottom spacing for save button */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
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
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  logoIconContainer: {
    marginTop: -20,
    padding: 8,
  },
  circleLogo: {
    width: 18,
    height: 18,
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
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#FAFAFA",
  },
  bottomSpacing: {
    height: 100, // Save button height + margin
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: "#CCC",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
