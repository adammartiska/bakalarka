import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const TimeButtonCheck = ({ isChecked, value, onPress, label }) => {
  return (
    <View style={styles.customButon}>
      <CheckBox
        checked={isChecked}
        value={value}
        onPress={onPress}
        checkedColor={Colors.primaryColor}
        containerStyle={{ padding: 0 }}
      />

      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Text style={styles.textInButton}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customButon: {
    flexDirection: 'row',
    marginHorizontal: wp('1.5%'),
    marginVertical: hp('1%'),
    height: hp('4%'),
    width: wp('27.5%'),
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  textInButton: {
    fontSize: hp('3%')
  }
});

export default TimeButtonCheck;
