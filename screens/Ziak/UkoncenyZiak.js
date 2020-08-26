import { create } from 'apisauce';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AbsolvovaneZiak from '../../components/AbsolvovaneZiak';
import * as authActions from '../../store/actions/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const UkoncenyZiak = props => {
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/relationship/completedRelationship');
        if (res.ok) {
          const { email, endDate, fullName, phoneNumber } = res.data.body;
          await dispatch(
            authActions.userInfo({
              email: email,
              fullName: fullName,
              phoneNumber: phoneNumber,
              ridesCompleted: 15,
              startDate: endDate
            })
          );
          setData(res.data.body.rides);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <SafeAreaView
        style={{ marginBottom: hp('4%'), marginHorizontal: wp('5%') }}
      >
        {isLoading ? (
          <View
            style={{
              marginTop: hp('25%'),
              alignItems: 'center'
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          data.map(item => (
            <AbsolvovaneZiak
              key={item.id.toString()}
              date={moment(item.date).format('DD.MM.YYYY')}
              time={item.time}
              rideState={item.status}
              instructorName={item.instructor}
            />
          ))
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1
  }
});

export default UkoncenyZiak;
