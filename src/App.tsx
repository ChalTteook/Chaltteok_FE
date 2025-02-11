<<<<<<< HEAD
import { useEffect } from 'react';
import { Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './navigation/LoginNavigator';
import AppNavigator from './navigation/AppNavigator';
import RootNavigator from './navigation/RootNavigator';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    (Text as any).defaultProps = {
      ...(Text as any).defaultProps,
      style: { fontFamily: 'PretendardJP-Regular' },
    };
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={RootNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}
=======
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
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1
