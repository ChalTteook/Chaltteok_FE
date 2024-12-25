import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    name: '사진가 이름3',
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

const AllRecentScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>최근 본 사진가 & 스튜디오</Text>
      {photographers.map((photographer) => (
        <TouchableOpacity key={photographer.id} style={styles.card}>
          <Image source={{ uri: '/placeholder.svg' }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.photographerName}>{photographer.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.discount}>{photographer.discount}%</Text>
              <Text style={styles.price}>{formatPrice(photographer.price)}</Text>
            </View>
            <View style={styles.instagramContainer}>
              <Icon name="logo-instagram" size={16} color="#666" />
              <Text style={styles.instagram}>@{photographer.instagram}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
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
});

export default AllRecentScreen;