import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
//import { Colors } from 'react-native-paper';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { useSelector, connect, useDispatch } from 'react-redux';
import TimeButtonCheck from '../../components/TimeButtonCheck';
import TimeButton from '../../components/TimeButton';
import * as authActions from '../../store/actions/auth';
import { useFetchGet } from '../../hooks/useFetchGet';
import { useFetchPost } from '../../hooks/useFetchPost';
import { create } from 'apisauce';
import { isEmpty } from 'ramda';

const JazdyInstruktor = props => {
  const [pole, setPole] = useState([]);
  useEffect(() => {
    console.log('useEffect');
    calculateDisabledDates();
  }, []);
  const selectedStartDate = null;
  const [casy, setCasy] = useState([]);
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState(true);
  const [dateToSent, setDateToSent] = useState('');
  const [initialTimes, setInitialTimes] = useState([]);
  const [bigData, setBigData] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);

  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });

  const list = [
    { value: '1100', label: '11:00' },
    { value: '1200', label: '12:00' },
    { value: '1300', label: '13:00' },
    { value: '1400', label: '14:00' },
    { value: '1500', label: '15:00' },
    { value: '1600', label: '16:00' }
  ];
  const [data, setData] = useState(() =>
    list.map(item => ({
      ...item,
      isChecked: true
    }))
  );

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
        console.log('posielam neceknute');
      } else if (item.isChecked) {
        checkedChanged.push({
          date: dateToSent,
          time: item.label
        });
        console.log('posielam ceknute');
      }
    });
    return { checkedChanged, unCheckedChanged };
  };

  const zhromazdiData = async data => {
    setPole([]);
    setBigData([]);
    data.map(item => {
      pole.push({
        value: item.value,
        label: item.label,
        isChecked: item.isChecked
      });
    });
    console.log(pole);
    if (initialTimes.some(item => item.isChecked === false)) {
      const { checkedChanged, unCheckedChanged } = getChanges(
        initialTimes,
        pole
      );
      if (!isEmpty(unCheckedChanged)) {
        setIsLoading(true);
        const poslaneUnchecked = await api.delete(
          '/instructor/removeRides',
          {},
          { data: unCheckedChanged }
        );
        setIsLoading(false);
        console.log(poslaneUnchecked);
      }
      if (!isEmpty(checkedChanged)) {
        const temp = [];
        checkedChanged.map(item => {
          temp.push({
            date: dateToSent,
            time: item.time
          });
        });
        setIsLoading(true);
        const poslaneChecked = await api.post('/instructor/addRides', temp);
        setIsLoading(false);
        console.log(poslaneChecked);
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

      console.log('BIG DATA POD TYMTO');
      console.log(bigData);
      const poslane = await api.post('/instructor/addRides', bigData);
      console.log(poslane);
    }
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
          <View style={{ paddingTop: 10, textAlign: 'center' }}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : (
          <View style={{ marginHorizontal: 18 }}>
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
        <View style={styles.confirmButton}>
          {isLoading ? (
            <View style={{ paddingTop: 10, textAlign: 'center' }}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => zhromazdiData(casy)}
            >
              <Text style={{ fontSize: 20 }}>Posli</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const fetchniCasy = async date => {
    const resCasy = await api.get(`/instructor/showTimes/${date}`);
    setInitialTimes(resCasy.data.body);
    setCasy(resCasy.data.body);
  };

  const calculateDisabledDates = () => {
    const disabledDates = [];
    const today = new Date();
    const todayM = moment(todayM).format('YYYY-MM-DD');
    const trimmed = todayM.slice(0, 8);
    const startDate = `${trimmed}01`;
    const startDateM = new Date(startDate);
    while (startDateM <= today) {
      disabledDates.push(new Date(startDateM));
      startDateM.setDate(startDateM.getDate() + 1);
    }
    setUnavailableDates(disabledDates);
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // const [selectedDate, setSelectedDate] = useState([]);
  const token = useSelector(state => state.auth.token);
  const dateChangeHandler = async date => {
    console.log(date);
    setDateToSent(moment(date).format('YYYY-MM-DD'));

    fetchniCasy(moment(date).format('YYYY-MM-DD'));
    setIsLoading(false);
    setDisplayText(false);

    const upravenyDate = moment(date).format('YYYY-MM-DD');
    const dataToSent = {
      token: token,
      date: upravenyDate
    };
    console.log(dataToSent);
  };

  return (
    <ScrollView contentContainerstyle={styles.container}>
      <CalendarPicker
        onDateChange={dateChangeHandler}
        disabledDates={unavailableDates}
      />
      <View>
        {isLoading ? (
          displayText ? (
            <View style={styles.centered}>
              <Text>Pre zobrazenie volnych terminov si vyberte datum</Text>
            </View>
          ) : (
            <View style={{ paddingTop: 10, textAlign: 'center' }}>
              <ActivityIndicator size="large" color={Colors.primaryColor} />
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
    marginTop: 20
  },
  confirmButton: {
    margin: 5,
    height: 30,
    width: '22%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },

  restoreCenter: {
    width: '30%',
    marginVertical: 60
  },

  instruktor: {
    marginLeft: 8,
    marginBottom: 10
  },
  customButon: {
    margin: 5,
    height: 30,
    width: '21%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  posli: {
    marginTop: 20,
    justifyContent: 'center'
  },

  textInButton: {
    fontSize: 20,
    color: 'black'
    //fontFamily: 'open-sans-bold',
    //textAlign: 'center',
  }
});
