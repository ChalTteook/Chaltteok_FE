import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import LeftHeader from "../../../components/LeftHeader";

const { width } = Dimensions.get("window");

type TermType = "이용 약관" | "개인정보 처리방침" | "위치기반 서비스";

export default function TermsOfServiceScreen() {
  const navigation = useNavigation();
  const [selectedTerm, setSelectedTerm] = useState<TermType>('이용 약관');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const termOptions: TermType[] = [
    '이용 약관',
    '개인정보 처리방침',
    '위치기반 서비스'
  ];

  const termsContent = {
    '이용 약관': `약관 내용 텍스트 영역 약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역 약관 내용 텍스트 영역 약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역 약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용 텍스트 영역약관 내용`, // 내용 요약
    '개인정보 처리방침': `개인정보 처리방침 내용...`, // 내용 추가
    '위치기반 서비스': `위치기반 서비스 이용약관 내용...` // 내용 추가
  };
  
  // 뒤로 가기 핸들러
  const handleGoBack = () => {
    navigation.goBack();
  };

  // 약관 선택 핸들러
  const handleTermSelect = (term: TermType) => {
    setSelectedTerm(term);
    setIsDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LeftHeader />
      <View style={styles.header}>

        <Text style={styles.headerTitle}>서비스 이용약관</Text>
      </View>

      {/* 약관 선택 드롭다운 */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.selectedTerm}>{selectedTerm}</Text>
          <Ionicons 
            name={isDropdownOpen ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#000" 
          />
        </TouchableOpacity>
        
        {isDropdownOpen && (
          <View style={styles.dropdownMenu}>
            {termOptions.map((term) => (
              <TouchableOpacity
                key={term}
                style={[
                  styles.dropdownItem,
                  selectedTerm === term && styles.selectedDropdownItem
                ]}
                onPress={() => handleTermSelect(term)}
              >
                <Text 
                  style={[
                    styles.dropdownItemText,
                    selectedTerm === term && styles.selectedDropdownItemText
                  ]}
                >
                  {term}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* 약관 내용 */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.termsContent}>
          {termsContent[selectedTerm]}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
  },
  selectedTerm: {
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownMenu: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedDropdownItem: {
    backgroundColor: 'rgba(247, 29, 106, 0.1)',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedDropdownItemText: {
    fontWeight: '500',
    color: '#F71D6A',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  termsContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333333',
  }
});