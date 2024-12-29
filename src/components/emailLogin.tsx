import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Text, Image, Dimensions, PixelRatio, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const { width, height } = Dimensions.get('window'); 
const scaleWidth = width / 375; 
const scaleHeight = height / 812; 

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // 로그인 처리 로직
      console.log('로그인 시도:', email, password);
    };
  
    return (
      <View style={styles.container}>
        <Image source={require('../assets/left.png')} style={styles.leftIcon} />
        
        <TextInput
          style={[styles.inputId, { paddingLeft: 16 }]}
          placeholder="이메일 주소 또는 휴대폰 번호 또는 닉네임"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor='#D5D5D5'
        />
        <TextInput
          style={[styles.inputPass, { paddingLeft: 16 }]}
          placeholder="비밀번호 입력" 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor='#D5D5D5'
        />
  
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
  
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>이메일 회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}> | </Text>
          <TouchableOpacity>
            <Text style={styles.footerText}>이메일 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}> | </Text>
          <TouchableOpacity>
            <Text style={styles.footerText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    leftIcon: {
        width: 24,
        height: 24,
        position: 'absolute',
        left: 16 * scaleWidth,
        top: 4 * scaleHeight,
        zIndex: 1,
      },
    inputId: {
      width: 343,
      height: 48,
      position: 'absolute',
      alignSelf: 'center',
      top: 155 * scaleHeight,
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
    },
    inputPass: {
        width: 343,
        height: 48,
        position: 'absolute',
        alignSelf: 'center',
        top: 219 * scaleHeight,
        borderColor: '#D5D5D5',
        borderWidth: 1,
        borderRadius: 10,
      },
    loginButton: {
      width: 343,
      height: 48,
      backgroundColor: '#F71D6A',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute',
      alignSelf: 'center',
      top: 307 * scaleHeight,
      justifyContent: 'center',
    },
    loginButtonText: {
      fontFamily: 'PretendardJP-Regular',
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 19.2,
      textAlign: 'center',
    },
    footer: {
      position: 'absolute',
      left: 68 * scaleWidth,
      top: 387 * scaleHeight,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footerText: {
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 16,
      textAlign: 'center',
    },
  });