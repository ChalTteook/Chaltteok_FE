import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type PaymentSuccessRouteParams = {
  paymentInfo?: {
    amount?: number;
    orderId?: string;
    orderName?: string;
    customerName?: string;
    customerEmail?: string;
    // Toss 결제 응답 필드도 필요시 추가
    [key: string]: any;
  };
};

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params as any) || {};

  // 디버깅용 로그
  React.useEffect(() => {
    console.log('PaymentSuccessScreen params:', params);
  }, [params]);

  const handlePaymentSuccess = (response: any) => {
    navigation.navigate('PaymentSuccess', {
      amount: params.amount,
      payDate: params.payDate,
      orderId: params.orderId,
      paymentKey: response.paymentKey,
      paymentType: response.method,
      // 기타 필요한 정보
    });
  };

  const handlePayment = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const payDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    navigation.navigate('PaymentScreen', {
      amount: 50000,
      payDate, // ← 현재 날짜/시간이 결제일로 전달됨
    });
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
        <Text style={styles.successTitle}>결제가 완료되었습니다!</Text>

        <View style={styles.paymentDetails}>
          <Text style={styles.sectionTitle}>결제내역</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결제 수단</Text>
            <Text style={styles.detailValue}>카카오페이</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결제 금액</Text>
            <Text style={styles.detailValue}>{Number(params.amount)?.toLocaleString()}원</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>결제일</Text>
            <Text style={styles.detailValue}>{(() => {
              const now = new Date();
              const pad = (n: number) => n.toString().padStart(2, '0');
              return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
            })()}</Text>
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

