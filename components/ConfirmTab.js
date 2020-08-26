import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const CustomButton = props => {
  return (
    <View style={[styles.customButon, props.style]}>
      <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
        <View style={{ marginRight: 10 }}>
          <Image style={styles.logo} source={require('../Images/profil.png')} />
        </View>
        <Text style={{ fontSize: 18 }}>{props.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={props.onPressAccept}>
          <View style={{ marginHorizontal: 15 }}>
            <Icon
              name="ios-checkmark-circle-outline"
              size={28}
              color={Colors.carhartt}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onPressDecline}>
          <View style={{}}>
            <Icon
              name="ios-close-circle-outline"
              size={28}
              color={Colors.darkRed}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginHorizontal: 15,
    marginVertical: 8,
    width: '90%'
  },
  logo: {
    width: 20,
    height: 20
  }
});

export default CustomButton;
