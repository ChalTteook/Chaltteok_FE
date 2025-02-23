import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';


const LeftHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.leftIconContainer}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back" size={22} color="#00000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 15,
    marginTop: 20,
  },
  leftIconContainer: {
    marginLeft: 20,
    position: "relative"
  },
  leftIcon: {
    width: 24,
    height: 24,
  },
});

export default LeftHeader;