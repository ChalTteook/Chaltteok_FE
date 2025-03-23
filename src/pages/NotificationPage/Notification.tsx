import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LeftHeader from "../../components/LeftHeader";

const notifications = [
  {
    id: 1,
    title: "찰떡 서비스 업데이트 안내",
    date: "2024.00.00",
    isRead: false,
  },
  {
    id: 2,
    title: "찰떡 서비스 업데이트 안내",
    date: "2024.00.00",
    isRead: false,
  },
  {
    id: 3,
    title: "찰떡 서비스 업데이트 안내",
    date: "2024.00.00",
    isRead: true,
  },
  {
    id: 4,
    title: "찰떡 서비스 업데이트 안내",
    date: "2024.00.00",
    isRead: true,
  },
];

export default function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LeftHeader />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>알림</Text>
      </View>
      
      {/* 구분선 */}
      <View style={styles.space} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationItem}
          >
            <View style={styles.ovalBackground}>
              <Text style={styles.notificationType}>알림</Text>
            </View>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 8,  // 상단 여백 줄임
    paddingBottom: 8, // 하단 여백 줄임
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: 8,  // 상단 마진 줄임
  },
  notificationType: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    marginVertical: 8,  // 마진 줄임
  },
  notificationDate: {
    fontSize: 12,
    color: "#999999",
  },
  ovalBackground: {
    backgroundColor: "#F5F5F5",
    borderRadius: 99,
    paddingVertical: 1,
    paddingHorizontal: 10,
    alignSelf: 'flex-start', 
  },
  space: {
    height: 1,  // 높이 줄임
    backgroundColor: '#F5F5F5',
    marginBottom: 8,  // 약간의 여백 추가
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
    marginTop: 12,  // 상단 여백 줄임
    marginBottom: 8,  // 하단 여백 줄임
  },
});