import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton = props => {
  return (
    <View style={[styles.customButon, props.styles]}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View style>
          <Icon name={props.iconName} size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    margin: 5,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  textInButton: {
    fontSize: 20,
    color: 'black'
    //fontFamily: 'open-sans-bold',
    //textAlign: 'center',
  }
});

export default IconButton;
