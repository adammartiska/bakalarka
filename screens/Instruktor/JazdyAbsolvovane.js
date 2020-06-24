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
import AbsolvovaneInstruktor from '../../components/AbsolvovaneInstruktor';
import CustomButton from '../../components/CustomButton';
import IconButton from '../../components/IconButton';
import Colors from '../../constants/Colors';

const JazdyAbsolvovane = props => {
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
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [recentRides, setRecentRides] = useState([]);
  const [show, setShow] = useState(false);
  const [recent, setRecent] = useState(false);
  const [dateRides, setDateRides] = useState([]);
  const [showDateRides, setShowDateRides] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPickerArrow, setShowPickerArrow] = useState(false);
  const [isLoadingPicker, setIsLoadingPicker] = useState(false);
  const [showPickerRides, setShowPickerRides] = useState(false);

  const onChange = async (event, selectedDate) => {
    setShow(Platform.OS === 'ios' ? true : false);
    const currentDate = selectedDate || date;
    setIsLoadingPicker(true);
    const response = await api.get(
      `/instructor/getCompletedRides/date?=${moment(selectedDate).format(
        'YYYY-MM-DD'
      )}`
    );
    if (response.ok) {
      setDateRides(response.data);
    }
    setIsLoadingPicker(false);
    setDate(currentDate);
    setShowPickerArrow(true);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleRecent = async () => {
    setRecent(!recent);
    if (recent === false) {
      setIsLoading(true);
      const response = await api.get('/instructor/getLastRides?count=6');
      if (response.ok) {
        setRecentRides(response.data);
      }
      setIsLoading(false);
    }
  };
  const iconButtonHandler = (statePicker, stateUpper) => {
    setShowPickerRides(statePicker);
    setShowDateRides(!stateUpper);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {showDateRides && (
        <View>
          <View style={{ marginVertical: 8, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
              Tu si mozte pozriet vase posledne absolvovane jazdy
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <CustomButton
              name={recent ? 'skry jazdy' : 'zobraz jazdy'}
              iconName="md-time"
              onPress={handleRecent}
            />
          </View>
          {recent &&
            (isLoading ? (
              <View>
                <ActivityIndicator size="large" color={Colors.primaryColor} />
              </View>
            ) : (
              <View style={{ marginBottom: 20 }}>
                {recentRides.length > 0 ? (
                  recentRides.map(item => (
                    <AbsolvovaneInstruktor
                      state="absolvovana"
                      key={item.time}
                      name={item.student}
                      datum={item.date}
                      cas={item.time}
                      style={{ marginHorizontal: 2 }}
                    />
                  ))
                ) : (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 130
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        textAlign: 'center',
                        color: Colors.inActive
                      }}
                    >
                      Nemate ziadne absolvovane jazdy
                    </Text>
                  </View>
                )}
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
          Ak by ste si chceli prezriet jazdy z predoslych datumov, staci si
          zvolit datum
        </Text>

        <CustomButton
          name="zvolit datum"
          iconName="md-calendar"
          onPress={showDatepicker}
        />
        {show && (
          <DateTimePicker
            maximumDate={new Date()}
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
                  onPress={() =>
                    iconButtonHandler(!showPickerRides, showDateRides)
                  }
                />
              </View>
              {showPickerRides &&
                (dateRides.length > 0 ? (
                  <FlatList
                    data={dateRides}
                    renderItem={({ item }) => (
                      <AbsolvovaneInstruktor
                        state="absolvovana"
                        key={item.time}
                        name={item.student}
                        datum={item.title}
                        cas={item.time}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    marginTop: 13,
    marginHorizontal: 20
  }
});

export default JazdyAbsolvovane;
