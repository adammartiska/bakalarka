import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import InstruktorBar from './InstruktorBar';
import RideState from './RideState';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const AbsolvovaneInstruktor = props => {
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
        <Icon name="ios-flag" size={25} />
        <View>
          <Text style={styles.velky}>{props.cas}</Text>
        </View>
      </View>
      <View style={{ marginTop: 7, alignItems: 'center' }}>
        <InstruktorBar name={props.name} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <RideState state={props.state} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    elevation: 1,
    justifyContent: 'center',
    marginVertical: hp('1.5%'),
    borderWidth: 2,
    borderColor: Colors.sedatmava,
    padding: 8
  },
  velky: {
    textAlign: 'center',
    fontSize: 18
  }
});

export default AbsolvovaneInstruktor;
