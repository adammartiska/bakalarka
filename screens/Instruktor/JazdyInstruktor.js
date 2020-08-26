import { create } from 'apisauce';
import moment from 'moment';
import { isEmpty } from 'ramda';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSelector } from 'react-redux';
import AuthButton from '../../components/AuthButton';
import TimeButtonCheck from '../../components/TimeButtonCheck';
import Colors from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const JazdyInstruktor = props => {
  const [pole, setPole] = useState([]);
  const selectedStartDate = null;
  const minDate = new Date();
  const [casy, setCasy] = useState([]);
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState(true);
  const [isLoadingOffer, setIsLoadingOffer] = useState(false);
  const [dateToSent, setDateToSent] = useState('');
  const [initialTimes, setInitialTimes] = useState([]);
  const [bigData, setBigData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });

  const getChanges = (oldArray, newArray) => {
    const checkedChanged = [];
    const unCheckedChanged = [];
    var i, item, j, len;
    if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
      return false;
    }
    const changes = [];
    for (i = j = 0, len = newArray.length; j < len; i = ++j) {
      item = newArray[i];
      if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
        changes.push(item);
      }
    }
    changes.map(item => {
      if (!item.isChecked) {
        unCheckedChanged.push({
          date: dateToSent,
          time: item.label
        });
        ('posielam neceknute');
      } else if (item.isChecked) {
        checkedChanged.push({
          date: dateToSent,
          time: item.label
        });
        ('posielam ceknute');
      }
    });
    return { checkedChanged, unCheckedChanged };
  };

  const zhromazdiData = async data => {
    setIsLoadingOffer(true);
    setPole([]);
    setBigData([]);
    data.map(item => {
      pole.push({
        value: item.value,
        label: item.label,
        isChecked: item.isChecked
      });
    });
    if (initialTimes.some(item => item.isChecked === false)) {
      const { checkedChanged, unCheckedChanged } = getChanges(
        initialTimes,
        pole
      );
      if (!isEmpty(unCheckedChanged)) {
        const poslaneUnchecked = await api.delete(
          '/instructor/removeRides',
          {},
          { data: unCheckedChanged }
        );
        setIsLoading(false);
      }
      if (!isEmpty(checkedChanged)) {
        const temp = [];
        checkedChanged.map(item => {
          temp.push({
            date: dateToSent,
            time: item.time
          });
        });
        const poslaneChecked = await api.post('/instructor/addRides', temp);
        setIsLoading(false);
      }
    } else {
      pole.map(item => {
        if (item.isChecked) {
          bigData.push({
            date: dateToSent,
            time: item.label
          });
        }
      });
      const poslane = await api.post('/instructor/addRides', bigData);
      if (poslane.ok) {
        setShowAlert(true);
      }
    }
    setIsLoadingOffer(false);
  };

  function handleToggleCheckbox(value) {
    setCasy(list =>
      list.map(item => {
        if (item.value === value) {
          return {
            ...item,
            isChecked: !item.isChecked
          };
        }
        return item;
      })
    );
  }

  const maper = data => {
    return (
      <View style={styles.center}>
        {isLoading ? (
          <View
            style={{
              marginTop: hp('3%'),
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <ActivityIndicator size="large" color={Colors.primaryColor} />
          </View>
        ) : (
          <View>
            <View style={styles.screen}>
              {data.map(({ value, label, isChecked }) => (
                <TimeButtonCheck
                  key={value}
                  label={label}
                  isChecked={isChecked}
                  onPress={() => handleToggleCheckbox(value)}
                />
              ))}
            </View>
          </View>
        )}
        {!isLoading && (
          <View style={{ marginTop: hp('2%'), alignItems: 'center' }}>
            <AuthButton
              title="Ponukni jazdy"
              onPress={() => zhromazdiData(data)}
              isLoading={isLoadingOffer}
              buttonStyle={{ marginTop: hp('0%'), borderRadius: hp('0.5%') }}
            />
          </View>
        )}
      </View>
    );
  };

  const fetchniCasy = async date => {
    const resCasy = await api.get(`/instructor/showTimes/${date}`);
    setInitialTimes(resCasy.data.body);
    setCasy(resCasy.data.body);
    setIsLoading(false);
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // const [selectedDate, setSelectedDate] = useState([]);
  const token = useSelector(state => state.auth.token);
  const dateChangeHandler = async date => {
    setIsLoading(true);
    setDateToSent(moment(date).format('YYYY-MM-DD'));

    await fetchniCasy(moment(date).format('YYYY-MM-DD'));
    setIsLoading(false);
    setDisplayText(false);

    const upravenyDate = moment(date).format('YYYY-MM-DD');
    const dataToSent = {
      token: token,
      date: upravenyDate
    };
  };

  return (
    <ScrollView contentContainerstyle={styles.container}>
      <CalendarPicker
        minDate={minDate}
        onDateChange={dateChangeHandler}
        selectedDayColor={Colors.lightGreen}
        restrictMonthNavigation={true}
      />
      <View>
        {displayText ? (
          isLoading ? (
            <View style={{ paddingTop: 10, textAlign: 'center' }}>
              <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
          ) : (
            <View style={styles.centered}>
              <Text style={{ textAlign: 'center', fontSize: hp('2.5%') }}>
                Ak chcete ponuknut studentom jazdy kliknite na datum a vyberte,
                v akych casoch chcete jazdy ponukat
              </Text>
            </View>
          )
        ) : (
          maper(casy)
        )}
      </View>
    </ScrollView>
  );
};

export default JazdyInstruktor;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: hp('3%')
  },
  centered: {
    marginTop: hp('0.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('6%')
  },
  center: {
    flexDirection: 'column',
    marginHorizontal: wp('4%')
  },
  screen: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  }
});
