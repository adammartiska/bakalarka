import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InstruktorBar from '../components/InstruktorBar';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const NadchadzajuceInstruktor = props => {
  return (
    <View style={[styles.default, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomWidth: 2,
          borderBottomColor: Colors.sedatmava
        }}
      >
        <View>
          <Text style={styles.velky}>{props.datum}</Text>
        </View>
        <Icon name="ios-flag" size={wp('7%')} />
        <View>
          <Text style={styles.velky}>{props.cas}</Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: wp('3%'),
          marginTop: hp('0.75%'),
          alignItems: 'center'
        }}
      >
        <InstruktorBar name={props.name} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    elevation: 1,
    justifyContent: 'center',
    marginVertical: hp('2%'),
    borderWidth: 2,
    borderColor: Colors.sedatmava,
    padding: wp('2.5%')
  },
  velky: {
    textAlign: 'center',
    fontSize: hp('2.75%')
  }
});

export default NadchadzajuceInstruktor;
