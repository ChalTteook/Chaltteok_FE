import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Header from '../components/LeftHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState<string>('1994년 4월 8일');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

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
        <TextInput style={styles.input} placeholder="찰떡_0001" placeholderTextColor="#202123" />

        <Text style={styles.label}>이름</Text>
        <TextInput style={styles.input} placeholder="XXX" placeholderTextColor="#202123" />

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
});
