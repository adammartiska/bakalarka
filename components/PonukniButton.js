import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const PonukniButton = props => {
  return (
    <View style={[styles.customButon, props.styles]}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View
          style={{
            marginTop: 6
          }}
        >
          <Text style={styles.textInButton}>Ponukni jazdy</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    alignItems: 'center',
    width: 185,
    margin: 0,
    height: 42,
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

export default PonukniButton;
