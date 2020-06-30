import { create } from 'apisauce';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import AuthButton from '../../components/AuthButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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

  /* tuto informaciu loadnem zo serveru hned */
  const [testy, setTesty] = useState([]);
  let button = 'zobraz testy';
  const zobrazHandler = async () => {
    const response = await api.get('/tests/');
    setTesty(response.data);
    zobraz === 'zobraz testy'
      ? setZobraz('skry testy')
      : setZobraz('zobraz testy');
    setStav(!stav);
  };

  const navigujHandler = async testId => {
    const response = await api.get(`/tests/${testId}`);
    props.navigation.navigate('TestVseobecne', {
      test: response.data //tu priradim data z fetchu ako jsonData
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.center}>
      <Text style={{ fontSize: hp('3%'), textAlign: 'center' }}>
        Vyber si test, z ktoreho sa chces preskusat
      </Text>
      <View>
        <Image style={styles.logo} source={require('../../Images/test.png')} />
      </View>
      <View style={{ marginBottom: hp('3%') }}>
        <AuthButton
          title={zobraz}
          onPress={zobrazHandler}
          fontStyle={{ fontSize: hp('2.75%') }}
        />
      </View>
      <View style={styles.testContainer}>
        {stav &&
          testy.map(test => {
            return (
              <AuthButton
                key={test}
                title={`${test}. test`}
                onPress={() => {
                  navigujHandler(test);
                }}
                fontStyle={{ fontSize: hp('2.5%') }}
                buttonStyle={{ width: wp('40%'), backgroundColor: '#000' }}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flexGrow: 1,
    paddingTop: 30,
    alignItems: 'center',
    marginHorizontal: wp('4%')
  },
  testContainer: {
    marginBottom: hp('5%')
  },
  logo: {
    marginVertical: hp('4%'),
    width: wp('23%'),
    height: hp('19%')
  }
});

export default Testy;
