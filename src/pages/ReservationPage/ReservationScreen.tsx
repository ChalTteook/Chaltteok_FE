import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const timeSlots = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

const ReservationScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date >= currentDate;
  };

  const formatDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>예약하기</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>날짜 선택하기</Text>
        
        <View style={styles.calendar}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>
              {`${currentYear}년 ${currentMonth + 1}월`}
            </Text>
            <View style={styles.calendarNavigation}>
              <TouchableOpacity>
                <Icon name="chevron-back" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekDays}>
            {weekDays.map((day, index) => (
              <Text key={index} style={[
                styles.weekDay,
                index === 0 && styles.sunday
              ]}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.dates}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dateButton,
                  selectedDate === day && styles.selectedDate,
                  !isDateSelectable(day) && styles.disabledDate
                ]}
                onPress={() => isDateSelectable(day) && setSelectedDate(day)}
                disabled={!isDateSelectable(day)}
              >
                <Text style={[
                  styles.dateText,
                  selectedDate === day && styles.selectedDateText,
                  !isDateSelectable(day) && styles.disabledDateText
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>시간 선택</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTime
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.selectedInfo}>
          <Text style={styles.selectedInfoText}>
            {selectedDate ? formatDate(selectedDate) : '날짜를 선택해 주세요'}
          </Text>
          <Text style={styles.selectedInfoText}>
            {selectedTime ? selectedTime : '시간을 선택해 주세요'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>총 결제 금액</Text>
          <Text style={styles.price}>50,000원</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.reserveButton,
            (!selectedDate || !selectedTime) && styles.reserveButtonDisabled
          ]}
          disabled={!selectedDate || !selectedTime}
          onPress={() => {
            navigation.navigate('ReservationDetailPage', {
              selectedDate: formatDate(selectedDate),
              selectedTime: selectedTime
            });
          }}
        >
          <Text style={styles.reserveButtonText}>예약하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  calendar: {
    paddingHorizontal: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  calendarNavigation: {
    flexDirection: 'row',
    gap: 16,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  sunday: {
    color: '#FF4081',
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateButton: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#FF4081',
    borderRadius: 20,
  },
  disabledDate: {
    opacity: 0.3,
  },
  dateText: {
    fontSize: 16,
  },
  selectedDateText: {
    color: '#fff',
  },
  disabledDateText: {
    color: '#999',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  timeSlot: {
    width: '23%',
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#FF4081',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTimeText: {
    color: '#fff',
  },
  selectedInfo: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    marginTop: 24,
  },
  selectedInfoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4081',
  },
  reserveButton: {
    backgroundColor: '#FF4081',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReservationScreen;

