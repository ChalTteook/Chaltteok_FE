import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReservationDetailsScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [request, setRequest] = useState('');

  const { selectedDate, selectedTime } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>예약하기</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => {}}
        >
          <Text style={styles.profileText}>내 프로필 정보와 동일</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>예약자 정보</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>성명</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력해 주세요"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>연락처</Text>
            <TextInput
              style={styles.input}
              placeholder="-제외 하고 입력해주세요"
              value={contact}
              onChangeText={setContact}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>예약전 요청사항</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="예약전 요청사항을 입력해 주세요"
              value={request}
              onChangeText={setRequest}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>예약 정보</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>날짜/시간</Text>
            <Text style={styles.infoValue}>{selectedDate} {selectedTime}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>매장</Text>
            <Text style={styles.infoValue}>찰떡스튜디오</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>예약상품</Text>
            <Text style={styles.infoValue}>증명사진 패키지</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>담당사진가</Text>
            <Text style={styles.infoValue}>허창훈 사진가</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>결제 정보</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>총 결제 금액</Text>
            <Text style={styles.price}>50,000원</Text>
          </View>
        </View>

        <View style={styles.noticeSection}>
          <Text style={styles.noticeTitle}>환불 시 결제금액에 대한 취소 수수료 안내</Text>
          <Text style={styles.noticeText}>이용 3일 전까지 : 없음</Text>
          <Text style={styles.noticeText}>이용 2일 전 : 결제금액의 50%</Text>
          <Text style={styles.noticeText}>이용 1일 전 및 이용 당일 : 결제금액의 100%</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.reserveButton}
          onPress={() => {
            navigation.navigate('PaymentScreen');
          }}
        >
          <Text style={styles.reserveButtonText}>예약하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  profileButton: {
    padding: 8,
  },
  profileText: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4081',
  },
  noticeSection: {
    padding: 16,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  reserveButton: {
    backgroundColor: '#FF4081',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReservationDetailsScreen;

