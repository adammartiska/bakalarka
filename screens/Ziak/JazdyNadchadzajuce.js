import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState, useEffect } from 'react';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import RezervovanaJazda from '../../components/RezervovanaJazda';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector } from 'react-redux';
import { create } from 'apisauce';
import { useFetchGet } from '../../hooks/useFetchGet';
import moment from 'moment';

const JazdyNadchadzajuce = props => {
  const [zvolenaCancel, setZvolenaCancel] = useState({
    date: '',
    time: '',
    id: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const [gotResponse, setGotResponse] = useState(false);
  const [error, setError] = useState('');
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
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await api.get('/student/getReservedRides');
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const zmazHandler = async id => {
    const response = await api.post(`/student/cancelRide/${id}`);
    console.log(response);
    if (response.ok) {
      setGotResponse(true);
    }
    // tu budem musiet znova volat api call na data zo servera
    const newData = data.filter(item => item.id !== id);
    setData(newData);
    setShowAlert(false);
  };
  const showAlertfunction = item => {
    const { date, time, id } = item;
    setZvolenaCancel({
      date: date,
      time: time,
      id: id
    });
    setShowAlert(true);
    console.log(zvolenaCancel);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };
  // const message = `Naozaj si prajete zrusit jazdu ${item.title}?`
  //!!!! chcem uchovavat zvolenu jazdu v stave objekte kvoli alertu!
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
            Nemate ziadne nove rezervovane jazdy
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <RezervovanaJazda
              datum={moment(item.date).format('DD.MM.YYYY')}
              cas={item.time}
              id={item.id}
              onPress={() => showAlertfunction(item)}
            />
          )}
        />
      )}

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={gotResponse ? 'Takyto text' : 'Zrusenie rezervacie'}
        message={
          gotResponse
            ? 'Takyto text'
            : `Naozaj si prajete zrusit jazdu \n         ${zvolenaCancel.date} - ${zvolenaCancel.time}?`
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Nie"
        confirmText="Ano, zrusit jazdu"
        confirmButtonColor="#000"
        cancelButtonColor={'#7a7a7a'}
        onCancelPressed={hideAlert}
        onConfirmPressed={() => zmazHandler(zvolenaCancel.id)}
      />
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
