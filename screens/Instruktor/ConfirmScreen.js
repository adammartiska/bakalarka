import { create } from 'apisauce';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
//import * as authActions from '../store/actions/auth';
import ConfirmTab from '../../components/ConfirmTab';
import Colors from '../../constants/Colors';

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

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await api.get('/school/getRequests');
      if (response.ok) {
        response.data.map(item => {
          if (item.role === 'student') {
            setStudents(oldState => [...oldState, item]);
          } else if (item.role === 'instructor') {
            setInstructors(oldState => [...oldState, item]);
          }
        });
      }
    };
    fetchRequests();
  }, []);

  const confirmHandler = async (id, role) => {
    const response = await api.post(
      `/school/confirmUser/${id}?confirm=${true}`
    );
    if (response.ok) {
      if (role === 'student') {
        setStudents(students.filter(student => student.relationID !== id));
      }
      if (role === 'instructor') {
        setInstructors(
          instructors.filter(instructor => instructor.relationID !== id)
        );
      }
    }
  };

  const declineHandler = async (id, role) => {
    const response = await api.post(
      `/school/confirmUser/${id}?confirm=${false}`
    );
    if (response.ok) {
      if (role === 'student') {
        setStudents(students.filter(student => student.relationID !== id));
      }
      if (role === 'instructor') {
        setInstructors(
          instructors.filter(instructor => instructor.relationID !== id)
        );
      }
    }
    //setStudents(students.filter(student => student.relationID !== id));
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
                onPressAccept={() =>
                  confirmHandler(instructor.relationID, 'instructor')
                }
                onPressDecline={() =>
                  declineHandler(instructor.relationID, 'instructor')
                }
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
                onPressAccept={() =>
                  confirmHandler(student.relationID, 'student')
                }
                onPressDecline={() =>
                  declineHandler(student.relationID, 'student')
                }
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
  innerText: {
    fontSize: 16
  }
});

export default ConfirmScreen;
