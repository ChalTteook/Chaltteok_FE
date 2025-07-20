import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { Review } from '../api/reviews/reviewApi';

interface ReviewListProps {
  reviews: Review[];
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: number) => void;
  currentUserId?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onEditReview,
  onDeleteReview,
  currentUserId,
}) => {
  const [showAll, setShowAll] = useState(false);
  // 각 리뷰별 좋아요 상태 관리
  const [likedMap, setLikedMap] = useState<{ [id: string]: boolean }>({});
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={14}
          color={i <= rating ? '#222' : '#D3D3D3'}
          style={{ marginRight: 1 }}
        />
      );
    }
    return <View style={{ flexDirection: 'row', marginLeft: 4 }}>{stars}</View>;
  };

  const handleDeleteReview = (reviewId: number) => {
    Alert.alert(
      '리뷰 삭제',
      '정말로 이 리뷰를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => onDeleteReview?.(reviewId),
        },
      ]
    );
  };

  const isMyReview = (review: Review) => {
    return currentUserId && review.userId === currentUserId;
  };

  const handleLikeToggle = (id: string | number) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 리뷰 내용이 없을 때 사용할 랜덤 문구
  const emptyMessages = [
    '사진이 정말 마음에 들어요!',
    '친절한 사진가님 덕분에 즐거웠어요.',
    '분위기가 너무 좋았어요!',
    '다음에도 또 방문하고 싶어요.',
    '추천하고 싶은 스튜디오입니다!',
  ];
  function getRandomMessage(id: string | number) {
    // id를 seed로 사용해 항상 같은 리뷰에 같은 문구가 나오도록
    const idx = Math.abs((typeof id === 'string' ? id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : id) % emptyMessages.length);
    return emptyMessages[idx];
  }

  // 별점이 없을 때 랜덤 별점 생성 (리뷰별 고정)
  function getRandomRating(id: string | number) {
    // id를 seed로 사용해 항상 같은 리뷰에 같은 별점이 나오도록
    const val = Math.abs((typeof id === 'string' ? id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : id) % 2);
    return 4 + val; // 4 또는 5
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="chatbubble-outline" size={48} color="#D3D3D3" />
        <Text style={styles.emptyText}>아직 리뷰가 없습니다.</Text>
        <Text style={styles.emptySubText}>첫 번째 리뷰를 작성해보세요!</Text>
      </View>
    );
  }

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {visibleReviews.map((review) => {
          const liked = likedMap[review.id] || false;
          const rating = (typeof review.rating === 'number' && review.rating > 0) ? review.rating : getRandomRating(review.id);
          return (
            <View key={review.id} style={styles.photoCard}>
              {/* 이미지 썸네일 영역 */}
              <View style={[styles.photoThumbnailContainer, !(review.images && review.images.length > 0) && styles.photoThumbnailNoImage]}>
                {review.images && review.images.length > 0 ? (
                  <FlatList
                    data={review.images}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, idx) => idx.toString()}
                    style={styles.photoThumbnailList}
                    renderItem={({ item }) => {
                      let uri = item;
                      if (typeof uri === 'string' &&
                        (uri.includes('unsplash.com') || uri.includes('dicebear.com')) &&
                        !uri.includes('?w=')
                      ) {
                        uri += (uri.includes('?') ? '&' : '?') + 'w=120&h=120&fit=crop';
                      }
                      return (
                        <Image
                          source={{ uri }}
                          style={styles.photoThumbnailImage}
                          resizeMode="cover"
                        />
                      );
                    }}
                  />
                ) : null}
              </View>

              {/* 정보 영역 */}
              <View style={styles.photoInfoRow}>
                <Text style={styles.photoUserName}>{typeof review.userName === 'string' && review.userName.length > 0 ? review.userName : '익명'}</Text>
                {renderStars(rating)}
                {isMyReview(review) ? (
                  <View style={styles.photoActionButtons}>
                    <TouchableOpacity
                      style={styles.photoActionButton}
                      onPress={() => onEditReview?.(review)}
                    >
                      <Icon name="create-outline" size={18} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.photoActionButton}
                      onPress={() => handleDeleteReview(review.id)}
                    >
                      <Icon name="trash-outline" size={18} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.photoReportButton}>
                    <Icon name="alert-circle-outline" size={16} color="#999" />
                    <Text style={styles.photoReportText}>신고</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* 리뷰 내용 */}
              <Text style={styles.photoContent} numberOfLines={3}>
                {review.content && review.content.trim().length > 0
                  ? review.content
                  : getRandomMessage(review.id)}
              </Text>
              {/* 좋아요 버튼 */}
              <TouchableOpacity
                style={styles.photoLikeButton}
                onPress={() => handleLikeToggle(review.id)}
                activeOpacity={0.7}
              >
                <Icon
                  name={liked ? 'heart' : 'heart-outline'}
                  size={16}
                  color={liked ? '#e91e63' : '#222'}
                />
                <Text
                  style={[styles.photoLikeText, liked && { color: '#e91e63', fontWeight: '700' }]}
                >
                  좋아요
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
        {(!showAll && reviews.length > 3) && (
          <TouchableOpacity style={styles.moreButton} onPress={() => setShowAll(true)}>
            <Text style={styles.moreButtonText}>더 보기</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  photoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  photoThumbnailContainer: {
    minHeight: 120,
    backgroundColor: '#F5F5F5',
    marginBottom: 0,
  },
  photoThumbnailNoImage: {
    minHeight: 0,
    height: 0,
    marginBottom: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  photoThumbnailList: {
    flexGrow: 0,
  },
  photoThumbnailImage: {
    width: 120,
    height: 120,
    borderRadius: 0,
    marginRight: 0,
    backgroundColor: '#F5F5F5',
  },
  photoThumbnailPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 4,
    gap: 8,
  },
  photoUserName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginRight: 6,
  },
  photoDate: {
    fontSize: 13,
    color: '#999',
    marginLeft: 6,
    marginRight: 6,
  },
  photoReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    padding: 4,
  },
  photoReportText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 2,
  },
  photoActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  photoActionButton: {
    padding: 8,
    marginLeft: 4,
  },
  photoContent: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    paddingHorizontal: 14,
    marginBottom: 12,
    marginTop: 2,
  },
  photoLikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginLeft: 14,
    marginBottom: 12,
  },
  photoLikeText: {
    fontSize: 14,
    color: '#222', // 검은색으로 변경
    marginLeft: 4,
    fontWeight: '500',
  },
  moreButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 12,
    backgroundColor: '#fff',
  },
  moreButtonText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '600',
  },
});

export default ReviewList; 