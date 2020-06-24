import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const CustomButton = props => {
  return (
    <View style={[styles.customButon, props.style]}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <View>
            <Icon name={props.iconName} size={hp('4.5%')} />
          </View>
          <Text style={styles.textInButton}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    justifyContent: 'center',
    marginVertical: hp('2.5%'),
    height: hp('6%'),
    width: wp('45%'),
    backgroundColor: '#DDDDDD',
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
    textAlign: 'center'
  }
});

export default CustomButton;
