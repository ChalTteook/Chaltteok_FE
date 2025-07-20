import axiosInstance from '../../../axiosInstance';

// 리뷰 타입 정의
export interface Review {
  id: number;
  shopId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  rating: number;
  content: string;
  images?: string[];
}

export interface UpdateReviewRequest {
  rating?: number;
  content?: string;
  images?: string[];
}

export interface ReviewResponse {
  success: boolean;
  data: Review | Review[];
  message?: string;
}

// 매장 리뷰 조회
export const getShopReviews = async (shopId: string): Promise<Review[]> => {
  try {
    console.log(`리뷰 조회 요청 - 매장 ID: ${shopId}`);
    const response = await axiosInstance.get(`/reviews/shops/${shopId}`);
    console.log('리뷰 조회 성공:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('리뷰 조회 실패:', error);
    
    // 개발 환경에서 테스트용 더미 데이터 반환
    if (process.env.NODE_ENV !== 'production') {
      console.log('테스트용 더미 리뷰 데이터 반환');
      return generateDummyReviews(shopId);
    }
    
    throw error;
  }
};

// 매장 리뷰 등록
export const createShopReview = async (
  shopId: string, 
  reviewData: CreateReviewRequest
): Promise<Review> => {
  try {
    console.log(`리뷰 등록 요청 - 매장 ID: ${shopId}`, reviewData);
    const response = await axiosInstance.post(`/reviews/shops/${shopId}`, reviewData);
    console.log('리뷰 등록 성공:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('리뷰 등록 실패:', error);
    
    // 개발 환경에서 401 오류 시 더미 데이터 반환
    if (error.response?.status === 401 && process.env.NODE_ENV !== 'production') {
      console.log('401 오류 - 테스트용 더미 리뷰 생성');
      const dummyReview: Review = {
        id: Date.now(),
        shopId,
        userId: 'user1',
        userName: '테스트 사용자',
        rating: reviewData.rating,
        content: reviewData.content,
        images: reviewData.images || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return dummyReview;
    }
    
    throw error;
  }
};

// 매장 리뷰 수정
export const updateShopReview = async (
  shopId: string, 
  reviewId: number,
  reviewData: UpdateReviewRequest
): Promise<Review> => {
  try {
    console.log(`리뷰 수정 요청 - 매장 ID: ${shopId}, 리뷰 ID: ${reviewId}`, reviewData);
    const response = await axiosInstance.put(`/reviews/shops/${shopId}`, {
      reviewId,
      ...reviewData
    });
    console.log('리뷰 수정 성공:', response.data);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('리뷰 수정 실패:', error);
    
    // 개발 환경에서 401 오류 시 더미 데이터 반환
    if (error.response?.status === 401 && process.env.NODE_ENV !== 'production') {
      console.log('401 오류 - 테스트용 더미 리뷰 수정');
      const dummyReview: Review = {
        id: reviewId,
        shopId,
        userId: 'user1',
        userName: '테스트 사용자',
        rating: reviewData.rating || 5,
        content: reviewData.content || '수정된 리뷰 내용',
        images: reviewData.images || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return dummyReview;
    }
    
    throw error;
  }
};

// 매장 리뷰 삭제
export const deleteShopReview = async (shopId: string, reviewId: number): Promise<void> => {
  try {
    console.log(`리뷰 삭제 요청 - 매장 ID: ${shopId}, 리뷰 ID: ${reviewId}`);
    await axiosInstance.delete(`/reviews/shops/${shopId}`, {
      data: { reviewId }
    });
    console.log('리뷰 삭제 성공');
  } catch (error: any) {
    console.error('리뷰 삭제 실패:', error);
    
    // 개발 환경에서 401 오류 시 성공으로 처리
    if (error.response?.status === 401 && process.env.NODE_ENV !== 'production') {
      console.log('401 오류 - 테스트용 삭제 성공 처리');
      return;
    }
    
    throw error;
  }
};

// 테스트용 더미 리뷰 데이터 생성
const generateDummyReviews = (shopId: string): Review[] => {
  const dummyReviews: Review[] = [
    {
      id: 1,
      shopId,
      userId: 'user1',
      userName: '김사진',
      rating: 5,
      content: '정말 만족스러운 촬영이었습니다! 사진가님이 친절하고 전문적이어서 좋았어요. 결과물도 기대 이상이었습니다.',
      images: ['https://images.unsplash.com/photo-1515378791036-0648a3ef77b2'],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      shopId,
      userId: 'user2',
      userName: '이미래',
      rating: 4,
      content: '분위기가 좋고 촬영도 잘 되었습니다. 다만 대기 시간이 조금 있었네요. 전반적으로 만족합니다.',
      images: [],
      createdAt: '2024-01-10T14:20:00Z',
      updatedAt: '2024-01-10T14:20:00Z'
    },
    {
      id: 3,
      shopId,
      userId: 'user3',
      userName: '박예술',
      rating: 5,
      content: '가족사진 촬영을 했는데 정말 예쁘게 나왔어요! 아이들도 편안하게 촬영할 수 있었고, 자연스러운 표정을 잘 잡아주셨습니다.',
      images: ['https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91'],
      createdAt: '2024-01-05T16:45:00Z',
      updatedAt: '2024-01-05T16:45:00Z'
    },
    {
      id: 4,
      shopId,
      userId: 'user4',
      userName: '최감성',
      rating: 4,
      content: '커플사진 촬영했는데 로맨틱한 분위기로 잘 나왔습니다. 사진가님이 포즈도 잘 잡아주시고 편안하게 촬영할 수 있었어요.',
      images: [],
      createdAt: '2024-01-01T11:15:00Z',
      updatedAt: '2024-01-01T11:15:00Z'
    },
    {
      id: 5,
      shopId,
      userId: 'user5',
      userName: '정프로',
      rating: 5,
      content: '비즈니스 프로필 사진을 촬영했는데 정말 전문적이고 깔끔하게 나왔습니다. 업무용으로 완벽해요!',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'],
      createdAt: '2023-12-28T09:30:00Z',
      updatedAt: '2023-12-28T09:30:00Z'
    }
  ];
  
  return dummyReviews;
}; 