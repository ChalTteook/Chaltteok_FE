import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReviewImageGallery from './ReviewImageGallery';

interface ReviewProps {
  review: {
    rating: number;
    nickname: string;
    date: string;
    product: string;
    photographer: string;
    content: string;
    likes: number;
    images: string[];
  };
}

const ReviewCard = ({ review }: ReviewProps) => (
  <View style={styles.card}>
    <View style={styles.topRow}>
      <Text style={styles.rating}>⭐ {review.rating}</Text>
      <Text style={styles.meta}>{review.nickname}</Text>
      <TouchableOpacity style={styles.reportBtn}>
        <Icon name="alert-circle-outline" size={16} color="#bbb" />
      </TouchableOpacity>
    </View>
    <Text style={styles.product}>{review.product}</Text>
    <Text style={styles.photographer}>{review.photographer}</Text>
    <Text style={styles.content} numberOfLines={3}>{review.content}</Text>
    <ReviewImageGallery images={review.images} />
    <TouchableOpacity style={styles.likeButton}>
      <Icon name="heart-outline" size={16} color="#e91e63" />
      <Text style={styles.likeText}>  {review.likes} 좋아요</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  rating: { fontSize: 14, fontWeight: '600', color: '#000', marginRight: 8 },
  meta: { fontSize: 12, color: '#999', flex: 1 },
  reportBtn: { padding: 4 },
  product: { fontSize: 15, fontWeight: '600', marginTop: 6, color: '#222' },
  photographer: { fontSize: 13, color: '#444', marginBottom: 10 },
  content: { fontSize: 14, lineHeight: 20, marginBottom: 12, color: '#333' },
  likeButton: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  likeText: { fontSize: 13, color: '#e91e63' },
});

export default ReviewCard; 