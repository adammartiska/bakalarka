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
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const VyberScreen = props => {
  const jwt = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const relations = useSelector(state => state.auth.relations);
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  });
  const [autoskola, setSelectedAutoskola] = useState('');
  const [rola, setSelectedRola] = useState('');

  const enterHandler = async (relationId, role) => {
    const response = await dispatch(authActions.reduxdata(jwt, relationId));
    console.log(response);
    if (response.ok) {
      if (role === 'STUDENT') {
        props.navigation.navigate('SignedInZiak');
      } else if (role === 'INSTRUCTOR') {
        props.navigation.navigate('SignedInInstructor');
      } else if (role === 'OWNER') {
        //tu budem navigovat na screen owenra
      }
    }
  };
  return (
    <View style={styles.screen}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.centered}>
          Vyberte si autoskolu, do ktorej sa chcete prihlasit
        </Text>
      </View>
      {relations.map(item => {
        return (
          <AutoskolaCart
            state={item.information}
            role={item.role}
            key={item.relationID}
            autoskola={item.school}
            onPress={() => enterHandler(item.relationID, item.role)}
          />
        );
      })}
      <View style={{ marginTop: 25 }}>
        <Text style={styles.centered}>
          Pokial sa chcete registrovat do novej autoskoly, musite si zalozit
          nove konto
        </Text>
      </View>
      <View style={styles.customButon}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Vyber')}
        >
          <Text style={styles.textInButton}>Nove konto</Text>
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
    marginTop: 25
  },
  textInButton: {
    fontSize: 20,
    color: 'white'
  },
  customButon: {
    height: 50,
    width: '40%',
    backgroundColor: '#000',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  centered: {
    fontSize: 18,
    textAlign: 'center'
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

export default VyberScreen;
