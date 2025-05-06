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
    const response = await getAllShops();
    
    // API 응답에서 필요한 데이터만 추출하여 마커 형식으로 변환
    return response.data.map(shop => ({
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