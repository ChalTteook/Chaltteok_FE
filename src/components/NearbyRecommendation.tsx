import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const photographers = [
  {
    id: "1",
    name: "사진가 이름1",
    discount: 28,
    price: 33910,
    instagram: "chaldduck",
    rating: 4.6,
    reviews: 74,
  },
  {
    id: "2",
    name: "사진가 이름2",
    discount: 28,
    price: 33910,
    instagram: "chaldduck",
    rating: 4.6,
    reviews: 74,
  },
  {
    id: "3",
    name: "사진가 이름3",
    discount: 28,
    price: 33910,
    instagram: "chaldduck",
    rating: 4.6,
    reviews: 74,
  },
];

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Photographer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.recentSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.recentTitle}>지금 가까운 곳으로 추천해드려요!</Text>
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
        {photographers.map((photographer) => (
          <TouchableOpacity key={photographer.id} style={styles.card}>
            <Image
              source={require("../assets/photographer.png")}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.photographerName}>{photographer.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.discount}>{photographer.discount}%</Text>
                <Text style={styles.price}>
                  {formatPrice(photographer.price)}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#202123" />
                <Text style={styles.rating}>{photographer.rating}</Text>
                <Text style={styles.reviews}>({photographer.reviews})</Text>
              </View>
            </View>
            <View style={styles.instagramContainer}>
              <Icon name="logo-instagram" size={16} color="#000000" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingBottom: 12,
  },
});

export default Photographer;
