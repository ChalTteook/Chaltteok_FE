import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: 1, title: '증명사진/\n프로필', image: require('../../assets/categotyImage/profile.png')},
  { id: 2, title: '커플/우정', image: require('../../assets/categotyImage/Users.png') },
  { id: 3, title: '가족사진', image: require('../../assets/categotyImage/Users_Group.png') },
  { id: 4, title: '제품/\n공간사진', image: require('../../assets/categotyImage/Group.png') },
  { id: 5, title: '영상', image: require('../../assets/categotyImage/Vector.png') },
];

const Category = () => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => {
            // 중첩된 네비게이터에서 상위 네비게이터의 스크린으로 이동
            navigation.navigate('AllRecent' as never, {
              categoryTitle: category.title,
              categoryId: category.id
            } as never);
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={category.image}
              style={
                category.id === 4 || category.id === 5
                  ? [styles.categoryImage, { width: 18, height: 18 }]
                  : styles.categoryImage
              }
            />
          </View>          
          <Text style={styles.categoryText}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 77,
  },
  imageContainer: {
    width: 54,
    height: 54,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 11,
    color: '#000',
    textAlign: 'center',
    lineHeight: 15,
  },
});

export default Category;