import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const tabs = ["소개", "촬영상품", "사진가", "리뷰"];

export default function StudioDetailScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("소개");
  const scrollViewRef = useRef(null);
  const sectionRefs = {
    소개: useRef(null),
    촬영상품: useRef(null),
    사진가: useRef(null),
    리뷰: useRef(null),
  };

  const scrollToSection = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "소개") {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      sectionRefs[tabName].current?.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y, animated: true });
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>찰칵 스튜디오 연희점</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => scrollToSection(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView ref={scrollViewRef} style={styles.content}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/studio_image.png")}
            style={styles.mainImage}
          />
        </View>

        {/* Introduction Section */}
        <View ref={sectionRefs.소개} style={styles.section}>
          <Text style={styles.studioName}>찰칵 스튜디오 연희점</Text>
          <Text style={styles.description}>
            스튜디오 소개 최대 한줄 30글자가 길어지면 말줄임...
          </Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFB800" />
            <Text style={styles.rating}>4.5</Text>
            <Text style={styles.location}>서울 강남구</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>영업시간</Text>
              <Text style={styles.detailValue}>09:00 ~ 20:00</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>휴무일</Text>
              <Text style={styles.detailValue}>월요일 정기 휴무</Text>
            </View>
          </View>
        </View>

        {/* Products Section */}
        <View ref={sectionRefs.촬영상품} style={styles.productSection}>
          <View style={styles.productCard}>
            <Image
              source={require("../../assets/studio_image.png")}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.productTitle}>
                [가이드] 촬영상품명 최대 00글자
              </Text>
              <Text style={styles.productTitle}>최대 2줄 처리</Text>
              <Text style={styles.price}>99,999원</Text>
              <View style={styles.productDetails}>
                <Text style={styles.productDetail}>- 구성품선 텍스트 영역</Text>
                <Text style={styles.productDetail}>- 구성품선 텍스트 영역</Text>
                <Text style={styles.productDetail}>- 구성품선 텍스트 영역</Text>
                <Text style={styles.productDetail}>
                  - 이미지 위치 박스, 텍스트 영역만 아래로 열리됨
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.productCard}>
            <Image
              source={require("../../assets/studio_image.png")}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.productTitle}>1인 증명사진 촬영권</Text>
              <Text style={styles.price}>90,000원</Text>
              <View style={styles.productDetails}>
                <Text style={styles.productDetail}>- 1인 1컷씩 눈정면 1컷</Text>
                <Text style={styles.productDetail}>- 오리지널 영역</Text>
              </View>
            </View>
          </View>

          <View style={styles.productCard}>
            <Image
              source={require("../../assets/studio_image.png")}
              style={styles.productImage}
            />
            <View>
              <Text style={styles.productTitle}>효도사진 패키지</Text>
              <Text style={styles.price}>125,000원</Text>
              <View style={styles.productDetails}>
                <Text style={styles.productDetail}>- 1인 2컷씩 포함된 2컷</Text>
                <Text style={styles.productDetail}>- A4 원목 액자 포함</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Photographers Section */}
        <View ref={sectionRefs.사진가} style={styles.section}>
          <View style={styles.photographerCard}>
            <Text style={styles.photographerTitle}>
              [가이드] 000작가(최대 1줄)
            </Text>
            <Text style={styles.photographerDetail}>
              자기소개 최대 000자 최대 2줄
            </Text>
            <Text style={styles.photographerDetail}>길어지면 말줄임</Text>
            <TouchableOpacity style={styles.reserveButton}
            onPress={() => navigation.navigate('ReservationPage')}>
              <Text style={styles.reserveButtonText}>예약</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.photographerCard}>
            <Text style={styles.photographerTitle}>하정호 작가</Text>
            <Text style={styles.photographerDetail}>
              자기소개 최대 000자 최대 2줄
            </Text>
            <Text style={styles.photographerDetail}>길어지면 말줄임</Text>
            <TouchableOpacity style={styles.reserveButtonGray}>
              <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews Section */}
        <View ref={sectionRefs.리뷰} style={styles.section}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewStats}>
              <Text style={styles.reviewTitle}>방문자 리뷰 ★ 4.5</Text>
              <Text style={styles.reviewCount}>(0,000)</Text>
            </View>
            <View style={styles.reviewFilters}>
              <TouchableOpacity style={styles.filterButton}>
                <Text>시간순 전체</Text>
                <Icon name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text>최신순</Text>
                <Icon name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>김찰떡 사진가</Text>
              <Text style={styles.reviewDate}>0000. 00. 00</Text>
            </View>
            <Text style={styles.reviewText}>
              리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰
              내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용
            </Text>
            <View style={styles.reviewImages}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.reviewImage}>
                  <Image
                    source={require("../../assets/studio_image.png")}
                    style={styles.reviewImageContent}
                  />
                </View>
              ))}
            </View>
            <View style={styles.likeSection}>
              <TouchableOpacity style={styles.like}>
                <Icon name="heart" size={20} color="#FF4081" />
                <Text style={styles.likeCount}>000+ </Text>
                <Text> 좋아요</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.space} />
          <View style={styles.reviewCard}>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>김찰떡 사진가</Text>
              <Text style={styles.reviewDate}>0000. 00. 00</Text>
            </View>
            <Text style={styles.reviewText}>
              리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰
              내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용
            </Text>
            <View style={styles.reviewImages}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.reviewImage}>
                  <Image
                    source={require("../../assets/studio_image.png")}
                    style={styles.reviewImageContent}
                  />
                </View>
              ))}
            </View>
            <View style={styles.likeSection}>
              <TouchableOpacity style={styles.like}>
                <Icon name="heart" size={20} color="#FF4081" />
                <Text style={styles.likeCount}>000+ </Text>
                <Text> 좋아요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
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
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: width,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  section: {
    padding: 16,
    borderBottomWidth: 10,
    borderBottomColor: "#EEEEEE",
  },
  productSection: {
    marginHorizontal: 16,
    section: {
      padding: 16,
      borderBottomWidth: 4,
      borderBottomColor: "#EEEEEE",
    },
    borderBottomWidth: 4,
    borderBottomColor: "#EEEEEE",
  },
  studioName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    gap: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#EEEEEE",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF4081",
    marginBottom: 12,
  },
  productDetails: {
    gap: 4,
  },
  productDetail: {
    fontSize: 14,
    color: "#666",
  },
  photographerCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
  },
  photographerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  photographerDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  reserveButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  reserveButtonGray: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewHeader: {
    marginBottom: 16,
  },
  reviewStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  reviewFilters: {
    flexDirection: "row",
    gap: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 4,
  },
  reviewCard: {
    marginTop: 16,
    marginBottom: 16,
  },
  reviewerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewImages: {
    flexDirection: "row",
    gap: 8,
  },
  reviewImage: {
    width: (width - 64) / 4,
    aspectRatio: 1,
  },
  reviewImageContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
  },
  likeSection: {
    marginTop: 16,
  },
  like: {
    flexDirection: "row",
    gap: 4,
    padding: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderColor: "#EEEEEE",
    borderWidth: 1,
  },
  likeCount: {
    fontSize: 14,
    color: "#FF4081",
  },
  actionButtons: {
    position: "absolute",
    right: 16,
    bottom: 16,
    flexDirection: "row",
    gap: 12,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  space: {
    height: 2,
    backgroundColor: "#F5F5F5",
  },
});
