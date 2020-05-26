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
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import RezervovanaJazda from '../../components/RezervovanaJazda';
import NadchadzajuceInstruktor from '../../components/NadchadzajuceInstruktor';
import AbsolvovanePending from '../../components/AbsolvovanePending';
import { create } from 'apisauce';
import { useSelector } from 'react-redux';
import { useFetchGet } from '../../hooks/useFetchGet';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';

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
        console.log(res);
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
    console.log(response);
  };

  const declineHandler = async id => {
    const response = await api.delete(
      '/instructor/removeRides',
      {},
      { data: [{ id: id }] }
    );
    console.log(response);
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
              onPressDecline={() => declineHandler(item.id)}
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
  },

  riadokJazdy: {
    borderWidth: 2,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: Colors.sedatmava,
    padding: 10,
    marginTop: 8,
    width: '60%',
    marginHorizontal: 15
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

export default JazdyNadchadzajuce;
