import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  Picker,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { create } from 'apisauce';
import { useSelector, useDispatch } from 'react-redux';
//import * as authActions from '../store/actions/auth';
import ConfirmTab from '../../components/ConfirmTab';
import Colors from '../../constants/Colors';
import { Divider } from 'react-native-elements';

const ConfirmScreen = props => {
  const jwt = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
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

  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const fetchRequests = async () => {
    const response = await api.get('/school/getRequests');
    response.data.map(item => {
      if (item.role === 'student') {
        const novePole = [];
        novePole.push(item);
        setStudents(novePole);
      } else if (item.role === 'instructor') {
        const novePole = [];
        novePole.push(item);
        setInstructors(novePole);
      }
    });
    console.log(response.data);
  };
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await api.get('/school/getRequests');
      response.data.map(item => {
        if (item.role === 'student') {
          const novePole = [];
          novePole.push(item);
          setStudents(novePole);
        } else if (item.role === 'instructor') {
          const novePole = [];
          novePole.push(item);
          setInstructors(novePole);
        }
      });
      console.log(response.data);
    };
    fetchRequests();
  }, [students, instructors]);

  const confirmHandler = async id => {
    const response = await api.post(
      `/school/confirmUser/${id}?confirm=${true}`
    );
    if (response.ok) {
      () => fetchRequests();
    }
  };

  const declineHandler = async id => {
    const response = await api.post(
      `/school/confirmUser/${id}?confirm=${false}`
    );
    console.log(response);
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginVertical: 15 }}>
          <Text style={{ color: 'black', fontSize: 25 }}>Instruktori</Text>
        </View>
        {instructors.length > 0 ? (
          instructors.map(instructor => {
            return (
              <ConfirmTab
                key={instructor.relationID}
                name={instructor.name}
                onPressAccept={() => confirmHandler(instructor.relationID)}
                onPressDecline={() => declineHandler(instructor.relationID)}
              />
            );
          })
        ) : (
          <View>
            <Text style={styles.disabledText}>
              Ziadne nove ziadosti od instruktorov
            </Text>
          </View>
        )}
      </View>
      <View style={styles.ciara}></View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginVertical: 15 }}>
          <Text style={styles.textStyle}>Ziaci</Text>
        </View>
        {students.length > 0 ? (
          students.map(student => {
            return (
              <ConfirmTab
                key={student.relationID}
                name={student.name}
                onPressAccept={() => confirmHandler(student.relationID)}
                onPressDecline={() => declineHandler(student.relationID)}
              />
            );
          })
        ) : (
          <View>
            <Text style={styles.disabledText}>
              Ziadne nove ziadosti od ziakov
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 20
  },
  textInButton: {
    fontSize: 20,
    color: 'white'
  },
  disabledText: {
    color: '#464646'
  },
  textStyle: {
    fontSize: 25
  },
  ciara: {
    borderWidth: 1,
    borderColor: Colors.sedatmava,
    marginTop: 40,
    marginBottom: 25
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

export default ConfirmScreen;
