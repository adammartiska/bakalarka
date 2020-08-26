import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const prelozStav = stav => {
  switch (stav) {
    case 'FINISHED':
      return 'Absolvovana';
      break;
    default:
      return 'Neabsolvovovana';
  }
};

const RideState = props => {
  const state = prelozStav(props.state);
  return (
    <View
      style={[
        styles.customButon,
        state === 'Absolvovana' ? styles.zelena : styles.cervena
      ]}
    >
      <Text style={styles.textInButton}>{state}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('0.5%'),
    height: hp('4.5%'),
    width: wp('40%'),
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: hp('1%'),
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  textInButton: {
    fontSize: hp('2.75%'),
    color: 'black',
    //fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  zelena: {
    backgroundColor: Colors.lightGreen
  },
  cervena: {
    backgroundColor: Colors.lightRed
  }
});

export default RideState;
