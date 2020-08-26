import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileRow = ({ iconName, information }) => {
  return (
    <View style={styles.input}>
      <View style={{ paddingBottom: 10 }}>
        <Icon name={iconName} size={wp('7.5%')} />
      </View>
      <View style={{ paddingTop: 5 }}>
        <Text style={{ fontSize: hp('2.25%') }}>{information}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    width: wp('80%'),
    height: hp('4.5%'),
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    justifyContent: 'space-between'
  }
});

export default ProfileRow;
