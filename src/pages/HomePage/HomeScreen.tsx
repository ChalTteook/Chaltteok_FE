import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Banner from './Banner';
import Category from './Category';
import Photographer from './Photographer';
import NearbyRecommendation from './NearbyRecommendation';
import VideoRecommendation from './VideoRecommendation';
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Banner />
      <Category />
      <View style={styles.space} />
      <Photographer />
      <NearbyRecommendation />
      <VideoRecommendation />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  space: {
    height: 8,
    backgroundColor: '#F5F5F5',
  },
});

export default HomeScreen;