import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import UserGuide from "../../assets/UserGuide";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getUserInfo } from "../../api/shops/shopApi";
import LeftHeader from "../../components/LeftHeader";

// 화면 너비 가져오기
const { width } = Dimensions.get('window');

const RecentStudio = () => {
  const [recentViews, setRecentViews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecentStudios = async () => {
      try {
        const response = await getUserInfo();
        setRecentViews(response.data);
      } catch (error) {
        console.error('사진관 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchRecentStudios();
  }, []);

  const renderStudioItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.studioItem}
      onPress={() => navigation.navigate("StudioPage", { id: item.id })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.img }} style={styles.studioImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.studioName}>{item.title}</Text>
        <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.rating}>4.6</Text>
            <Text style={styles.reviews}>(74)</Text>
        </View>
        <Text style={styles.location}>xx역 x번 출구 도보 x분</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>45,000원 / 3장</Text>
          <Text style={styles.hours}>09:00~20:00</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <LeftHeader />
      <View style={styles.content}>
        <Text style={styles.title}>최근 본 내역</Text>
        <FlatList
          data={recentViews}
          renderItem={renderStudioItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "PretendardJP-Bold",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  studioItem: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1, // 중요: info 컨테이너가 남은 공간을 모두 차지하도록 함
  },
  studioImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  studioName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#202123",
  },
  starIcon: {
    color: "#FFFFF",
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#202123",
  },
  reviews: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between", // 이 설정으로 가격과 영업시간이 양 끝으로 정렬됨
    alignItems: "center",
    marginTop: 8,
    width: '100%', // 전체 너비 사용
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF568F",
  },
  hours: {
    fontSize: 14,
    color: "#666666",
    textAlign: 'right', // 텍스트 오른쪽 정렬
  },
});

export default RecentStudio;