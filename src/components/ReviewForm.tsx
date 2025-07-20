import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ReviewFormProps {
  onSubmit: (data: any) => void;
  initial?: {
    rating?: number;
    nickname?: string;
    product?: string;
    photographer?: string;
    content?: string;
    images?: string[];
  };
  isLoading?: boolean;
}

const ReviewForm = ({ onSubmit, initial = {}, isLoading = false }: ReviewFormProps) => {
  const [rating, setRating] = useState(initial.rating || 0);
  const [nickname, setNickname] = useState(initial.nickname || '');
  const [product, setProduct] = useState(initial.product || '');
  const [photographer, setPhotographer] = useState(initial.photographer || '');
  const [content, setContent] = useState(initial.content || '');
  const [images, setImages] = useState<string[]>(initial.images || []);

  // 이미지 추가(실제 구현 시 이미지 선택기 연결)
  const addImage = () => {
    if (images.length < 4) setImages([...images, '']); // 빈 값 placeholder
  };
  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (!rating || !nickname || !product || !photographer || !content) return;
    onSubmit({ rating, nickname, product, photographer, content, images });
  };

  return (
    <ScrollView contentContainerStyle={styles.card}>
      {/* 별점, 닉네임, 신고 */}
      <View style={styles.topRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {[1,2,3,4,5].map(i => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Icon name={i <= rating ? 'star' : 'star-outline'} size={20} color={i <= rating ? '#FFD700' : '#D3D3D3'} style={{ marginRight: 2 }} />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.nicknameInput}
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
          maxLength={10}
        />
      </View>

      {/* 상품명, 사진가명 */}
      <TextInput
        style={styles.input}
        placeholder="상품명"
        value={product}
        onChangeText={setProduct}
        maxLength={20}
      />
      <TextInput
        style={styles.input}
        placeholder="사진가명"
        value={photographer}
        onChangeText={setPhotographer}
        maxLength={20}
      />

      {/* 내용 */}
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="리뷰 내용을 입력하세요."
        value={content}
        onChangeText={setContent}
        multiline
        maxLength={300}
      />

      {/* 이미지 첨부 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
        {[...images, ...Array(4 - images.length).fill(null)].map((img, idx) =>
          img ? (
            <View key={idx} style={styles.imageBox}>
              <Image source={{ uri: img }} style={styles.image} />
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(idx)}>
                <Icon name="close-circle" size={18} color="#e91e63" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity key={idx} style={styles.placeholderBox} onPress={addImage}>
              <Icon name="camera-outline" size={28} color="#ccc" />
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.submitText}>{isLoading ? '등록 중...' : '리뷰 등록'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  nicknameInput: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    paddingVertical: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    fontSize: 14,
    marginBottom: 12,
    paddingVertical: 6,
  },
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
  imageBox: {
    position: 'relative',
    width: 64,
    height: 64,
    marginRight: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  removeBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: '#e91e63',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ReviewForm; 