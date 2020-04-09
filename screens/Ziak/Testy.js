import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  Button,
  ScrollView
} from 'react-native';
import ToggleSwitch from '../../components/ToggleSwitch';
import InstruktorBar from '../../components/InstruktorBar';
import TimeButtonCheck from '../../components/TimeButtonCheck';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import { useSelector } from 'react-redux';
import PickerTesty from '../../components/PickerTesty';
import TimeButton from '../../components/TimeButton';
import jsonData from '../../constants/Test';
import { create } from 'apisauce';

const Testy = props => {
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
  const [zobraz, setZobraz] = useState('zobraz testy');
  const [stav, setStav] = useState(false);
  const [zvoleny, setZvoleny] = useState('Prvy');

  /* tuto informaciu loadnem zo serveru hned */
  const testy = [
    { label: 'Prvy test', value: 'Prvy' },
    { label: 'Druhy test', value: 'Druhy' },
    { label: 'Treti test', value: 'Treti' },
    { label: 'Stvrty test', value: 'Stvrty' }
  ];
  let button = 'zobraz testy';
  const zobrazHandler = async () => {
    const response = await api.get('/tests/3');
    console.log(response.data.questions);
    zobraz === 'zobraz testy'
      ? setZobraz('skry testy')
      : setZobraz('zobraz testy');
    setStav(!stav);
  };

  const navigujHandler = async testId => {
    const response = await api.get('/tests/3');
    props.navigation.navigate('TestVseobecne', {
      test: response.data //tu priradim data z fetchu ako jsonData
    });
  };

  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        Vyber si test, z ktoreho sa chces preskusat
      </Text>
      <View>
        <Image style={styles.logo} source={require('../../Images/test.png')} />
      </View>
      {/*<PickerTesty 
        selectedValue = {zvoleny}
        onValueChange={(value) => setZvoleny(value)}/> */}
      <TimeButton
        name={zobraz}
        styles={styles.mainButton}
        onPress={zobrazHandler}
      />
      <ScrollView>
        {stav &&
          testy.map(test => {
            return (
              <TimeButton
                key={test.value}
                testId={test.value}
                name={test.label}
                styles={styles.testButton}
                onPress={() => {
                  navigujHandler(test.value);
                }}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    paddingHorizontal: 50
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainButton: {
    width: 160,
    marginVertical: 20
  },
  testButton: {
    width: 150,
    marginVertical: 10
  },
  instruktorLayout: {
    flexDirection: 'row'
  },
  logo: {
    marginVertical: 30,
    width: 90,
    height: 130
  },
  menoInstruktora: {
    marginLeft: 20,
    paddingVertical: 15
  }
});

export default Testy;
