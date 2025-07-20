import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReviewImageGallery = ({ images }: { images: string[] }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
    {(images.length > 0 ? images : [null, null, null, null]).map((img, idx) =>
      img ? (
        <Image key={idx} source={{ uri: img }} style={styles.image} />
      ) : (
        <View key={idx} style={styles.placeholderBox}>
          <Icon name="image-outline" size={28} color="#ccc" />
        </View>
      )
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  imageScroll: { flexDirection: 'row', marginBottom: 8 },
  placeholderBox: {
    width: 64,
    height: 64,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default ReviewImageGallery; 