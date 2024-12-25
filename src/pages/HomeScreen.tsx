import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Category from '../components/Category';
import AllRecentScreen from '../components/AllRecentScreen';
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Banner />
      <Category />
      <AllRecentScreen />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;