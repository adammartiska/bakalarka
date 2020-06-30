import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const ButtonIcon = props => {
  return (
    <View style={[styles.customButon, props.style]}>
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
        <View>
          <Icon name={props.iconName} size={32} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    marginVertical: 20,
    alignItems: 'center',
    paddingVertical: 5,
    margin: 5,
    height: 40,
    width: 80,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  }
});

export default ButtonIcon;
