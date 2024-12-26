import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Banner from '../components/Banner';
import Category from '../components/Category';
import Photographer from '../components/Photographer';
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Banner />
      <Category />
      <Photographer />
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