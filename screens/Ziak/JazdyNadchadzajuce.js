import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import RezervovanaJazda from '../../components/RezervovanaJazda';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector } from 'react-redux';

const JazdyNadchadzajuce = props => {
  const [zvolenaCancel, setZvolenaCancel] = useState({
    date: '',
    time: '',
    id: ''
  });
  const selected = useSelector(state => state.auth.phoneNumber);
  const [DATA, setDATA] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '12.3.2018',
      time: '15:00'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '5.4.2018',
      time: '12:00'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '18.4.2018',
      time: '10:00'
    }
  ]);
  const [showAlert, setShowAlert] = useState(false);

  const zmazHandler = id => {
    const newData = DATA.filter(item => item.id !== id);
    setDATA(newData);
    setShowAlert(false);
  };
  const showAlertfunction = (date, time, id) => {
    setZvolenaCancel({
      date: date,
      time: time,
      id: id
    });
    setShowAlert(true);
    console.log(zvolenaCancel);
    console.log(selected)
  };

  const hideAlert = () => {
    setShowAlert(false);
  };
  // const message = `Naozaj si prajete zrusit jazdu ${item.title}?`
  //!!!! chcem uchovavat zvolenu jazdu v stave objekte kvoli alertu!
  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <RezervovanaJazda
            datum={item.title}
            cas={item.time}
            id={item.id}
            onPress={() => showAlertfunction(item.title, item.time, item.id)}
          />
        )}
      />
      <View>
        <Text>takze zvolena {selected}</Text>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Zrusenie rezervacie"
        message={`Naozaj si prajete zrusit jazdu \n         ${zvolenaCancel.date} - ${zvolenaCancel.time}?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Nie"
        confirmText="Ano, zrusit jazdu"
        confirmButtonColor="#DD6B55"
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
