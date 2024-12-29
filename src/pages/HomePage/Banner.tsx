import React, { useRef } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: 1,
    title: "배너 타이틀 1",
    subtitle: "메인 배너 서브타이틀\n최대 00자, 두줄",
  },
  {
    id: 2,
    title: "배너 타이틀 2",
    subtitle: "메인 배너 서브타이틀\n최대 00자, 두줄",
  },
  {
    id: 3,
    title: "배너 타이틀 3",
    subtitle: "메인 배너 서브타이틀\n최대 00자, 두줄",
  },
];

const Banner = () => {
  const swiperRef = useRef(null);

  const goNext = () => {
    swiperRef.current?.scrollBy(1);
  };

  const goPrev = () => {
    swiperRef.current?.scrollBy(-1);
  };

  return (
    <View style={styles.bannerContainer}>
      <Swiper
        ref={swiperRef}
        autoplay
        width={width}
        height={width}
        autoplayTimeout={5}
        showsPagination={false}
        loop={true}
      >
        {banners.map((banner, index) => (
          <View key={banner.id} style={styles.bannerItem}>
            <Image
              source={require("../../assets/banner_image.png")}
              style={styles.bannerImage}
            />
            <View style={styles.bannerOverlay}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>{banner.title}</Text>
                <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
              </View>
            </View>
            <View style={styles.bannerNumberContainer}>
              <Text style={styles.bannerNumber}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                <Text style={{ opacity: 0.5 }}> | </Text>
                {banners.length < 10 ? `0${banners.length}` : banners.length}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        style={[styles.arrowButton, styles.leftButton]}
        onPress={goPrev}
      >
        <Icon name="chevron-back" size={21} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.arrowButton, styles.rightButton]}
        onPress={goNext}
      >
        <Icon name="chevron-forward" size={21} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: "relative",
    marginBottom: 20,
  },
  bannerItem: {
    width: width,
    height: width,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    padding: 20,
  },
  bannerContent: {
    marginBottom: 20,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  bannerArrow: {
    position: "absolute",
    top: "50%",
    left: "90%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerNumberContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#000000",
    borderRadius: 24,
    padding: 8,
    width: "15%",
    height: "7%",
  },
  bannerNumber: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 13,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  arrowButton: {
    position: "absolute",
    top: "38%",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 30,
    padding: 7,
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
});

export default Banner;

