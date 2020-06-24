import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const IconButton = props => {
  return (
    <View style={[styles.customButon, props.styles]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
        hitSlop={{
          left: wp('5%'),
          right: wp('5%'),
          top: hp('3%'),
          bottom: hp('3%')
        }}
      >
        <View style>
          <Icon name={props.iconName} size={hp('4.5%')} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    margin: 5,
    height: hp('6%'),
    width: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  }
});

export default IconButton;
