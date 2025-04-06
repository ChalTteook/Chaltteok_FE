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
import {
  NaverMapView,
  Camera,
  NaverMapMarkerOverlay,
} from "@mj-studio/react-native-naver-map";
import { useStudioMarkers, StudioMarker } from '../../services/mapService';
import { hide } from 'expo-splash-screen';

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
      
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF568F" />
            <Text style={styles.loadingText}>사진관 정보를 불러오는 중...</Text>
          </View>
        ) : (
          <NaverMapView 
            style={styles.map} 
            camera={camera} 
            onMapClick={() => {
              hideCard();
            }}
          >
            {markers.map((studio) => (
              <NaverMapMarkerOverlay
                key={studio.id}
                latitude={studio.latitude}
                longitude={studio.longitude}
                onTap={() => {
                  console.log(`선택된 사진관: ${studio.title}`);
                  showCard(studio);
                }}
                anchor={{ x: 0.5, y: 1 }}
                width={55}
                height={55}
                image={require('../../assets/markerIcons/markerIcon.png')}
              />
            ))}
          </NaverMapView>
        )}
      </View>

      {/* Search Bar */}
      {isSearchBarVisible && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="장소/지명으로도 검색해보세요"
              placeholderTextColor="#666"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>가격</Text>
            <Icon name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      )}

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
            
            {/* 사진관 이미지 */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedStudio.img }}
                style={styles.studioImage}
                resizeMode="cover"
              />
            </View>
            
            {/* 가격 및 영업시간 */}
            <View style={styles.bottomInfo}>
              {selectedStudio.price && (
                <Text style={styles.price}>{selectedStudio.price}</Text>
              )}
              <Text style={styles.hours}>{selectedStudio.hours}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Location Buttons */}
      <View style={styles.locationButtons}>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => {}}
        >
          <Text style={styles.locationButtonText}>가격</Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => {}}
        >
          <Text style={styles.locationButtonText}>지역</Text>
          <Icon name="chevron-down" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Floating Action Buttons */}
      <View style={[
        styles.fabContainer,
        isCardVisible && { bottom: 270 }
      ]}>
        <TouchableOpacity style={styles.fab}>
          <Icon name="list" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.fab, styles.fabLocation]}
          onPress={() => {
            setCamera(Cameras.HongDae);
          }}
        >
          <Icon name="locate" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
    marginLeft: 8,
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    position: 'absolute',
    bottom: 48,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studioCard: {
    padding: 16,
  },
  studioInfo: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  studioName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  imageScroll: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  studioImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  locationButtons: {
    position: 'absolute',
    top: 180,
    left: 16,
    flexDirection: 'row',
    gap: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  locationButtonText: {
    fontSize: 14,
    color: '#000',
    marginRight: 4,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    gap: 8,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabLocation: {
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 2,
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF568F',
  },
  hours: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default NearbyScreen;

