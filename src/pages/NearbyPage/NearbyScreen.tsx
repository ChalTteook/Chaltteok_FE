import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  NaverMapView,
  Camera,
  NaverMapMarkerOverlay,
} from "@mj-studio/react-native-naver-map";
import MarkerIcon from "../../assets/markerIcons/MarkerIcon";

const Cameras = {
  HongDae: {
    latitude: 37.556854408446654,
    longitude: 126.92359523466598,
    zoom: 16,
  },
  Gangnam: {
    latitude: 37.498040483,
    longitude: 127.02758183,
    zoom: 16,
  },
} satisfies Record<string, Camera>;

const NearbyScreen = ({ navigation }) => {
  const [camera, setCamera] = useState<Camera>(Cameras.HongDae);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);

  const showCard = () => {
    setIsCardVisible(true);
    setIsSearchBarVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.mapContainer}>
        <NaverMapView 
          style={styles.map} 
          camera={camera} 
          onMapClick={() => {
            setIsCardVisible(false);
            setIsSearchBarVisible(false);
          }}
        >
          <NaverMapMarkerOverlay
            latitude={37.556854408446654}
            longitude={126.92359523466598}
            onTap={() => {
              console.log(1);
              showCard();
            }}
            anchor={{ x: 0.5, y: 1 }}
            width={55}
            height={55}
            image={require('../../assets/markerIcons/markerIcon.png')}
          />
        </NaverMapView>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
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
      {isCardVisible && (
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.studioCard}
            onPress={() => navigation.navigate('StudioPage')}
          >
            <View style={styles.studioInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.studioName}>찰칵 스튜디오</Text>
                <TouchableOpacity style={styles.heartButton}>
                  <Icon name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.description} numberOfLines={1}>
                스튜디오 소개 최대 한줄 30글자가 길어지면 말줄임...
              </Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#000" />
                <Text style={styles.rating}>4.5</Text>
                <Text style={styles.location}>서울 강남구</Text>
              </View>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.imageScroll}
            >
              {[1, 2, 3].map((_, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image
                    source={{ uri: '/placeholder.svg?height=120&width=120' }}
                    style={styles.studioImage}
                  />
                </View>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </View>
      )}

      {/* Location Buttons */}
      <View style={styles.locationButtons}>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={() => setCamera(Cameras.HongDae)}
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
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Icon name="list" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fab, styles.fabLocation]}>
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
    top: 56, 
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
    top: 112,
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
    bottom: (props) => (props.isCardVisible ? 270 : 16),
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
});

export default NearbyScreen;

