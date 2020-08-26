import { create } from 'apisauce';
import React, { useEffect, useState } from 'react';
import { Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    if (response.ok) {
      props.navigation.navigate('VyberScreen');
    }
  };
  useEffect(() => {
    const fetchSchools = async () => {
      const response = await api.get('/user/getSchools');
      setSchools(response.data);
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
  customButon: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    elevation: 3,
    height: 40,
    marginTop: 70,
    padding: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: '35%'
  },
  customButtonDisabled: {
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    elevation: 2,
    height: 40,
    marginTop: 70,
    padding: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: '35%'
  },
  disabledTextInButton: {
    color: '#4d4d4d',
    fontSize: 20
  },
  innerText: {
    fontSize: 16
  },
  picker: {
    height: 50,
    justifyContent: 'center',
    width: 200
  },

  pickerOut: {
    backgroundColor: (255, 255, 255, 0.9),
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 5
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
    marginTop: 45
  },
  textInButton: {
    color: 'white',
    fontSize: 20
  }
});

export default Vyber;
