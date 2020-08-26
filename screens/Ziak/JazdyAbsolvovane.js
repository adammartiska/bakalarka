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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import AbsolvovaneZiak from '../../components/AbsolvovaneZiak';
import { create } from 'apisauce';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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
            marginTop: hp('25%'),
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
            marginTop: hp('35%')
          }}
        >
          <Text
            style={{
              fontSize: hp('3.25%'),
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
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginBottom: hp('3%'),
    marginTop: hp('1%'),
    marginHorizontal: wp('4%')
  }
});

export default JazdyAbsolvovane;
