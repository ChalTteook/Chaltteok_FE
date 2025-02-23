import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import CircleLogo from '../../assets/logo/CircleLogo'
import { useRecoilValue } from 'recoil'
import { authState } from '../../state/authState'
import { getUserInfo } from '../../api/GetUserInfo'

const MenuItem = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{title}</Text>
    <Icon name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
)

const SectionTitle = ({ title }) => <Text style={styles.sectionTitle}>{title}</Text>

/**
 * 전화번호를 포맷팅하는 함수
 * 예: "01011112222" → "010-1111-2222"
 */
const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}

const ProfileScreen = ({ navigation }) => {
  const auth = useRecoilValue(authState)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>내 정보</Text>

        {/* Profile Section */}
        <TouchableOpacity 
          style={styles.profileSection} 
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.profileInfo}>
            <CircleLogo style={styles.circleLogo} />
            <View style={styles.profileText}>
              <Text style={styles.nickname}>{auth.nickname || '사용자'}</Text>
              <Text style={styles.phoneNumber}>{formatPhoneNumber(auth.phoneNumber || '010-XXXX-XXXX')}</Text>
            </View>
          </View>
          <Icon name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        {/* MY 찰픽 Section */}
        <View style={styles.section}>
          <SectionTitle title="MY 찰픽" />
          <MenuItem title="찜 목록" onPress={() => {}} />
          <MenuItem title="이용 내역" onPress={() => {}} />
          <MenuItem title="최근 본 내역" onPress={() => {}} />
          <MenuItem title="내 리뷰" onPress={() => {}} />
        </View>

        {/* Customer Support Section */}
        <View style={styles.section}>
          <SectionTitle title="고객 지원" />
          <MenuItem title="공지사항" onPress={() => {}} />
          <MenuItem title="자주 묻는 질문" onPress={() => {}} />
          <MenuItem title="서비스 약관" onPress={() => {}} />
        </View>

        {/* Settings & Logout */}
        <View style={styles.section}>
          <MenuItem 
            title="설정" 
            onPress={() => { /* 설정 페이지로 이동 */ }} 
          />
          <MenuItem 
            title="로그아웃" 
            onPress={() => { /* 로그아웃 로직 */ }} 
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>이용약관 | 개인정보처리방침</Text>
          <Text style={styles.footerText}>대표자명 : XXX | 사업자등록번호 : 000-00-00000</Text>
          <Text style={styles.footerText}>주소 : 서울특별시 서초구 강남대로 311 | 통신판매신고번호 : 0000000</Text>
          <Text style={styles.footerText}>
            전화번호: {formatPhoneNumber(auth.phoneNumber || "01000000000")} | 이메일: xxx@xxx.com
          </Text>
          <Text style={styles.footerText}>
            찰칵의 모든는 통신판매중개자로서 찰칵의 거래의 거래당사자가 아니며 입점판매자가 등록한 상품정보 및 거래에
            대해 책임지지 않습니다. 단, 찰칵의 담당자 판매자로 등록 판매한 상품은 판매자로서 책임을 부담합니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleLogo: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  profileText: {
    gap: 4,
  },
  nickname: {
    fontSize: 16,
    fontWeight: "600",
  },
  name: {
    fontSize: 14,
    color: "#666",
  },
  phoneNumber: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  section: {
    paddingTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    paddingTop: 24,
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
})

export default ProfileScreen

