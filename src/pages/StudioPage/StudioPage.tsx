import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Share,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import ShareModal from "../../components/ShareModal";
import ActiveLikeIcon from "../../assets/ActiveLikeIcon";
import FavoriteIcon from "../../assets/FavoriteIcon";
import LikeIcon from "../../assets/LikeIcon";
import ShareIcon from "../../assets/ShareIcon";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";
import { useRoute, RouteProp } from "@react-navigation/native";
import { getStudioInfo } from "../../api/shops/shopDetailApi";
import { 
  getShopReviews, 
  createShopReview, 
  updateShopReview, 
  deleteShopReview,
  Review,
  CreateReviewRequest,
  UpdateReviewRequest
} from "../../api/reviews/reviewApi";

// params 타입 정의
type StudioPageParams = {
  StudioPage: {
    id: string;
  };
};

const { width } = Dimensions.get("window");

const tabs = ["소개", "촬영상품", "사진가", "리뷰"];

const defaultMainImages = [
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
          <Text style={styles.reviewProductTitle}>
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
  const route = useRoute<RouteProp<StudioPageParams, 'StudioPage'>>();
  const { id } = route.params || {};
  
  // id가 없으면 기본값 설정 또는 에러 처리
  if (!id) {
    console.warn('StudioPage: id 파라미터가 없습니다.');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>스튜디오 정보</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>스튜디오 정보를 불러올 수 없습니다.</Text>
        </View>
      </View>
    );
  }
  const [ images, setImages] = useState([]);
  const [ isDefault, setIsDefault] = useState(true);


  const [studios, setStudios] = useState([]);
  const [activeTab, setActiveTab] = useState("소개");
  const [isLiked, setIsLiked] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [reviewCount] = useState("0,000");
  
  // 리뷰 관련 상태
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [currentUserId] = useState('user1'); // 실제로는 인증된 사용자 ID를 사용
  const scrollViewRef = useRef(null);
  const swiperRef = useRef(null);
  const sectionRefs = {
    소개: useRef(null),
    촬영상품: useRef(null),
    사진가: useRef(null),
    리뷰: useRef(null),
  };

  useEffect(() => {
    const fetchStudioData = async () => {
      try {
        const response = await getStudioInfo(id);
        const { img } = response.data;
        setStudios(response.data);
        if (img) {
          setImages([{ id: 0, source: { uri: img } }, ...defaultMainImages]);
          setIsDefault(false);
        }
      } catch (error) {
        console.error('사진관 상세 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsData = await getShopReviews(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error('리뷰를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchStudioData();
    fetchReviews();
  }, [id]);

  // 리뷰 관련 함수들
  const handleCreateReview = async (reviewData: CreateReviewRequest) => {
    setIsReviewLoading(true);
    try {
      const newReview = await createShopReview(id, reviewData);
      setReviews(prev => [newReview, ...prev]);
      setIsReviewModalVisible(false);
      Alert.alert('성공', '리뷰가 등록되었습니다.');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
      Alert.alert('오류', '리뷰 등록에 실패했습니다.');
    } finally {
      setIsReviewLoading(false);
    }
  };

  const handleUpdateReview = async (reviewData: UpdateReviewRequest) => {
    if (!editingReview) return;
    
    setIsReviewLoading(true);
    try {
      const updatedReview = await updateShopReview(id, editingReview.id, reviewData);
      setReviews(prev => prev.map(review => 
        review.id === editingReview.id ? updatedReview : review
      ));
      setIsReviewModalVisible(false);
      setEditingReview(null);
      Alert.alert('성공', '리뷰가 수정되었습니다.');
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
      Alert.alert('오류', '리뷰 수정에 실패했습니다.');
    } finally {
      setIsReviewLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteShopReview(id, reviewId);
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      Alert.alert('성공', '리뷰가 삭제되었습니다.');
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      Alert.alert('오류', '리뷰 삭제에 실패했습니다.');
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setIsReviewModalVisible(true);
  };

  const handleReviewSubmit = (data: CreateReviewRequest | UpdateReviewRequest) => {
    if (editingReview) {
      handleUpdateReview(data as UpdateReviewRequest);
    } else {
      handleCreateReview(data as CreateReviewRequest);
    }
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
      title: "1인 증명사진 촬영권",
      price: "49,000원",
      details: [
        "- 전문가 촬영 + 1컷 보정본 제공",
        "- 공식 문서(여권·신분증) 사용 가능",
        "- 자동사진 대비 고차감성 대비",
        "- 이미지 위치 박스, 텍스트 영역만 아래로 열리됨",
      ],
    },
    {
      id: 2,
      title: "프로필 & 영상 촬영 패키지",
      price: "139,000원",
      details: ["-1인 기준 프로필 촬영 + 인터뷰 영상 구성 포함", "- 보정본 2컷 + 전체 원본 제공"],
    },
    {
      id: 3,
      title: "효도사진 패키지",
      price: "119,000원",
      details: ["- 1인 2컷씩 포함된 2컷", "- A4 원목 액자 포함"],
    },
  ];

  const photographerData = [
    {
      id: 1,
      title: "오늘의 찰떡 작가",
      detail: "AI가 당신의 취향에 맞는 작가를 매일 새롭게 매칭해드립니다.",
      isBookable: true,
    },
    {
      id: 2,
      title: "허창훈 작가",
      detail: "인생의 중요한 순간을 묵직하게 기록합니다. 클래식한 톤과 자연광 연출이 강점입니다.",
      isBookable: true,
    },
    {
      id: 3,
      title: "류정윤 작가",
      detail: "부드러운 색감과 편안한 분위기 속 촬영을 지향합니다. SNS 프로필 및 반려사진 전문.",
      isBookable: true,
    },
  ];

  // 소개 문구 후보 배열
  const studioDescriptions = [
    "당신의 소중한 순간을 감각적으로 담아드립니다.",
    "자연광과 감성, 그리고 프로페셔널한 촬영 경험을 선사합니다.",
    "특별한 하루, 특별한 사진으로 남겨보세요.",
    "편안한 분위기에서 최고의 프로필을 완성하세요.",
    "추억을 예술로, 일상을 작품으로 만들어드립니다.",
    "가족, 친구, 연인과 함께하는 행복한 촬영 공간.",
    "트렌디한 감성, 합리적인 가격, 만족스러운 결과!",
    "사진 한 장에 담긴 당신만의 이야기를 기록합니다.",
    "전문가의 손길로 완성되는 특별한 순간.",
    "찰나의 순간도 아름답게, 오직 당신을 위한 스튜디오.",
  ];

  // 랜덤 소개 문구와 별점은 최초 렌더링 시 한 번만 생성
  const [randomDescription] = useState(
    studioDescriptions[Math.floor(Math.random() * studioDescriptions.length)]
  );
  const [randomRating] = useState(
    (Math.random() * 0.7 + 4.3).toFixed(2)
  );

  // 상품 이미지 배열 (제목/설명에 맞는 신중한 추천)
  const productImages = [
    // 1인 증명사진 촬영권
    'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    // 프로필 & 영상 촬영 패키지
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    // 효도사진 패키지
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
  ];
  // 사진가 이미지 배열 (차분한 애니메이션 캐릭터)
  const photographerImages = [
    'https://api.dicebear.com/7.x/micah/png?seed=photographer1',
    'https://api.dicebear.com/7.x/micah/png?seed=photographer2',
    'https://api.dicebear.com/7.x/micah/png?seed=photographer3',
  ];

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
        <Text style={styles.headerTitle}>{studios.title}</Text>
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
          <Swiper
            ref={swiperRef}
            autoplayTimeout={5}
            showsPagination={false}
            loop={true}
            style={styles.swiper}
          >
            {/* 사진관 이미지 목록 처리 필요 */}
            {/* {images.map((image) => (
              <View key={image.id} style={styles.slide}>
                <Image source={image.source} style={styles.mainImage} />
                <View style={styles.imageNumberContainer}>
                  <Text style={styles.imageNumber}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    <Text style={{ opacity: 0.5 }}> | </Text>
                    {defaultMainImages.length < 10
                      ? `0${defaultMainImages.length}`
                      : defaultMainImages.length}
                  </Text>
                </View>
              </View>
            ))} */}
            {/* 임시 이미지 표시 */}
            {studios && studios.img ? (
              // 서버에서 가져온 이미지가 있는 경우
              <View key="serverImage" style={styles.slide}>
                <Image 
                  source={{ uri: studios.img }} 
                  style={styles.mainImage}
                  // 이미지 로드 오류 디버깅을 위한 코드
                  onError={(e) => console.log('이미지 로드 에러:', e.nativeEvent.error)}
                />
                <View style={styles.imageNumberContainer}>
                  <Text style={styles.imageNumber}>
                    01<Text style={{ opacity: 0.5 }}> | </Text>01
                  </Text>
                </View>
              </View>
            ) : (
              // 기본 이미지 표시
              defaultMainImages.map((image, idx) => (
                <View key={image.id} style={styles.slide}>
                  <Image source={image.source} style={styles.mainImage} />
                  <View style={styles.imageNumberContainer}>
                    <Text style={styles.imageNumber}>
                      {(idx + 1) < 10 ? `0${idx + 1}` : idx + 1}
                      <Text style={{ opacity: 0.5 }}> | </Text>
                      {defaultMainImages.length < 10
                        ? `0${defaultMainImages.length}`
                        : defaultMainImages.length}
                    </Text>
                  </View>
                </View>
              ))
            )}
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
            <Text style={styles.studioName}>{studios.title}</Text>
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
            {randomDescription}
          </Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#000" />
            <Text style={styles.rating}>{randomRating}</Text>
            <Text style={styles.location}>{studios.address || ''}</Text>
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
          {productData.map((product, index) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                index === productData.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => navigation.navigate("ReservationPage", {
                studioId: id,
                productId: product.id,
                productTitle: product.title,
                productPrice: product.price
              })}
            >
              <Image
                source={{ uri: productImages[index % productImages.length] }}
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
            </TouchableOpacity>
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
                  source={{ uri: photographerImages[index % photographerImages.length] }}
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
          style={[styles.section, { borderTopWidth: 0, backgroundColor: '#fff', paddingTop: 24, paddingBottom: 0 }]}
        >
          {/* 리뷰 헤더 */}
          <View style={{ marginBottom: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222' }}>방문자 리뷰</Text>
              <Icon name="star" size={16} color="#222" style={{ marginLeft: 6, marginRight: 2 }} />
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#222' }}>{randomRating}</Text>
              <Text style={{ fontSize: 15, color: '#666', marginLeft: 6 }}>({reviews.length.toLocaleString()})</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 14, color: '#222', fontWeight: '500' }}>사진가 전체</Text>
                <Icon name="chevron-down" size={16} color="#888" style={{ marginLeft: 2 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 14, color: '#222', fontWeight: '500' }}>최신순</Text>
                <Icon name="chevron-down" size={16} color="#888" style={{ marginLeft: 2 }} />
              </TouchableOpacity>
            </View>
          </View>
          {/* 리뷰 카드 리스트 */}
          <View>
            {reviews.map((review, idx) => (
              <View key={review.id || idx} style={{ marginBottom: 24, paddingHorizontal: 0, paddingVertical: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  {[1,2,3,4,5].map(star => (
                    <Icon key={star} name={star <= review.rating ? 'star' : 'star-outline'} size={16} color="#222" />
                  ))}
                  <Text style={{ fontSize: 14, color: '#222', fontWeight: 'bold', marginLeft: 6 }}>{review.nickname || '닉네임'}</Text>
                  <Text style={{ fontSize: 13, color: '#888', marginLeft: 6 }}>{review.date || '0000.00.00'}</Text>
                  <TouchableOpacity style={{ marginLeft: 'auto' }}>
                    <Text style={{ fontSize: 13, color: '#888' }}>신고하기</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#222' }}>{review.productTitle || '1인 증명사진 촬영권'}</Text>
                  <Icon name="chevron-forward" size={16} color="#222" style={{ marginLeft: 2 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{review.photographerName || '김찰떡 사진가'}</Text>
                <Text style={{ fontSize: 14, color: '#222', marginBottom: 12, lineHeight: 20 }}>{review.content || '리뷰 내용'}</Text>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                  {(review.images && review.images.length > 0 ? review.images : [null, null, null, null]).map((img, i) => (
                    <View key={i} style={{ width: 70, height: 70, borderRadius: 8, backgroundColor: '#F5F5F5', marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
                      {img ? <Image source={img} style={{ width: '100%', height: '100%', borderRadius: 8 }} /> : <Icon name="image-outline" size={32} color="#CCC" />}
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#fff', alignSelf: 'flex-start' }} onPress={review.onLikePress}>
                  <Icon name={review.isLiked ? 'heart' : 'heart-outline'} size={20} color={review.isLiked ? '#FF4081' : '#222'} />
                  <Text style={{ fontSize: 14, color: review.isLiked ? '#FF4081' : '#222', marginLeft: 4 }}>{review.likes ? `${review.likes}+` : '000+'}</Text>
                  <Text style={{ fontSize: 14, color: '#222', marginLeft: 4 }}>좋아요</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <ShareModal
        isVisible={isShareModalVisible}
        onClose={() => setIsShareModalVisible(false)}
      />

      {/* 리뷰 작성/수정 모달 */}
      <Modal
        visible={isReviewModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ReviewForm
          shopId={id}
          review={editingReview}
          onSubmit={handleReviewSubmit}
          onCancel={() => {
            setIsReviewModalVisible(false);
            setEditingReview(null);
          }}
          isLoading={isReviewLoading}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 16,
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
    borderRadius: 8,
    backgroundColor: '#fff',
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
    borderRadius: 8,
    backgroundColor: '#fff',
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
    borderBottomColor: '#EEEEEE',
    borderRadius: 8,
    backgroundColor: '#fff',
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
  reviewProductTitle: {
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
  reviewActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  writeReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F0F8FF",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
  },
  writeReviewText: {
    fontSize: 14,
    color: "#007AFF",
    marginLeft: 4,
    fontWeight: "500",
  },
});
