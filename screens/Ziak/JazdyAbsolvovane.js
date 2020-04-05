import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image
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
        console.log(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AbsolvovaneZiak
            date={moment(item.date).format('DD.MM.YYYY')}
            time={item.time}
            rideState={item.status}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 8
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

export default JazdyAbsolvovane;
