import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TossPaymentWidget from '../../components/PaymentWidget';
import { PaymentRequest } from '../../types/payment';
import Constants from 'expo-constants';

const BASE_URL = "https://chaltteok.com";

const PaymentPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSuccess = (response: any) => {
    setIsLoading(false);
    Alert.alert('결제 성공', '결제가 성공적으로 완료되었습니다.');
    // 결제 성공 후 처리 로직
    console.log('결제 성공:', response);
  };

  const handlePaymentError = (error: any) => {
    setIsLoading(false);
    Alert.alert('결제 실패', error.message || '결제 중 오류가 발생했습니다.');
    console.error('결제 실패:', error);
  };

  const paymentRequest: PaymentRequest = {
    amount: 10000,
    orderId: `ORDER_${Date.now()}`,
    orderName: '테스트 결제',
    customerName: '홍길동',
    customerEmail: 'test@example.com',
    successUrl: BASE_URL,
    failUrl: BASE_URL,
    // successUrl: Constants.expoConfig?.extra?.baseURL,
    // failUrl: Constants.expoConfig?.extra?.baseURL,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>결제하기</Text>
      {isLoading ? (
        <Text>결제 위젯을 불러오는 중...</Text>
      ) : (
        <TossPaymentWidget
          clientKey="test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
          customerKey="YbX2HuSlsC9uVJW6NMRxj"
          paymentRequest={paymentRequest}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PaymentPage; 