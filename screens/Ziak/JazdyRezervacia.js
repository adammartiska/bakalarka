import React, { Component, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
//import { Colors } from 'react-native-paper';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { useSelector, connect } from 'react-redux';
import TimeButton from '../../components/TimeButton';
import InstruktorBar from '../../components/InstruktorBar';
import TimeButtonCheck from '../../components/TimeButtonCheck';
import ObjednajButton from '../../components/ObjednajButton';
import { create } from 'apisauce';
import ReservationTab from '../../components/ReservationTab';
import AwesomeAlert from 'react-native-awesome-alerts';

const JazdyRezervacia = props => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const scrollViewRef = useRef();
  const [idToSend, setIdToSend] = useState('');
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const [title, setTitle] = useState({
    datum: '',
    cas: ''
  });
  const pole = ['8:00', '9:00', '10:00'];

  useEffect(() => {
    scrollViewRef.current.scrollToEnd();
  });

  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });

  const selectedStartDate = null;
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [objednal, setObjednal] = useState(false);
  const [selected, setSelected] = useState('');
  const [casy, setCasy] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);

  const fetchniCasy = async date => {
    const resCasy = await api.get(`/student/freeRides/${date}`);
    setCasy(resCasy.data);
    //setCasy(resCasy);
  };

  const jazdaHandler = item => {
    console.log(item);
    setTitle({
      ...title,
      cas: item.time
    });
    setObjednal(true);
    setIdToSend(item.id);
    setSelected(item.time);
    // scrollViewRef.current.scrollToEnd();
    // scrollViewRef.current.scrollToEnd();
  };

  const maper = data => {
    return (
      <View style={{ marginHorizontal: 18 }}>
        <View style={styles.instruktor}>
          <InstruktorBar />
        </View>
        <View style={styles.screen}>
          {data.map(item => {
            return (
              <TimeButton
                styles={
                  selected === item.time && {
                    elevation: 15
                  }
                }
                key={item.time}
                name={item.time}
                onPress={() => jazdaHandler(item)}
              />
            );
          })}
        </View>
        {/*
        (objednal) && (
          <View style={{flex: 1}}>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><Text>My fixed footer</Text></View>
          </View>
        )
        */}
      </View>
    );
  };
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // const [selectedDate, setSelectedDate] = useState([]);
  const token = useSelector(state => state.auth.token);
  const dateChangeHandler = date => {
    fetchniCasy(moment(date).format('YYYY-MM-DD'));
    setIsLoading(false);
    setDisplayText(false);
    const upravenyDate = moment(date).format('YYYY-MM-DD');
    setTitle({
      ...title,
      datum: upravenyDate
    });
    const dataToSent = {
      token: token,
      date: upravenyDate
    };
  };
  const confirmReservation = async () => {
    console.log(idToSend);
    const response = await api.post(`/student/reserveRide/${idToSend}`);
    console.log(response);
    if (response.ok) {
      setShowAlert(true);
    }
  };
  const hideAlert = () => {
    setShowAlert(false);
  };
  const calculateDisabledDates = () => {
    const disabledDates = [];
    const today = new Date();
    const todayM = moment(todayM).format('YYYY-MM-DD');
    const trimmed = todayM.slice(0, 8);
    const startDate = `${trimmed}01`;
    const startDateM = new Date(startDate);
    while (startDateM < today) {
      disabledDates.push(new Date(startDateM));
      startDateM.setDate(startDateM.getDate() + 1);
    }
    setUnavailableDates(disabledDates);
  };
  useEffect(() => calculateDisabledDates(), []);

  return (
    <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
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
          <View>
            {casy.map(item => (
              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 25,
                  borderBottomColor: '#CCC',
                  borderBottomWidth: 1
                }}
              >
                <ReservationTab
                  key={item.instructoName}
                  instructorName={item.instructorName}
                  data={item.rides}
                  onChildClick={jazdaHandler}
                />
              </View>
            ))}
          </View>
        )}
      </View>
      {objednal && (
        <View
          style={{
            marginVertical: 40,
            alignItems: 'center',
            width: '100%',
            height: 40
          }}
        >
          <ObjednajButton
            datum={`${title.datum}      -      ${title.cas}`}
            name="Rezervovat"
            onPress={confirmReservation}
          />
        </View>
      )}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Uspesna rezervacia"
        message={`Vasa rezervacia jazdy na termin ${title.datum} o ${title.cas} bola uspesne vykonana`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText=""
        confirmText="Super!"
        confirmButtonColor="#DD6B55"
        onCancelPressed={hideAlert}
        onConfirmPressed={hideAlert}
      />
    </ScrollView>
  );

  //<View style={{width: '100%', height: 40, position: 'absolute', left: ((screenWidth/4) - 10), right: 0, bottom: 60}}>
};

export default JazdyRezervacia;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF'
  },
  centered: {
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

  textInButton: {
    fontSize: 20,
    color: 'black'
    //fontFamily: 'open-sans-bold',
    //textAlign: 'center',
  }
});
