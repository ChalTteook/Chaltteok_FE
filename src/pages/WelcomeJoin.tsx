import { View, StyleSheet, Text, Dimensions} from 'react-native';
import Header from '../components/LeftHeader';
import BottomButton from '../components/BottomButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); 
const scaleWidth = width / 375; 
const scaleHeight = height / 812; 

type RootStackParamList = {
  WelcomeJoin: { username: string; nickname: string; phone: string; };
};

export default function WelcomeScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'WelcomeJoin'>>();
  const { username, nickname, phone } = route.params;
  const navigation = useNavigation();
  const handleStart = () => {
    navigation.navigate(''); // 수정 필요
  };

    return (

      <View style={styles.screenContainer}>
      <Header style={styles.headerContainer} />
      <View style={styles.container}>

        <Text style={styles.headerText}>{username}님의{'\n'}찰떡스러운 세계가 시작됩니다.</Text>
        <Text style={styles.subHeader}>휴대폰 번호와 닉네임 모두 로그인 시 아이디로{'\n'}사용 가능합니다.</Text>
  
        <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.infoLabelNum}>휴대폰 번호</Text>
          <Text style={styles.infoTextNum}>{phone}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.infoLabel}>닉네임</Text>
          <Text style={styles.infoText}>{nickname}</Text>
        </View>
        </View>
  
        <BottomButton onPress={handleStart} text="찰칵의 덕후 시작하기" />
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
    headerText: {
        fontFamily: 'PretendardJP-Bold',
        color: '#202123',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 32,
    },
    subHeader: {
      marginTop: 18 * scaleHeight,
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    infoContainer: {
      marginTop: 26 * scaleHeight,
      backgroundColor: '#F5F5F5',
      width: '100%',
      height: 104,
      borderRadius: 10,
      padding: 20 * scaleWidth,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16 * scaleHeight,
    },
    infoLabelNum: {
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      marginRight: 14 * scaleWidth,
    },
    infoTextNum: {
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
    infoLabel: {
      fontFamily: 'PretendardJP-Bold',
      color: '#202123',
      fontWeight: '700',
      fontSize: 16,
      lineHeight: 24,
      marginRight: 14 * scaleWidth,
    },
    infoText: {
      fontFamily: 'PretendardJP-Regular',
      color: '#202123',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
    },
  });
