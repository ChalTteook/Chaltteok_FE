import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Dimensions, TextInput } from 'react-native';
import Header from '../components/LeftHeader';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../api/LoginAuth';
import { useRecoilState } from 'recoil';
import { authState } from '../state/authState';

const { width, height } = Dimensions.get('window'); 
const scaleWidth = width / 375; 
const scaleHeight = height / 812; 

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [auth, setAuth] = useRecoilState(authState);

    const handleLogin = async () => {
      try {
        console.log('로그인 시도:', email, password);
        const response = await loginUser(email, password);
        console.log("로그인 성공: ", response.data);
        // const verified = response.data.verified;
        const userEmail = response.data.user.email;
        console.log("email:", userEmail);

        setAuth({
          userEmail: userEmail,
          isLoggedIn: true,
        });
        Alert.alert('로그인 성공');
        navigation.navigate('Main');
        
      //   if (verified === 'Y') {

      //     setAuth({
      //       userEmail: userEmail,
      //       isLoggedIn: true,
      //     });

      //     Alert.alert('로그인 성공');
      //     navigation.navigate('WelcomeJoin');
      //   } 
      //   if (userEmail == email) {
      //     Alert.alert('로그인 실패', '아이디나 비밀번호가 틀렸습니다.');
      //   } 
      //   else {
      //     Alert.alert('로그인 실패', '아이디가 존재하지 않습니다');
      //     navigation.navigate('Join');
      //   }
      } catch (error) {
        Alert.alert('오류', '로그인 중 문제가 발생했습니다.');

      }
    };

    const handleJoinNavigation = () => {
      navigation.navigate('Join');
  };
  
    return (
      <View style={styles.screenContainer}>
      <Header style={styles.headerContainer} />
      <View style={styles.container}>
        
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
          <TouchableOpacity onPress={handleJoinNavigation}>
            <Text style={styles.footerText}>이메일 회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>|</Text>
          <TouchableOpacity>
            <Text style={styles.footerText}>이메일 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>|</Text>
          <TouchableOpacity>
            <Text style={styles.footerText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16 * scaleWidth,
        marginTop: 85 * scaleHeight,
      },
    inputId: {
      marginTop: 114 * scaleHeight,
      width: 343,
      height: 48,
      alignSelf: 'center',
      borderColor: '#D5D5D5',
      borderWidth: 1,
      borderRadius: 10,
    },
    inputPass: {
        width: 343,
        height: 48,
        marginTop: 16 * scaleHeight,
        alignSelf: 'center',
        borderColor: '#D5D5D5',
        borderWidth: 1,
        borderRadius: 10,
      },
    loginButton: {
      marginTop: 40 * scaleHeight,
      width: 343,
      height: 48,
      backgroundColor: '#F71D6A',
      alignItems: 'center',
      borderRadius: 10,
      alignSelf: 'center',
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
      marginTop: 32 * scaleHeight,
      flexDirection: 'row',
      alignSelf: 'center',
      gap: 8,
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