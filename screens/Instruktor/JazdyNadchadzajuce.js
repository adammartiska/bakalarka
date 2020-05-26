import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState, useEffect } from 'react';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import RezervovanaJazda from '../../components/RezervovanaJazda';
import NadchadzajuceInstruktor from '../../components/NadchadzajuceInstruktor';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import { create } from 'apisauce';
import moment from 'moment';
import { useSelector } from 'react-redux';
import IconButton from '../../components/IconButton';

const JazdyNadchadzajuce = props => {
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });
  const [showPickerArrow, setShowPickerArrow] = useState(false);
  const [showPickerRides, setShowPickerRides] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [recent, setRecent] = useState(false);
  const [upper, setUper] = useState(true);
  const [data, setData] = useState([]);
  const [dataPicker, setDataPicker] = useState([]);
  const [pending, setPending] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [isLoadingPicker, setIsLoadingPicker] = useState(false);

  // useEffect(() => {
  //   async () => {
  //     console.log('zbieha useeffect');
  //     const response = await api.get(
  //       `/instructor/myRides?date=${moment(date).format('YYYY-MM-DD')}`
  //     );
  //     setDataPicker(response.data);
  //   };
  // }, []);

  const onChange = async (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setIsLoadingPicker(true);
    const response = await api.get(
      `/instructor/myRides?date=${moment(selectedDate).format('YYYY-MM-DD')}`
    );
    setDataPicker(response.data);
    setDate(selectedDate);
    setIsLoadingPicker(false);
    console.log(response);
    setShowPickerArrow(true);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const iconButtonHandler = (statePicker, stateUpper) => {
    setShowPickerRides(statePicker);
    setUper(stateUpper);
  }
  const handleRecent = async () => {
    setIsLoadingRecent(true);
    const response = await api.get(
      `/instructor/myRides?date=${moment(new Date()).format('YYYY-MM-DD')}`
    );
    setData(response.data);
    setRecent(!recent);
    setIsLoadingRecent(false);
  };

  const zmazHandler = id => {
    const newData = DATA.filter(item => item.id !== id);
    setDATA(newData);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {upper && (
        <View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 23 }}>Vitaje Adam Martiska</Text>
            <View style={{ marginVertical: 15, alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 16 }}>
                Pozrite si zoznam jazd na dnes
              </Text>
            </View>
            <CustomButton
              name={recent ? 'skryt jazdy' : 'zobrazit jazdy'}
              iconName="md-time"
              onPress={handleRecent}
            />
            {isLoadingRecent && (
              <ActivityIndicator size="large" color={Colors.primaryColor} />
            )}
          </View>
          {recent &&
            (data.length > 0 ? (
              <SafeAreaView>
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <NadchadzajuceInstruktor
                      datum={moment(item.date).format('DD.MM.YYYY')}
                      cas={item.time}
                      style={{ marginHorizontal: 2 }}
                    />
                  )}
                />
              </SafeAreaView>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 120
                }}
              >
                <Text style={{ fontSize: 20, color: Colors.inActive }}>
                  Na dnes nemate ziadne
                </Text>
                <Text style={{ fontSize: 20, color: Colors.inActive }}>
                  rezervovane jazdy
                </Text>
              </View>
            ))}
        </View>
      )}
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.sedatmava,
          marginVertical: 20
        }}
      ></View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>
          Ak by ste si chceli prezriet jazdy, ktore vas cakaju do buducna staci
          si zvolit datum
        </Text>
        <CustomButton
          name="zvolit datum"
          iconName="md-calendar"
          onPress={showDatepicker}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {showPickerArrow &&
        (isLoadingPicker ? (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        ) : (
          <SafeAreaView>
            <View style={{ alignItems: 'center' }}>
              <IconButton
                iconName={showPickerRides ? 'md-arrow-up' : 'md-arrow-down'}
                onPress={() => iconButtonHandler(!showPickerRides, !upper)}
              />
            </View>
            {showPickerRides &&
              (dataPicker.length > 0 ? (
                <FlatList
                  data={dataPicker}
                  renderItem={({ item }) => (
                    <NadchadzajuceInstruktor
                      datum={moment(item.date).format('DD.MM.YYYY')}
                      cas={item.time}
                      style={{ marginHorizontal: 2 }}
                    />
                  )}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: Colors.inActive,
                      textAlign: 'center'
                    }}
                  >
                    K danemu datumu nemate ziadne rezervovane jazdy.
                  </Text>
                </View>
              ))}
          </SafeAreaView>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 12,
    marginTop: 15
  },
  default: {
    marginHorizontal: 12,
    flex: 1,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  riadokJazdy: {
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: Colors.sedatmava,
    padding: 10,
    marginTop: 8,
    width: '60%',
    marginHorizontal: 15
  },
  vysunute: {
    backgroundColor: '#fff',
    marginTop: 0,
    marginHorizontal: 16
  },

  title: {
    fontSize: 22
  },
  logo: {
    width: 22,
    height: 22
  }
});

export default JazdyNadchadzajuce;
