import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import BottomNavigation from './components/BottomNavigation';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navigatorContainer}>
        <AppNavigator />
      </View>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    flex: 1,
    marginBottom: 56, // BottomNavigation 높이만큼 여백 추가
  },
});

export default App;