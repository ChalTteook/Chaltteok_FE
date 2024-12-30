import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.headerText}>알림</Text>
      </View>
      {/* 빈 공간 추가 */}
      <View style={styles.space} />


      <ScrollView style={styles.content}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginTop: 12,
  },
  notificationType: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    marginVertical: 12,
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
    height: 8,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 16,
  },
});
