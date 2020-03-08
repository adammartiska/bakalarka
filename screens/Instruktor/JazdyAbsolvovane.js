import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  Image,
  ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import NadchadzajuceInstruktor from '../../components/NadchadzajuceInstruktor';
import TimeButton from '../../components/TimeButton';
import AbsolvovaneInstruktor from '../../components/AbsolvovaneInstruktor';
import AbsolvovanePending from '../../components/AbsolvovanePending';

const JazdyAbsolvovane = props => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '12.3.2018',
      time: '15:00'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '5.4.2018',
      time: '12:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '18.4.2018',
      time: '10:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '18.4.2018',
      time: '10:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '18.4.2018',
      time: '10:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '18.4.2018',
      time: '10:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '18.4.2018',
      time: '10:00'
    }
  ];
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [recent, setRecent] = useState(false);
  const [pending, setPending] = useState(false);
  const [dateRides, setDateRides] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
    console.log(date);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleRecent = () => {
    setRecent(!recent);
  };
  const handlePending = () => {
    setPending(!pending);
    console.log('som tu');
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {!recent && (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ textAlign: 'center' }}>
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
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View style={{ marginVertical: 15, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>
              ... alebo si mozte len zobrazit nedavne jazdy
            </Text>
          </View>
        </View>
      )}
      <View style={{ alignItems: 'center' }}>
        <CustomButton
          name={recent ? 'skry jazdy' : 'zobraz jazdy'}
          iconName="md-time"
          onPress={handleRecent}
        />
      </View>

      {recent &&
        (isLoading ? (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        ) : (
          <SafeAreaView>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <AbsolvovaneInstruktor
                  state="absolvovana"
                  datum={item.title}
                  cas={item.time}
                  style={{ marginHorizontal: 2 }}
                />
              )}
            />
          </SafeAreaView>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 13,
    marginHorizontal: 20
  },

  riadokJazdy: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e6ffee',
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16
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

{
  /* <SafeAreaView style = {styles.screen}>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item nazov = {item.title}/>}
        />      
        
        
    </SafeAreaView>  */
}

export default JazdyAbsolvovane;
