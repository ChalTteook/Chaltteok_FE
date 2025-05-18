import { useState, useEffect } from 'react';
import { getAllShops } from "../api/shops/shopApi";

// 스튜디오 마커 타입 정의
export interface StudioMarker {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  img: string;
  description: string;
  price: string | null;
  hours: string;
  rating?: number;
  reviews?: number;
  is_partner: number;
}

/**
 * response.data에서 마커 정보 가져오기
 */
export const getStudioMarkers = async (): Promise<StudioMarker[]> => {
  try {
    console.log('사진관 마커 정보 요청 시작');
    const response = await getAllShops();
    
    console.log('사진관 API 응답 구조:', {
      status: typeof response.status,
      hasData: !!response.data,
      dataType: typeof response.data,
      isArray: Array.isArray(response.data),
      dataLength: Array.isArray(response.data) ? response.data.length : 'not an array'
    });
    
    // 응답 데이터가 없거나 배열이 아닌 경우 처리
    if (!response.data || !Array.isArray(response.data)) {
      console.error('유효하지 않은 API 응답 데이터:', response.data);
      return [];
    }
    
    // API 응답에서 필요한 데이터만 추출하여 마커 형식으로 변환
    return response.data.map((shop: any) => ({
      id: shop.id,
      title: shop.title,
      latitude: parseFloat(shop.latitude),
      longitude: parseFloat(shop.longitude),
      img: shop.img,
      description: shop.description || '위치 정보 없음',
      price: shop.price,
      hours: shop.open_time !== 'Unknown' && shop.close_time !== 'Unknown' 
        ? `${shop.open_time}~${shop.close_time}` 
        : '영업시간 정보 없음',
      rating: 4.5, // 예시 데이터 (API에 없을 경우)
      reviews: 74, // 예시 데이터 (API에 없을 경우)
      is_partner: shop.is_partner
    }));
  } catch (error) {
    console.error('매장 마커 정보를 가져오는데 실패했습니다:', error);
    // 임시 데이터 반환 (개발 및 테스트 환경용)
    if (process.env.NODE_ENV !== 'production') {
      console.log('테스트용 임시 데이터 사용');
      return [
        {
          id: 1,
          title: '테스트 사진관',
          latitude: 37.556854408446654,
          longitude: 126.92359523466598,
          img: 'https://via.placeholder.com/150',
          description: '테스트 설명',
          price: '30,000원~',
          hours: '09:00~18:00',
          rating: 4.5,
          reviews: 74,
          is_partner: 1
        }
      ];
    }
    return [];
  }
};

/**
 * 매장 마커 데이터를 관리하는 React Hook
 * @returns 매장 마커 상태와 로딩 상태
 */
export const useStudioMarkers = () => {
  const [markers, setMarkers] = useState<StudioMarker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setLoading(true);
        const markerData = await getStudioMarkers();
        setMarkers(markerData);
        setError(null);
      } catch (err) {
        setError('매장 마커 정보를 불러오는데 실패했습니다');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkers();
  }, []);

  return { markers, loading, error };
};

/**
 * 파트너 매장과 일반 매장을 구분하여 반환
 * @param markers 모든 매장 마커 배열
 * @returns 파트너 매장과 일반 매장으로 구분된 객체
 */
export const categorizeMarkers = (markers: StudioMarker[]) => {
  const partnerMarkers = markers.filter(marker => marker.is_partner === 1);
  const regularMarkers = markers.filter(marker => marker.is_partner === 0);
  
  return { partnerMarkers, regularMarkers };
};

export default {
  getStudioMarkers,
  useStudioMarkers,
  categorizeMarkers
};