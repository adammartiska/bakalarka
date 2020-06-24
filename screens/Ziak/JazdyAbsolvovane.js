import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import AbsolvovaneZiak from '../../components/AbsolvovaneZiak';
import { create } from 'apisauce';
import moment from 'moment';

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/student/getCompletedRides');
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <View
          style={{
            marginTop: 80,
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : data.length < 1 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 180
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
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <AbsolvovaneZiak
              date={moment(item.date).format('DD.MM.YYYY')}
              time={item.time}
              rideState={item.status}
              instructorName={item.instructor}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginBottom: 20
  }
});

export default JazdyAbsolvovane;
