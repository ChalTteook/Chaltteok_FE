import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Text, ScrollView } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // Text 기본 폰트 설정
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.style = { fontFamily: 'PretendardJP-Regular' };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerContainer, { transform: [{ translateY: headerTranslateY }] }]}>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.navigatorContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    flexGrow: 1,
    // paddingTop: 60,
  },
});

export default App;