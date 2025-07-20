import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getAllShops } from "../../api/shops/shopApi";
import LeftHeader from "../../components/LeftHeader";
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const FavoritesScreen = () => {
  const [favoriteViews, setFavoriteViews] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // TODO: getAllShops()를 실제 즐겨찾기 API로 교체
        const response = await getAllShops();
        // Fisher-Yates 셔플 알고리즘으로 랜덤 재배치
        const shuffledData = [...response.data];
        for (let i = shuffledData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
        }
        setFavoriteViews(shuffledData);
      } catch (error) {
        console.error('찜 정보를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchFavorites();
  }, []);

  const randomStudioData = useMemo(() => {
    return favoriteViews.map((studio: any) => {
      const discount = Math.floor(Math.random() * 41) + 10;
      const basePrice = 35000;
      const price = Math.floor(basePrice * (1 - discount / 100));
      const r = Math.random() ** 8;
      const rating = (4.3 + r * 0.65).toFixed(2);
      const reviews = Math.floor(Math.random() ** 2 * 100);
      return { id: studio.id, discount, price, rating, reviews };
    });
  }, [favoriteViews]);

  const renderStudioItem = ({ item, index }: { item: any, index: number }) => {
    const { discount, price, rating, reviews } = randomStudioData[index] || {};
    return (
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
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviews}>({reviews})</Text>
          </View>
          <Text style={styles.location}>{item.address}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.price}>{price}원</Text>
            <Text style={styles.hours}>09:00~20:00</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaViewRN style={styles.container} edges={["top"]}>
      <LeftHeader title="찜한 스튜디오" />
      <View style={styles.content}>
        <FlatList
          data={favoriteViews}
          renderItem={renderStudioItem}
          keyExtractor={(item, idx) => item?.id ? item.id.toString() : String(idx)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaViewRN>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
    flex: 1,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    width: '100%',
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF568F",
  },
  hours: {
    fontSize: 14,
    color: "#666666",
    textAlign: 'right',
  },
});

export default FavoritesScreen;

