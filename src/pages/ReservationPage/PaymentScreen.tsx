import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PaymentScreen = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    payment: false,
    privacy: false,
    terms: false,
    refund: false,
  });

  const handleAgreeAll = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setAgreements({
      payment: newValue,
      privacy: newValue,
      terms: newValue,
      refund: newValue,
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

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>결제 방법</Text>
            <TouchableOpacity
              style={styles.defaultPaymentCheck}
              onPress={() => setSaveAsDefault(!saveAsDefault)}
            >
              <View
                style={[
                  styles.checkbox,
                  saveAsDefault && styles.checkboxChecked,
                ]}
              >
                {saveAsDefault && (
                  <Icon name="checkmark" size={16} style={styles.checkmark} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>기본 결제 수단으로 저장</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === "card" && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment("card")}
          >
            <Icon name="card-outline" size={24} color="#000" />
            <Text style={styles.paymentOptionText}>신용/체크카드 결제</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === "mobile" && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment("mobile")}
          >
            <Icon name="phone-portrait-outline" size={24} color="#000" />
            <Text style={styles.paymentOptionText}>휴대폰 결제</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPayment === "simple" && styles.paymentOptionSelected,
            ]}
            onPress={() => setSelectedPayment("simple")}
          >
            <Icon name="wallet-outline" size={24} color="#000" />
            <Text style={styles.paymentOptionText}>간편 결제</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.agreementSection}>
          <TouchableOpacity
            style={styles.agreementRow}
            onPress={handleAgreeAll}
          >
            <View style={[styles.checkbox, agreeAll && styles.checkboxChecked]}>
              {agreeAll && (
                <Icon name="checkmark" size={16} style={styles.checkmark} />
              )}
            </View>
            <Text style={styles.agreementTitle}>전체 동의하고 결제하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agreementRow}
            onPress={() =>
              setAgreements((prev) => ({
                ...prev,
                payment: !prev.payment,
              }))
            }
          >
            <View
              style={[
                styles.checkbox,
                agreements.payment && styles.checkboxChecked,
              ]}
            >
              {agreements.payment && (
                <Icon name="checkmark" size={16} style={styles.checkmark} />
              )}
            </View>
            <Text style={styles.agreementText}>
              상기 결제 내역을 확인, 결제 진행에 동의
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agreementRow}
            onPress={() =>
              setAgreements((prev) => ({
                ...prev,
                privacy: !prev.privacy,
              }))
            }
          >
            <View
              style={[
                styles.checkbox,
                agreements.privacy && styles.checkboxChecked,
              ]}
            >
              {agreements.privacy && (
                <Icon name="checkmark" size={16} style={styles.checkmark} />
              )}
            </View>
            <Text style={styles.agreementText}>개인정보 수집 동의</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>전체 보기</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agreementRow}
            onPress={() =>
              setAgreements((prev) => ({
                ...prev,
                terms: !prev.terms,
              }))
            }
          >
            <View
              style={[
                styles.checkbox,
                agreements.terms && styles.checkboxChecked,
              ]}
            >
              {agreements.terms && (
                <Icon name="checkmark" size={16} style={styles.checkmark} />
              )}
            </View>
            <Text style={styles.agreementText}>제3자 정보 제공 동의</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>전체 보기</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.agreementRow}
            onPress={() =>
              setAgreements((prev) => ({
                ...prev,
                refund: !prev.refund,
              }))
            }
          >
            <View
              style={[
                styles.checkbox,
                agreements.refund && styles.checkboxChecked,
              ]}
            >
              {agreements.refund && (
                <Icon name="checkmark" size={16} style={styles.checkmark} />
              )}
            </View>
            <Text style={styles.agreementText}>취소/변경/환불 수수료 동의</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>전체 보기</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>총 결제 금액</Text>
          <Text style={styles.price}>50,000원</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.payButton,
            (!selectedPayment || !agreeAll) && styles.payButtonDisabled,
          ]}
          disabled={!selectedPayment || !agreeAll}
          onPress={() => {
            navigation.navigate("PaymentSuccess");
          }}
        >
          <Text style={styles.payButtonText}>예약하기</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#F5F5F5",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  defaultPaymentCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    borderColor: "#FF4081",
  },
  checkmark: {
    color: "#FF4081",
  },
  checkboxLabel: {
    fontSize: 12,
    color: "#666",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentOptionSelected: {
    borderColor: "#FF4081",
  },
  paymentOptionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  agreementSection: {
    padding: 16,
  },
  agreementRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  agreementTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  agreementText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  viewAllButton: {
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 12,
    color: "#666",
    textDecorationLine: "underline",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4081",
  },
  payButton: {
    backgroundColor: "#FF4081",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PaymentScreen;
