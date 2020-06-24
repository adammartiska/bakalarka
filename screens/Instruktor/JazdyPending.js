import { create } from 'apisauce';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import AbsolvovanePending from '../../components/AbsolvovanePending';
import Colors from '../../constants/Colors';

const JazdyNadchadzajuce = props => {
  const [rides, setRides] = useState([]);
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/instructor/getPendingRides');
        setRides(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const zmazHandler = id => {
    const newData = DATA.filter(item => item.id !== id);
    setDATA(newData);
  };

  const confirmHandler = async id => {
    const response = await api.post('/instructor/completeRide', { id: id });
    if (response.ok) {
      setRides(rides.filter(ride => ride.id !== id));
    }
  };

  const declineHandler = async (date, time, id) => {
    const response = await api.delete(
      '/instructor/removeRides',
      {},
      { data: [{ date: date, time: time }] }
    );
    if (response.ok) {
      setRides(rides.filter(ride => ride.id !== id));
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      ) : rides.length > 0 ? (
        <FlatList
          data={rides}
          renderItem={({ item }) => (
            <AbsolvovanePending
              datum={moment(item.date).format('DD.MM.YYYY')}
              cas={item.time}
              onPressConfirm={() => confirmHandler(item.id)}
              onPressDecline={() =>
                declineHandler(
                  moment(item.date).format('YYYY-MM-DD'),
                  item.time,
                  item.id
                )
              }
              name={item.student}
            />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 35
          }}
        >
          <View>
            <Icon name="thumbs-up" size={50} color="black" />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 25 }}>
            <Text style={{ fontSize: 20 }}>Vsetko je v poriadku,</Text>
            <Text style={{ fontSize: 20 }}>nemate ziadne nove ziadosti</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 12,
    flex: 1,
    marginTop: 8
  }
});

export default JazdyNadchadzajuce;
