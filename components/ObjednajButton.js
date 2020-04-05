import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ObjednajButton = props => {
  return (
    <View style={[styles.customButon, props.styles]}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 2,
            marginVertical: 3
          }}
        >
          <Text style={styles.textInButton}>{props.name}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 2
          }}
        >
          <Text style={styles.textInButtonMaly}>{props.datum}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    alignItems: 'center',
    width: 220,
    margin: 0,
    height: 50,
    backgroundColor: Colors.primaryColor,
    borderWidth: 1,
    borderColor: Colors.sedatmava,
    borderRadius: 4,
    elevation: 12
  },
  textInButton: {
    fontSize: 20,
    color: 'white',
    //fontFamily: 'open-sans-bold',
    textAlign: 'center'
  },
  textInButtonMaly: {
    fontSize: 8,
    color: 'white',
    //fontFamily: 'open-sans-bold',
    textAlign: 'center'
  }
});

export default ObjednajButton;
