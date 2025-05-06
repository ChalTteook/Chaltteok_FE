import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const scaleHeight = height / 812;

const BottomButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 343,
    height: 48,
    backgroundColor: '#F71D6A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 48 * scaleHeight,
  },
  buttonText: {
    fontFamily: 'PretendardJP-Regular',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: 'center',
  },
});

export default BottomButton;
