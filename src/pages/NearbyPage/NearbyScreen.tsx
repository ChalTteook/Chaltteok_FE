import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   NaverMapView,
//   Camera,
//   NaverMapMarkerOverlay,
// } from "@mj-studio/react-native-naver-map";
import { useStudioMarkers, StudioMarker } from '../../services/mapService';
import { hide } from 'expo-splash-screen';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import { getStoreList } from "../../api/Store/StoreApi";
import { Store } from "../../types/store";
import { StoreList } from "../../components/Store/StoreList";
import { SearchBar } from "../../components/SearchBar";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

// 임시 Camera 타입 정의
type Camera = {
  latitude: number;
  longitude: number;
  zoom: number;
};

const Cameras = {
  HongDae: {
    latitude: 37.556854408446654,
    longitude: 126.92359523466598,
    zoom: 16,
  },
} satisfies Record<string, Camera>;

const NearbyScreen = ({ navigation }) => {
  const [camera, setCamera] = useState<Camera>(Cameras.HongDae);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState<StudioMarker | null>(null);

  const { markers, loading, error } = useStudioMarkers();

  const showCard = (studio: StudioMarker) => {
    setSelectedStudio(studio);
    setIsCardVisible(true);

    setCamera({
      latitude: studio.latitude,
      longitude: studio.longitude,
      zoom: 17,
    });
  };

  const hideCard = () => {
    setIsCardVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 안내 메시지 박스 */}
      <View style={styles.noticeBox}>
        <Icon name="map-outline" size={32} color="#FF568F" style={{ marginBottom: 6 }} />
        <Text style={styles.noticeTitle}>위치 기반 추천 서비스는 준비 중입니다</Text>
        <Text style={styles.noticeSub}>네이버 맵 기능은 현재 비활성화되어 있습니다. (React Native 0.78.0 업그레이드 중)</Text>
      </View>

      {/* 나머지 기존 UI (리스트/카드/기능 등) */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF568F" />
            <Text style={styles.loadingText}>사진관 정보를 불러오는 중...</Text>
          </View>
        ) : (
          <View style={styles.tempMapContainer}>
            <ScrollView
              style={styles.tempListContainer}
              contentContainerStyle={{ paddingTop: 4, paddingBottom: 8 }}
            >
            {markers.map((studio) => (
                <TouchableOpacity 
                key={studio.id}
                  style={styles.tempStudioItem}
                  onPress={() => showCard(studio)}
                >
                  <Text style={styles.studioName}>{studio.title}</Text>
                  <Text style={styles.description} numberOfLines={1}>{studio.description}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Studio Card */}
      {isCardVisible && selectedStudio && (
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.studioCard}
            onPress={() => navigation.navigate('StudioPage', { id: selectedStudio.id })}
          >
            <View style={styles.studioInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.studioName}>{selectedStudio.title}</Text>
                <TouchableOpacity style={styles.heartButton}>
                  <Icon name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.description} numberOfLines={1}>
                {selectedStudio.description}
              </Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{selectedStudio.rating}</Text>
                <Text style={styles.reviews}>({selectedStudio.reviews})</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedStudio.img }}
                style={styles.studioImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.bottomInfo}>
              {selectedStudio.price && (
                <Text style={styles.price}>{selectedStudio.price}</Text>
              )}
              <Text style={styles.hours}>{selectedStudio.hours}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    position: 'absolute',
    top: 120, 
    left: 0,
    right: 0,
    zIndex: 1,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    color: '#000',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  filterText: {
    marginRight: 4,
    color: '#000',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  tempMapContainer: {
    backgroundColor: '#fff',
  },
  tempMapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tempMapSubText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  tempListContainer: {
    width: '100%',
    backgroundColor: '#fff',
  },
  tempStudioItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    // 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // 그림자 (Android)
    elevation: 3,
    // 경계선
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  studioCard: {
    width: '100%',
  },
  studioInfo: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studioName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 2,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  studioImage: {
    width: '100%',
    height: '100%',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF568F',
  },
  hours: {
    fontSize: 14,
    color: '#666',
  },
  heartButton: {
    padding: 8,
  },
  locationButtons: {
    position: 'absolute',
    left: 16,
    bottom: 180,
    flexDirection: 'column',
    gap: 8,
  },
  locationButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  locationButtonText: {
    marginRight: 4,
    color: '#000',
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 120,
    flexDirection: 'column',
    gap: 8,
  },
  fab: {
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  fabLocation: {
    backgroundColor: '#FF568F',
  },
  noticeBox: {
    width: '100%',
    backgroundColor: '#FFF0F6',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE0EC',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'column',
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF568F',
    marginBottom: 2,
    textAlign: 'center',
  },
  noticeSub: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
});

export default NearbyScreen;

