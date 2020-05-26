import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import TimeButton from '../../components/TimeButton';
import { Card, ListItem } from 'react-native-elements';
//import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import CustomButon from '../../components/CustomButton';
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment';
import KickTab from '../../components/KickTab';

const KickScreen = props => {
  const [showAlert, setShowAlert] = useState(false);
  const hideAlert = () => {
    setShowAlert(false);
  };
  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>
          Nizsie sa vam zobrazuju ziaci, ktori su vo vasej autoskole dlhsie
          neaktivni
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors.inActive,
            textAlign: 'center'
          }}
        >
          Po kliknuti na ikonu bude dany ziak z vasej autoskoly vyhodeny
        </Text>
      </View>
      <KickTab
        name="Ivana Bihariova"
        onPressDecline={() => setShowAlert(true)}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Vyhodenie ziaka"
        message="Skutocne si prajete vyhodit daneho ziaka z vasej autoskoly?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Ano"
        cancelText="Nie"
        confirmButtonColor={Colors.carhartt}
        cancelButtonColor="#7a7a7a"
        onCancelPressed={hideAlert}
        onConfirmPressed={hideAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 20,
    flex: 1
  },

  logo: {
    marginTop: 20,
    height: 100,
    width: 100
  },
  ciara: {
    borderWidth: 1,
    borderColor: Colors.sedatmava,
    marginVertical: 15
  },
  heading: {
    marginVertical: 20
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: 300,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20
  },

  customButon: {
    margin: 5,
    height: 30,
    width: '20%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  text: {
    fontSize: 20,
    color: 'black'
    //textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '85%',
    height: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    justifyContent: 'space-between'
  }
});

export default KickScreen;
