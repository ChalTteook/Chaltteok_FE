import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import TossPaymentWidget from '../../components/PaymentWidget';

const BASE_URL = "https://chaltteok.com";

const PaymentScreen = ({ navigation }) => {
  const paymentRequest = {
    amount: 50000,
    orderId: `ORDER_${Date.now()}`,
    orderName: '증명사진 패키지 예약',
    customerName: '홍길동',
    customerEmail: 'test@example.com',
    successUrl: BASE_URL,
    failUrl: BASE_URL,
  };

  const handlePaymentSuccess = (response: any) => {
    navigation.navigate('PaymentSuccess');
  };

  const handlePaymentError = (error: any) => {
    navigation.navigate('PaymentFail');
  };

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
        <TossPaymentWidget
          clientKey="test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
          customerKey="YbX2HuSlsC9uVJW6NMRxj"
          paymentRequest={paymentRequest}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
});

export default PaymentScreen;
