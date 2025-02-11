import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

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
      </View>

      <View style={styles.content}>
        <Text style={styles.successTitle}>결제가 완료되었습니다!</Text>

        <View style={styles.paymentDetails}>
          <Text style={styles.sectionTitle}>결제내역</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결제 수단</Text>
            <Text style={styles.detailValue}>카카오페이</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결제 금액</Text>
            <Text style={styles.detailValue}>7,900원</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결제일</Text>
            <Text style={styles.detailValue}>2024. 00. 00</Text>
          </View>
        </View>

        <Text style={styles.infoText}>
          예약 상세 정보는 <Text style={styles.highlightText}>내정보{'>'}</Text>
          <Text style={styles.highlightText}>예약내역</Text>에서{'\n'}
          다시 확인 가능합니다.
        </Text>

        <TouchableOpacity 
          style={styles.viewReservationButton}
          onPress={() => {
            // Navigate to MainTabs and then to the '내정보' tab
            navigation.navigate('MainTabs', { screen: '내정보' });
          }}
        >
          <Text style={styles.viewReservationButtonText}>예약내역 바로가기</Text>
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
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
  },
  paymentDetails: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  highlightText: {
    color: '#FF4081',
  },
  viewReservationButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  viewReservationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentSuccessScreen;

