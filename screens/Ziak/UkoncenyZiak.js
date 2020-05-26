import { create } from 'apisauce';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import AbsolvovaneZiak from '../../components/AbsolvovaneZiak';

const UkoncenyZiak = props => {
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
        const res = await api.get('/relationship/completedRelationship');
        console.log(res);
        setData(res.data.body.rides);
        console.log(res.data.body.rides);
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

export default UkoncenyZiak;
