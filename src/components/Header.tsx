import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import SearchIcon from "react-native-vector-icons/Fontisto";
import NotificationIcon from "../assets/NotificationIcon";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [hasUnreadNotifications] = React.useState(true);

  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/main_logo.png")} style={styles.logo} />
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.searchContainer}>
          <SearchIcon name="search" size={23} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => navigation.navigate("Notification")}
        >
          <NotificationIcon size={21} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  logo: {
    width: 130,
    height: 60,
    resizeMode: "contain",
    marginLeft: 8,
    marginTop: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  searchContainer: {
    position: "relative",
  },
  notificationContainer: {
    position: "relative",
    marginLeft: 8,
    marginRight: 30,
  },
  notificationDot: {
    position: "absolute",
    top: -2,
    right: -3,
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#FF4081",
  },
});

export default Header;
