import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import UserGuide from "../../assets/UserGuide";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getAllShops } from "../../api/shops/shopApi";

// const formatPrice = (price: number) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const Photographer = () => {
  const [photographers, setPhotographers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await getAllShops();
        setPhotographers(response.data);
      } catch (error) {
        console.error('사진관 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchPhotographers();
  }, []);

  // id 기반 결정적 랜덤 생성 함수들
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % 10000;
    }
    return hash;
  }
  function seededRandom(id, salt = 0) {
    const hash = hashString(id + salt);
    return (hash % 10000) / 10000;
  }
  function getStudioDiscount(id) {
    return Math.floor(seededRandom(id, 1) * 41) + 10; // 10~50%
  }
  function getStudioRating(id) {
    const r = seededRandom(id, 2) ** 8;
    const rating = 4.3 + r * 0.65;
    return rating.toFixed(2);
  }
  function getStudioReviews(id) {
    return Math.floor(seededRandom(id, 3) ** 2 * 100);
  }
  function getStudioPrice(id) {
    const discount = getStudioDiscount(id);
    const basePrice = 35000;
    return Math.floor(basePrice * (1 - discount / 100));
  }

  const randomPhotographerData = useMemo(() => {
    return photographers.map(photographer => {
      const discount = Math.floor(Math.random() * 41) + 10;
      const basePrice = 35000;
      const price = Math.floor(basePrice * (1 - discount / 100));
      const r = Math.random() ** 8;
      const rating = (4.3 + r * 0.65).toFixed(2);
      const reviews = Math.floor(Math.random() ** 2 * 100);
      return { id: photographer.id, discount, price, rating, reviews };
    });
  }, [photographers]);

  return (
    <View style={styles.recentSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.recentTitle}>최근 본 사진가 & 스튜디오</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllRecent")}
          style={{ marginLeft: "auto" }}
        >
          <Text style={styles.allRecentStudios}>전체보기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {photographers.map((photographer, idx) => {
          const { discount, price, rating, reviews } = randomPhotographerData[idx];
          return (
            <TouchableOpacity
              key={photographer.id}
              style={styles.card}
              onPress={() => navigation.navigate("StudioPage", { id: photographer.id })}
            >
              <Image
                source={{ uri: photographer.img }}
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <Text style={styles.photographerName}>{photographer.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.discount}>{discount}%</Text>
                  <Text style={styles.price}>
                    {price}원
                  </Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#202123" />
                  <Text style={styles.rating}>{rating}</Text>
                  <Text style={styles.reviews}>({reviews})</Text>
                </View>
              </View>
              <View style={styles.instagramContainer}>
                <Icon name="logo-instagram" size={16} color="#000000" />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* 앱 사용 가이드 */}
      <View style={styles.imageContainer}>
        <UserGuide />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allRecentStudios: {
    fontSize: 12,
    color: "#666",
    marginLeft: "auto",
    marginTop: 4,
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  image: {
    width: 140,
    height: 140,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  cardContent: {
    marginTop: 16,
  },
  photographerName: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: -7,
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  discount: {
    color: "#FF4081",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
  },
  instagramContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 4,
  },
  instagram: {
    fontSize: 14,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -4,
  },
  rating: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginLeft: 2,
  },
  recentSection: {
    paddingTop: 24,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 18,
    lineHeight: 24,
    color: "#202123",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 16,
  },
  // description: {
  // },
  // address: {
  // },
  // phoneNumber: {
  // },
});

export default Photographer;
