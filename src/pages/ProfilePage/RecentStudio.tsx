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
} from "react-native";
import UserGuide from "../../assets/UserGuide";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getUserInfo } from "../../api/shops/shopApi";
import LeftHeader from "../../components/LeftHeader";

// const formatPrice = (price: number) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

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
      <Text style={styles.studioName}>{item.title}</Text>
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
});

export default RecentStudio;
