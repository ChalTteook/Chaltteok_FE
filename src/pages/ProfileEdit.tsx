import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/LeftHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getMyProfile, updateMyProfile } from '../api/userApi';

export default function ProfileEditScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState<string>('1994년 4월 8일');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 컴포넌트 마운트 시 현재 프로필 정보 로드
  useEffect(() => {
    loadCurrentProfile();
  }, []);

  const loadCurrentProfile = async () => {
    try {
      console.log('[ProfileEdit] 현재 프로필 정보 로드 시작');
      const response = await getMyProfile();
      console.log('[ProfileEdit] 현재 프로필 정보:', response.data);
      
      const profile = response.data;
      setNickname(profile.nickname || '');
      setName(profile.name || '');
      
      // 전화번호 형식 변환 (01012345678 -> 010-1234-5678)
      if (profile.phone) {
        const phone = profile.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        setPhoneNumber(phone);
      }

      // 기타 정보들도 설정 (실제 API에서 제공하는 경우)
      if (profile.gender) {
        setSelectedGender(profile.gender);
      }
      if (profile.birthDate) {
        setBirthDate(profile.birthDate);
      }
      if (profile.interests) {
        setSelectedInterests(profile.interests);
      }
    } catch (error: any) {
      console.error('[ProfileEdit] 프로필 정보 로드 실패:', error);
      Alert.alert('오류', '프로필 정보를 불러오는데 실패했습니다.');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSave = async () => {
    console.log('[ProfileEdit] 저장 시도:', { 
      nickname, 
      name, 
      phoneNumber, 
      selectedGender, 
      birthDate, 
      selectedInterests 
    });

    // 유효성 검사
    if (nickname.trim() === '') {
      Alert.alert('오류', '닉네임을 입력해주세요.');
      return;
    }
    if (name.trim() === '') {
      Alert.alert('오류', '이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const sanitizedPhoneNumber = phoneNumber.replace(/-/g, '');
      const profileData = {
        nickname: nickname.trim(),
        name: name.trim(),
        phone: sanitizedPhoneNumber || undefined,
        // 추가 필드들 (API에서 지원하는 경우)
        gender: selectedGender,
        birthDate: birthDate,
        interests: selectedInterests,
      };
      
      console.log('[ProfileEdit] updateMyProfile 호출:', profileData);
      const response = await updateMyProfile(profileData);
      console.log('[ProfileEdit] updateMyProfile 응답:', response);
      
      Alert.alert('성공', '프로필이 성공적으로 수정되었습니다.');
    } catch (error: any) {
      console.error('[ProfileEdit] 프로필 수정 실패:', error);
      if (error?.response) {
        console.error('[ProfileEdit] 에러 응답 데이터:', error.response.data);
        Alert.alert(
          '오류',
          `프로필 수정에 실패했습니다: ${error.response.data.message || '다시 시도해주세요.'}`
        );
      } else if (error?.request) {
        console.error('[ProfileEdit] 에러 요청 데이터:', error.request);
        Alert.alert('오류', '응답을 받지 못했습니다. 네트워크를 확인해주세요.');
      } else {
        Alert.alert('오류', '프로필 수정 중 문제가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleInterestSelect = (index: number) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(index)) {
        return prevInterests.filter((item) => item !== index);
      } else {
        return [...prevInterests, index];
      }
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setBirthDate(`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`);
    hideDatePicker();
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 11); // 숫자만 추출하고 최대 11자리로 제한
    const formatted = cleaned
      .replace(/^(\d{3})(\d{4})(\d{0,4})$/, '$1-$2-$3') // 010-XXXX-XXXX 형식으로 변환
      .replace(/-$/, ''); // 끝에 '-'가 있으면 제거
    setPhoneNumber(formatted);
  };

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F71D6A" />
        <Text style={styles.loadingText}>프로필 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { direction: 'ltr' }]}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <View style={styles.spacing} />
        <Text style={styles.headerText}>프로필 수정</Text>

        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileImage}>
            <Image source={require('../assets/avatar.png')} style={{ width: 72, height: 72 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileEditImage}>
            <Image source={require('../assets/edit.png')} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>닉네임</Text>
        <TextInput 
          style={styles.input} 
          placeholder="찰떡_0001" 
          placeholderTextColor="#202123"
          value={nickname}
          onChangeText={setNickname}
        />

        <Text style={styles.label}>이름</Text>
        <TextInput 
          style={styles.input} 
          placeholder="XXX" 
          placeholderTextColor="#202123"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>연락처</Text>
        <TextInput
          style={styles.input}
          placeholder="010-XXXX-XXXX"
          placeholderTextColor="#202123"
          value={phoneNumber}
          onChangeText={formatPhoneNumber} // 전화번호 형식 처리
          keyboardType="numeric"
        />

        <Text style={styles.label}>성별</Text>
        <View style={styles.genderGroup}>
          {['여성', '남성', '선택 안 함'].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={styles.genderOption}
              onPress={() => handleGenderSelect(gender)}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedGender === gender && styles.radioCircleSelected,
                ]}
              >
                {selectedGender === gender && (
                  <Image
                    source={require('../assets/Checkbox_circle.png')} // 선택된 상태의 아이콘
                    style={styles.icon}
                  />
                )}
              </View>
              <Text style={styles.genderText}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>생일</Text>
        <TouchableOpacity onPress={showDatePicker} style={[styles.input, { justifyContent: 'center' }]}>
          <Text style={{ color: '#202123' }}>{birthDate}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>관심 지역</Text>
        <TouchableOpacity style={styles.regionButton}>
          <Text style={styles.regionButtonText}>관심지역 설정하기</Text>
        </TouchableOpacity>

        <Text style={styles.label}>관심 항목</Text>
        <View style={styles.interestGroup}>
          {[
            '증명 사진',
            '프로필/화보',
            '커플/우정',
            '웨딩사진',
            '가족사진',
            '제품/공간',
            '아기사진',
            '애완동물',
            '영상',
            '셀프촬영',
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.interestItem,
                selectedInterests.includes(index) && styles.interestItemSelected,
              ]}
              onPress={() => handleInterestSelect(index)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 저장 버튼 */}
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

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  spacing: {
    height: 85,
  },
  headerText: {
    fontFamily: 'PretendardJP-Bold',
    color: '#202123',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 26,
    marginLeft: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    marginBottom: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileEditImage: {
    marginTop: -17,
    marginLeft: 51,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  label: {
    fontFamily: 'PretendardJP-Bold',
    color: '#202123',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 14,
    lineHeight: 22,
  },
  input: {
    width: 343,
    height: 48,
    borderWidth: 1,
    borderColor: '#202123',
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
    marginLeft: 14,
  },
  genderGroup: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 14,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    marginRight: 8,
  },
  radioCircleSelected: {
    borderColor: '#F71D6A',
    backgroundColor: '#F71D6A',
  },
  icon: {
    width: 24,
    height: 24,
  },
  genderText: {
    fontSize: 14,
    color: '#202123',
  },
  regionButton: {
    width: 343,
    height: 48,
    backgroundColor: '#202123',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 14,
  },
  regionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  interestGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
    marginBottom: 32,
    marginLeft: 16,
  },
  interestItem: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  interestItemSelected: {
    borderColor: '#F71D6A',
  },
  saveButton: {
    backgroundColor: '#F71D6A',
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#CCC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
