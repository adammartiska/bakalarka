import DateTimePicker from '@react-native-community/datetimepicker';
import { create } from 'apisauce';
import moment from 'moment';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import IconButton from '../../components/IconButton';
import NadchadzajuceInstruktor from '../../components/NadchadzajuceInstruktor';
import Colors from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const JazdyNadchadzajuce = props => {
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const userInfo = useSelector(state => state.auth.userInfo);
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
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [isLoadingPicker, setIsLoadingPicker] = useState(false);

  const onChange = async (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setIsLoadingPicker(true);
    const response = await api.get(
      `/instructor/myRides?date=${moment(selectedDate).format('YYYY-MM-DD')}`
    );
    setDataPicker(response.data);
    setDate(selectedDate);
    setIsLoadingPicker(false);
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
    console.log(dataPicker);
  };
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
            <Text style={{ fontSize: hp('3.5%') }}>
              Vitaje {userInfo.fullName}
            </Text>
            <View style={{ marginTop: hp('2.75%'), alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: hp('2.5%') }}>
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
                {data.map(item => (
                  <NadchadzajuceInstruktor
                    key={item.time}
                    datum={moment(item.date).format('DD.MM.YYYY')}
                    cas={item.time}
                    style={{ marginHorizontal: 2 }}
                    name={item.student}
                  />
                ))}
              </SafeAreaView>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: hp('17%')
                }}
              >
                <Text style={{ fontSize: hp('3.25%'), color: Colors.inActive }}>
                  Na dnes nemate ziadne
                </Text>
                <Text style={{ fontSize: hp('3.25%'), color: Colors.inActive }}>
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
          marginVertical: hp('3%')
        }}
      ></View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: hp('2.5%') }}>
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
          minimumDate={new Date()}
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
                <SafeAreaView>
                  {dataPicker.map(item => (
                    <NadchadzajuceInstruktor
                      key={item.time}
                      datum={moment(item.date).format('DD.MM.YYYY')}
                      cas={item.time}
                      style={{ marginHorizontal: 2 }}
                      name={item.student}
                    />
                  ))}
                </SafeAreaView>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: hp('12%')
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp('3.25%'),
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
    marginHorizontal: wp('4%'),
    marginTop: hp('2.75%')
  }
});

export default JazdyNadchadzajuce;
