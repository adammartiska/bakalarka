import { create } from 'apisauce';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import TimeButton from '../../components/TimeButton';

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
    <View style={styles.center}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        Vyber si test, z ktoreho sa chces preskusat
      </Text>
      <View>
        <Image style={styles.logo} source={require('../../Images/test.png')} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TimeButton
          name={zobraz}
          styles={styles.mainButton}
          onPress={zobrazHandler}
          styles={{ width: 150, height: 40 }}
        />
      </View>
      <ScrollView>
        {stav &&
          testy.map(test => {
            return (
              <TimeButton
                key={test}
                testId={test}
                name={`${test}. test`}
                styles={styles.testButton}
                onPress={() => {
                  navigujHandler(test);
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
  mainButton: {
    width: 160,
    marginVertical: 20
  },
  testButton: {
    width: 150,
    marginVertical: 10
  },
  logo: {
    marginVertical: 30,
    width: 90,
    height: 130
  }
});

export default Testy;
