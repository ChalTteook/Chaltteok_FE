import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PaymentFailScreen = () => {
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
        <Text style={styles.failTitle}>결제에 실패했습니다.</Text>
        <Text style={styles.infoText}>문제가 계속되면 고객센터로 문의해 주세요.</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>다시 시도하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', height: 56, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', paddingHorizontal: 16 },
  backButton: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 8 },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  failTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 40, marginTop: 20, color: '#FF4081' },
  infoText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  retryButton: { backgroundColor: '#000', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8 },
  retryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default PaymentFailScreen;
