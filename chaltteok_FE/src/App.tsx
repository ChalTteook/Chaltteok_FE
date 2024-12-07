/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import SearchIcon from 'react-native-vector-icons/Fontisto';
import HomeIcon from 'react-native-vector-icons/Octicons';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import MapIcon from 'react-native-vector-icons/Feather';
import FavoriteIcon from 'react-native-vector-icons/MaterialIcons';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, title: '중명사진/\n프로필' },
  { id: 2, title: '커플/우정' },
  { id: 3, title: '가족사진' },
  { id: 4, title: '제품/\n공간사진' },
  { id: 5, title: '영상' },
];

const banners = [
  {
    id: 1,
    image: './assets/image.png',
    title: '배너 타이틀 1',
    subtitle: '메인 배너 서브타이틀\n최대 00자, 두줄',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/800x600',
    title: '배너 타이틀 2',
    subtitle: '메인 배너 서브타이틀\n최대 00자, 두줄',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/800x600',
    title: '배너 타이틀 3',
    subtitle: '메인 배너 서브타이틀\n최대 00자, 두줄',
  },
];

const photographers = [
  {
    id: '1',
    name: '사진가 이름1',
    discount: 28,
    price: 33910,
    instagram: 'chaldduck',
    rating: 4.6,
    reviews: 74,
  },
  {
    id: '2',
    name: '사진가 이름2',
    discount: 28,
    price: 33910,
    instagram: 'chaldduck',
    rating: 4.6,
    reviews: 74,
  },
  {
    id: '3',
    name: '사진가 이름',
    discount: 28,
    price: 33910,
    instagram: 'chaldduck',
    rating: 4.6,
    reviews: 74,
  },
];

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function App(): React.JSX.Element {
  const [currentBanner, setCurrentBanner] = React.useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentBanner(pageNum);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.searchContainer}>
            <SearchIcon name="search" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationContainer}>
            <NotificationIcon name="notifications-outline" size={24} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Hero Banner */}
        <View style={styles.bannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={200}
          >
            {banners.map((banner, index) => (
              <View key={banner.id} style={styles.bannerItem}>
                <Image
                  source={{ uri: banner.image }}
                  style={styles.bannerImage}
                />
                <View style={styles.bannerOverlay}>
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{banner.title}</Text>
                    <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.bannerArrow}>
                  <Icon name="chevron-forward" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.bannerNumberContainer}>
                  <Text style={styles.bannerNumber}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    <Text style={styles.opacityText}> | </Text>
                    {banners.length < 10
                      ? `0${banners.length}`
                      : banners.length}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <Image
                source={require('./assets/image.png')}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Blank Space */}
        <View style={styles.space} />
        {/* Recent Photographer */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.recentTitle}>최근 본 사진가 & 스튜디오</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllRecent')}
              style={{ marginLeft: 'auto' }}
            >
              <Text style={styles.allRecentStudios}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {photographers.map((photographer) => (
              <TouchableOpacity key={photographer.id} style={styles.card}>
                <Image
                  source={{ uri: '/placeholder.svg' }}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.photographerName}>
                    {photographer.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.discount}>
                      {photographer.discount}%
                    </Text>
                    <Text style={styles.price}>
                      {formatPrice(photographer.price)}
                    </Text>
                  </View>
                  <View style={styles.instagramContainer}>
                    <Icon name="logo-instagram" size={16} color="#666" />
                    <Text style={styles.instagram}>
                      @{photographer.instagram}
                    </Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFB800" />
                    <Text style={styles.rating}>{photographer.rating}</Text>
                    <Text style={styles.reviews}>({photographer.reviews})</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <Image
          source={require('./assets/banner.png')}
          style={styles.guideBannerImage}
        />
        {/* Video Photographer */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.recentTitle}>영상 찰떡으로 찍어드립니다!</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllVideo')}
              style={{ marginLeft: 'auto' }}
            >
              <Text style={styles.allRecentStudios}>전체보기</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {photographers.map((photographer) => (
              <TouchableOpacity key={photographer.id} style={styles.card}>
                <Image
                  source={{ uri: '/placeholder.svg' }}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.photographerName}>
                    {photographer.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.discount}>
                      {photographer.discount}%
                    </Text>
                    <Text style={styles.price}>
                      {formatPrice(photographer.price)}
                    </Text>
                  </View>
                  <View style={styles.instagramContainer}>
                    <Icon name="logo-instagram" size={16} color="#666" />
                    <Text style={styles.instagram}>
                      @{photographer.instagram}
                    </Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFB800" />
                    <Text style={styles.rating}>{photographer.rating}</Text>
                    <Text style={styles.reviews}>({photographer.reviews})</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <HomeIcon name="home" size={30} />
          <Text style={[styles.navText, styles.navTextActive]}>찰떡홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MapIcon name="map" size={30} />
          <Text style={styles.navText}>주변</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FavoriteIcon name="favorite-outline" size={32} />
          <Text style={styles.navText}>찜</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <UserIcon name="user-o" size={30} />
          <Text style={styles.navText}>내정보</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 43,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    marginLeft: 16,
    marginRight: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#D3D3D3',
  },
  notificationContainer: {
    position: 'relative',
    marginLeft: 8,
    marginRight: 16,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  bannerContent: {
    marginBottom: 20,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  bannerPagination: {
    position: 'absolute',
    bottom: 20,
    right: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bannerNumberContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#000000',
    borderRadius: 24,
    padding: 8,
    width: '15%',
    height: '7%',
  },
  bannerNumber: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 13,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  paginationText: {
    color: '#fff',
    fontSize: 14,
  },
  bannerArrow: {
    position: 'absolute',
    top: '50%',
    left: '90%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#FF4081',
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 8,
    width: 80,
  },
  categoryImage: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
  },
  bannerContainer: {
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  bannerItem: {
    width: width,
    height: width,
  },
  pagination: {
    position: 'absolute',
    right: 32,
    bottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recentSection: {
    paddingTop: 24,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    marginLeft: 18,
    lineHeight: 24,
    color: '#000',
  },
  recentGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  recentItem: {
    flex: 1,
    aspectRatio: 1,
  },
  recentImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  navTextActive: {
    color: '#F71D6A',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    color: '#FF4081',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 125,
    height: 125,
    backgroundColor: '#F5F5F5',
  },
  cardContent: {
    padding: 16,
  },
  photographerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discount: {
    color: '#FF4081',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  instagramContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instagram: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 2,
  },
  space: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  opacityText: {
    color: '#aaa',
    opacity: 0.5,
  },
  guideBannerImage: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  allRecentStudios: {
    fontSize: 14,
    color: '#666',
    marginLeft: 'auto',
    marginTop: 4,
    marginRight: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
});

export default App;
