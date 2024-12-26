import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import Header from './components/Header';

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
        <Header />
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.navigatorContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // useNativeDriver는 false로 설정
        )}
        scrollEventThrottle={16}
      >
        <AppNavigator />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    height: 60,
  },
  navigatorContainer: {
    flexGrow: 1,
    paddingTop: 60, // Header 높이만큼 여백 추가
  },
});

export default App;