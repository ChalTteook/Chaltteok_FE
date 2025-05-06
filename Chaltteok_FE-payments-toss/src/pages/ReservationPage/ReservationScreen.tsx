import React, { useState, useEffect } from 'react';
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
  const [unavailableTimeSlots] = useState(['13:00', '14:00', '15:00']);
  const [selectedInfo, setSelectedInfo] = useState<string>('날짜와 시간을 선택해주세요');

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = [
    ...Array(new Date(currentYear, currentMonth, 1).getDay()).fill(null), // 월의 시작 요일만큼 null 추가
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), // 1일부터 마지막 날짜까지 추가
  ];
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.setHours(0, 0, 0, 0) >= currentDate.setHours(0, 0, 0, 0); // 시간을 제거하고 비교
  };

  const formatDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = weekDays[date.getDay()];
    return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(day).padStart(2, '0')} ${dayOfWeek}요일`;
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const endHour = String((parseInt(hour) + 1) % 24).padStart(2, '0');
    return `${time} ~ ${endHour}:${minute}`;
  };

  useEffect(() => {
    if (selectedDate && selectedTime) {
      setSelectedInfo(`${formatDate(selectedDate)} ${formatTime(selectedTime)}`);
    } else {
      setSelectedInfo('날짜와 시간을 선택해주세요');
    }
  }, [selectedDate, selectedTime]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>예약하기</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>날짜 선택하기</Text>
        
        <View style={styles.calendarContainer}>
          <View style={styles.calendar}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>
                {`${currentYear}년 ${currentMonth + 1}월`}
              </Text>
              <View style={styles.calendarNavigation}>
                <TouchableOpacity>
                  <Icon name="chevron-back" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.weekDays}>
              {weekDays.map((day, index) => (
                <Text key={index} style={styles.weekDay}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.dates}>
              {days.map((day, index) => (
                <View key={index} style={styles.dateButton}>
                  {day !== null && (
                    <TouchableOpacity
                      style={[
                        styles.dateButtonInner,
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
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>시간 선택</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTime,
                unavailableTimeSlots.includes(time) && styles.unavailableTimeSlot
              ]}
              onPress={() => !unavailableTimeSlots.includes(time) && setSelectedTime(time)}
              disabled={unavailableTimeSlots.includes(time)}
            >
              <Text style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText,
                unavailableTimeSlots.includes(time) && styles.unavailableTimeText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.selectedInfoBackground}>
          <View style={styles.selectedInfoContent}>
            <Text style={styles.selectedInfoText}>
              {selectedInfo}
            </Text>
          </View>
        </View>
        <View style={styles.footerContent}>
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
    justifyContent: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingHorizontal: 16,
    paddingVertical: 12, 
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  calendar: {
    paddingHorizontal: 8,
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
    gap: 8,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    paddingBottom: 8,
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
    marginBottom: 4,
  },
  dateButtonInner: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: {
    backgroundColor: '#F71D6A',
    borderRadius: 15,
  },
  disabledDate: {
    opacity: 0.3,
  },
  dateText: {
    fontSize: 14,
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
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedTime: {
    backgroundColor: '#000',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
  },
  unavailableTimeSlot: {
    backgroundColor: '#F0F0F0',
  },
  unavailableTimeText: {
    color: '#999',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  selectedInfoBackground: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
  },
  selectedInfoContent: {
    paddingHorizontal: 16,
  },
  selectedInfoText: {
    fontSize: 14,
    color: '#666',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 24,
    paddingTop: 18,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F71D6A',
    lineHeight: 30,
  },
  reserveButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',

  },
  reserveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
  },
});

export default ReservationScreen;

