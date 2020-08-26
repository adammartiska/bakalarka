import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const ObjednajButton = props => {
  return (
    <View style={[styles.customButon, props.styles]}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View style={{ marginBottom: hp('0.7%') }}>
          <Text style={styles.textInButton}>{props.name}</Text>
        </View>
        <View>
          <Text style={styles.textInButtonMaly}>{props.datum}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('55%'),
    height: hp('9%'),
    backgroundColor: Colors.primaryColor,
    borderWidth: 1,
    borderColor: Colors.sedatmava,
    borderRadius: hp('1%'),
    elevation: 12
  },
  textInButton: {
    fontSize: hp('3%'),
    color: 'white',
    //fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  textInButtonMaly: {
    fontSize: hp('2%'),
    color: 'white',
    //fontFamily: 'open-sans-bold',
    textAlign: 'center'
  }
});

export default ObjednajButton;
