import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShareModal = ({ isVisible, onClose }) => {
  const shareOptions = [
    { name: '링크 복사', icon: 'link-outline' },
    { name: '카카오', icon: 'chatbubble-outline' },
    { name: '인스타그램', icon: 'logo-instagram' },
    { name: '기타', icon: 'ellipsis-horizontal-outline' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.shareOptions}>
            {shareOptions.map((option, index) => (
              <TouchableOpacity key={index} style={styles.shareOption}>
                <View style={[
                  styles.iconContainer,
                  option.name === '기타' && styles.etcIconContainer
                ]}>
                  <Icon name={option.icon} size={24} color="#000" />
                </View>
                <Text style={styles.shareOptionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 20,
    height: '32%',
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  shareOption: {
    alignItems: 'center',
    width: '25%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  etcIconContainer: {
    backgroundColor: '#F5F5F5',
  },
  shareOptionText: {
    marginTop: 12,
    fontSize: 12,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShareModal;

