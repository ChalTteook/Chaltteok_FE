import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

interface SimpleHeaderProps {
  title?: string;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({ title = "로그인 및 회원가입" }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202123',
  },
});

export default SimpleHeader;
