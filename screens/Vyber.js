import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  Picker,
  TouchableOpacity
} from 'react-native';
import TimeButton from '../components/TimeButton';
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import AutoskolaCart from '../components/AutoskolaCart';
import { create } from 'apisauce';
import { useSelector } from 'react-redux';

const Vyber = props => {
  const jwt = useSelector(state => state.auth.token);
  const [schools, setSchools] = useState([]);
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  });
  const [autoskola, setSelectedAutoskola] = useState('');
  const registerHandler = async () => {
    const response = await api.post(`/relationship/enterSchool/${autoskola}`);
    console.log(response);
    if (response.ok) {
      props.navigation.navigate('VyberScreen');
    }
  };
  useEffect(() => {
    const fetchSchools = async () => {
      const response = await api.get('/user/getSchools');
      setSchools(response.data);
      //console.log(response.data);
    };
    fetchSchools();
  }, []);
  return (
    <View style={styles.screen}>
      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontSize: 25 }}>Vitajte</Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Pre prve prihlasenie si prosim zvolte jednu z nasledujucich autoskol
        </Text>
      </View>
      <View style={styles.pickerOut}>
        <Picker
          selectedValue={autoskola}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedAutoskola(itemValue)
          }
          itemStyle={{ textAlign: 'center' }}
        >
          {schools.map(item => {
            return (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            );
          })}
        </Picker>
      </View>
      <View
        style={
          autoskola === '' ? styles.customButtonDisabled : styles.customButon
        }
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={registerHandler}
          disabled={autoskola === ''}
        >
          <Text
            style={
              autoskola === ''
                ? styles.disabledTextInButton
                : styles.textInButton
            }
          >
            Vstupit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 45
  },
  riadokJazdy: {
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16
  },
  picker: {
    height: 50,
    width: 200,
    justifyContent: 'center'
  },
  pickerOut: {
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: (255, 255, 255, 0.9),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    elevation: 2
  },
  outer: {
    width: '85%',
    borderWidth: 1,
    borderColor: Colors.sedatmava
  },
  innerText: {
    fontSize: 16
  },
  textInButton: {
    fontSize: 20,
    color: 'white'
  },
  disabledTextInButton: {
    fontSize: 20,
    color: '#4d4d4d'
  },

  innerText: {
    fontSize: 16
  },
  customButon: {
    marginTop: 70,
    padding: 5,
    height: 40,
    width: '35%',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  customButtonDisabled: {
    marginTop: 70,
    padding: 5,
    height: 40,
    width: '35%',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2
  },
  bunky: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginVertical: 5,
    paddingHorizontal: 25
  },
  skusim: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 50
  }
});

export default Vyber;
