import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import ShareModal from "../../components/ShareModal";
import ActiveLikeIcon from "../../assets/ActiveLikeIcon";
import FavoriteIcon from "../../assets/FavoriteIcon";
import LikeIcon from "../../assets/LikeIcon";
import ShareIcon from "../../assets/ShareIcon";
import LeftHeader from "../../components/LeftHeader";

const { width } = Dimensions.get("window");

const tabs = ["소개", "촬영상품", "사진가", "리뷰"];

const mainImages = [
  { id: 1, source: require("../../assets/studio_image.png") },
  { id: 2, source: require("../../assets/studio_image.png") },
  { id: 3, source: require("../../assets/studio_image.png") },
];

const ReviewCard = ({ review, onProductPress }) => (
  <View style={[styles.reviewCard, { paddingLeft: 0 }]}>
    <View style={styles.reviewerInfo}>
      <View>
        <View style={styles.reviewRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name={star <= review.rating ? "star" : "star-outline"}
              size={16}
              color="#000"
            />
          ))}
          <Text style={styles.reviewerName}> {review.name}</Text>
          <Text style={styles.reviewDate}> | {review.date}</Text>
        </View>
        <TouchableOpacity onPress={() => onProductPress(review.productId)}>
          <Text style={styles.productTitle}>
            {review.productTitle}{" "}
            <Icon name="chevron-forward" size={16} color="#000" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.photographerName}>{review.photographerName}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.reportButton}>신고하기</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.reviewText}>{review.content}</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.reviewImagesScroll}
    >
      {review.images.map((item, index) => (
        <View key={index} style={styles.reviewImageContainer}>
          <Image source={item} style={styles.reviewImageContent} />
        </View>
      ))}
    </ScrollView>
    <TouchableOpacity style={styles.likeButton} onPress={review.onLikePress}>
      <Icon
        name={review.isLiked ? "heart" : "heart-outline"}
        size={20}
        color={review.isLiked ? "#FF4081" : "#000"}
      />
      <Text
        style={[
          styles.likeCount,
          { color: review.isLiked ? "#FF4081" : "#000" },
        ]}
      >
        {review.likes}+{" "}
      </Text>
      <Text style={styles.likeText}>좋아요</Text>
    </TouchableOpacity>
  </View>
);

export default function StudioDetailScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("소개");
  const [isLiked, setIsLiked] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [reviewCount] = useState("0,000");
  const scrollViewRef = useRef(null);
  const swiperRef = useRef(null);
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

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const goNext = () => {
    swiperRef.current?.scrollBy(1);
  };

  const goPrev = () => {
    swiperRef.current?.scrollBy(-1);
  };

  const productData = [
    {
      id: 1,
      title: "[가이드] 촬영상품명 최대 00글자",
      price: "99,999원",
      details: [
        "- 구성품선 텍스트 영역",
        "- 구성품선 텍스트 영역",
        "- 구성품선 텍스트 영역",
        "- 이미지 위치 박스, 텍스트 영역만 아래로 열리됨",
      ],
    },
    {
      id: 2,
      title: "1인 증명사진 촬영권",
      price: "90,000원",
      details: ["- 1인 1컷씩 눈정면 1컷", "- 오리지널 영역"],
    },
    {
      id: 3,
      title: "효도사진 패키지",
      price: "125,000원",
      details: ["- 1인 2컷씩 포함된 2컷", "- A4 원목 액자 포함"],
    },
  ];

  const photographerData = [
    {
      id: 1,
      title: "[가이드] 000작가(최대 1줄)",
      detail: "자기소개 최대 000자 최대 2줄 길어지면 말줄임",
      isBookable: true,
    },
    {
      id: 2,
      title: "허창훈 작가",
      detail: "자기소개 최대 000자 최대 2줄 길어지면 말줄임",
      isBookable: false,
    },
    {
      id: 3,
      title: "류정운 작가",
      detail: "자기소개 최대 000자 최대 2줄 길어지면 말줄임",
      isBookable: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LeftHeader />

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
          <Swiper
            ref={swiperRef}
            autoplayTimeout={5}
            showsPagination={false}
            loop={true}
            style={styles.swiper}
          >
            {mainImages.map((image, index) => (
              <View key={image.id} style={styles.slide}>
                <Image source={image.source} style={styles.mainImage} />
                <View style={styles.imageNumberContainer}>
                  <Text style={styles.imageNumber}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    <Text style={{ opacity: 0.5 }}> | </Text>
                    {mainImages.length < 10
                      ? `0${mainImages.length}`
                      : mainImages.length}
                  </Text>
                </View>
              </View>
            ))}
          </Swiper>
          <TouchableOpacity
            style={[styles.arrowButton, styles.leftButton]}
            onPress={goPrev}
          >
            <Icon name="chevron-back" size={21} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.arrowButton, styles.rightButton]}
            onPress={goNext}
          >
            <Icon name="chevron-forward" size={21} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Introduction Section */}
        <View ref={sectionRefs.소개} style={styles.section}>
          <View style={styles.studioInfoContainer}>
            <Text style={styles.studioName}>찰칵 스튜디오 연희점</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => setIsShareModalVisible(true)}
                style={styles.actionButton}
              >
                <ShareIcon />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={toggleLike}
                style={styles.actionButton}
              >
                {isLiked ? <ActiveLikeIcon /> : <LikeIcon />}
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.description}>
            스튜디오 소개 최대 한줄 30글자가 길어지면 말줄임...
          </Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#000" />
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

        <View style={{ height: 3 }} />

        {/* Products Section */}
        <View ref={sectionRefs.촬영상품} style={styles.productSection}>
          {productData.map((product, index) => (
            <View
              key={product.id}
              style={[
                styles.productCard,
                index === productData.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Image
                source={require("../../assets/studio_image.png")}
                style={styles.productImage}
              />
              <View>
                <Text style={styles.productTitle}>{product.title}</Text>
                {product.title.split("\n").length > 1 && (
                  <Text style={styles.productTitle}>
                    {product.title.split("\n")[1]}
                  </Text>
                )}
                <Text style={styles.price}>{product.price}</Text>
                <View style={styles.productDetails}>
                  {product.details.map((detail, i) => (
                    <Text key={i} style={styles.productDetail}>
                      {detail}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Photographers Section */}
        <View ref={sectionRefs.사진가} style={styles.section}>
          {photographerData.map((photographer, index) => (
            <View
              key={photographer.id}
              style={[
                styles.photographerCard,
                index === photographerData.length - 1 && {
                  borderBottomWidth: 0,
                  paddingBottom: 0,
                },
              ]}
            >
              <View style={styles.photographerImageContainer}>
                <Image
                  source={require("../../assets/studio_image.png")}
                  style={styles.photographerImage}
                />
              </View>
              <View style={styles.photographerContent}>
                <Text style={styles.photographerTitle}>
                  {photographer.title}
                </Text>
                <Text style={styles.photographerDetail}>
                  {photographer.detail}
                </Text>
              </View>
              <TouchableOpacity
                style={
                  photographer.isBookable
                    ? styles.reserveButton
                    : styles.reserveButtonGray
                }
                onPress={() =>
                  photographer.isBookable &&
                  navigation.navigate("ReservationPage")
                }
              >
                <Text style={styles.reserveButtonText}>
                  {photographer.isBookable ? "예약" : "예약불가"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Photo Reviews Section */}
        <View style={styles.photoReviewSection}>
          <View style={styles.photoReviewHeader}>
            <Text style={styles.photoReviewTitle}>
              사진 리뷰 <Text style={styles.reviewCount}>({reviewCount})</Text>
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.viewAllPhotos}>사진 리뷰 모아보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoReviewScroll}
          >
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity key={item} style={styles.photoReviewItem}>
                <Image
                  source={require("../../assets/studio_image.png")}
                  style={styles.photoReviewImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reviews Section */}
        <View
          ref={sectionRefs.리뷰}
          style={[styles.section, { borderTopWidth: 0 }]}
        >
          <View
            style={[
              styles.reviewHeader,
              {
                borderBottomWidth: 1,
                borderBottomColor: "#EEEEEE",
                paddingBottom: 16,
              },
            ]}
          >
            <View style={styles.reviewStats}>
              <Text style={styles.reviewTitle}>방문자 리뷰 ★ 4.5</Text>
              <Text style={styles.reviewCount}>(0,000)</Text>
            </View>
            <View style={styles.reviewFilters}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>사진가 전체 0,000</Text>
                <Icon name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>최신순</Text>
                <Icon name="chevron-down" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <ReviewCard
            review={{
              rating: 4,
              name: "닉네임",
              date: "0000. 00. 00",
              productId: "1",
              productTitle: "1인 증명사진 촬영권",
              photographerName: "김찰떡 사진가",
              content:
                "리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용 리뷰 내용",
              images: [1, 2, 3, 4].map(() =>
                require("../../assets/studio_image.png")
              ),
              isLiked: isLiked,
              likes: "000",
              onLikePress: () => setIsLiked(!isLiked),
            }}
            onProductPress={(productId) => {
              sectionRefs["촬영상품"].current?.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                  scrollViewRef.current?.scrollTo({ y: y, animated: true });
                }
              );
            }}
          />
          <ReviewCard
            review={{
              rating: 5,
              name: "새로운 리뷰어",
              date: "0000. 00. 00",
              productId: "2",
              productTitle: "커플 촬영 패키지",
              photographerName: "이찰떡 사진가",
              content:
                "새로운 리뷰 내용입니다. 촬영 경험이 정말 좋았습니다. 사진가님의 친절한 설명과 안내 덕분에 편안한 분위기에서 촬영할 수 있었어요.",
              images: [1, 2].map(() =>
                require("../../assets/studio_image.png")
              ),
              isLiked: false,
              likes: "015",
              onLikePress: () => {},
            }}
            onProductPress={(productId) => {
              sectionRefs["촬영상품"].current?.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                  scrollViewRef.current?.scrollTo({ y: y, animated: true });
                }
              );
            }}
          />
        </View>
      </ScrollView>

      <ShareModal
        isVisible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
      />
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
    justifyContent: "center",
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 16,
    position: "relative",
    top: 30
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
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
    paddingLeft: 16,
  },
  imageContainer: {
    width: width,
    height: width,
    position: "relative",
    marginLeft: -16,
  },
  swiper: {
    height: width,
  },
  slide: {
    width: width,
    height: width,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  imageNumberContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 24,
    padding: 8,
    width: "15%",
    height: "7%",
  },
  imageNumber: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 13,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontWeight: "bold",
  },
  arrowButton: {
    position: "absolute",
    top: "38%",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 30,
    padding: 7,
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  section: {
    padding: 16,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  studioName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    width: "100%",
    marginTop: -9,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
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
    marginVertical: 4,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    fontWeight: "900",
  },
  detailValue: {
    fontSize: 14,
  },
  productSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  productCard: {
    flexDirection: "row",
    marginVertical: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 4,
    marginRight: 16,
    borderRadius: 8,
  },
  productContent: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FF4081",
    marginBottom: 10,
  },
  productDetails: {
    gap: 4,
  },
  productDetail: {
    fontSize: 12,
    lineHeight: 14,
  },
  photographerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  photographerImageContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#F5F5F5",
    marginRight: 16,
    borderRadius: 90,
    overflow: "hidden",
  },
  photographerImage: {
    width: "100%",
    height: "100%",
  },
  photographerContent: {
    flex: 1,
    justifyContent: "center",
  },
  photographerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  photographerDetail: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  reserveButton: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    alignSelf: "center",
  },
  reserveButtonGray: {
    backgroundColor: "#999",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    alignSelf: "center",
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  reviewCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginBottom: 16,
  },
  reviewerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    color: "#333",
  },
  reviewDate: {
    fontSize: 14,
    color: "#666",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  photographerName: {
    fontSize: 14,
    color: "#666",
  },
  reportButton: {
    fontSize: 12,
    color: "#666",
    padding: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    color: "#333",
  },
  reviewImagesScroll: {
    marginBottom: 16,
  },
  reviewImageContainer: {
    width: 120,
    height: 120,
    marginRight: 8,
  },
  reviewImageContent: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 20,
  },
  likeCount: {
    fontSize: 14,
    color: "#FF4081",
    marginLeft: 4,
  },
  likeText: {
    fontSize: 14,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  studioInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingRight: 8,
  },
  space: {
    height: 24,
  },
  photoReviewSection: {
    paddingVertical: 24,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  photoReviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    marginBottom: 16,
  },
  photoReviewTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  viewAllPhotos: {
    fontSize: 14,
    color: "#666",
  },
  photoReviewScroll: {
    paddingLeft: 0,
    paddingRight: 16,
  },
  photoReviewItem: {
    width: 120,
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 8,
  },
  photoReviewImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
});
