import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const tabs = ['소개', '촬영상품', '사진가', '리뷰'];

export default function StudioPage({ navigation }) {
  const [activeTab, setActiveTab] = useState('소개');

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
        <Text style={styles.headerTitle}>찰칵 스튜디오 연희점</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: '/placeholder.svg' }}
            style={styles.mainImage}
          />
        </View>

        {/* Studio Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.studioName}>찰칵 스튜디오 연희점</Text>
          <Text style={styles.description}>
            스튜디오 소개 최대 한줄 30글자가 길어지면 말줄임...
          </Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFB800" />
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1시친관 정보</Text>
            <Text style={styles.sectionContent}>
              텍스트 텍스트 텍스트 텍스트 텍스트 텍스트{'\n'}
              47가격안내{'\n'}
              5환불정책{'\n'}
              등등 줄글{'\n'}
              추가 항목은 각 스튜디오 재량
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-social-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton}>
          <Icon name="heart-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: width,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  infoContainer: {
    padding: 16,
  },
  studioName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  actionButtons: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  likeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

