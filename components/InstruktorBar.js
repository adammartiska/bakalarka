import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { juxt } from 'ramda';

const InstruktorBar = props => {
  return (
    <View style={styles.instruktorLayout}>
      <Image style={styles.logo} source={require('../Images/instruktor.jpg')} />
      <View style={styles.menoInstruktora}>
        <Text style={{ fontSize: hp('3%') }}>{props.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instruktorLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%')
  },
  logo: {
    borderColor: 'black',
    borderRadius: 10,
    width: wp('10%'),
    height: hp('5.5%')
  },
  menoInstruktora: {
    marginLeft: wp('4%')
  }
});

export default InstruktorBar;
