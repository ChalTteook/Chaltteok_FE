import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const categories = [
  { id: 1, title: '중명사진/\n프로필', image: require('../assets/categotyImage/profile.png')},
  { id: 2, title: '커플/우정' },
  { id: 3, title: '가족사진' },
  { id: 4, title: '제품/\n공간사진' },
  { id: 5, title: '영상' },
];

const Category = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryText}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 77,
  },
  categoryImage: {
    width: 54,
    height: 54,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
    lineHeight: 15,
  },
});

export default Category;