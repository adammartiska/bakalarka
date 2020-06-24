import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

const RideState = props => {
  return (
    <View
      style={[
        styles.customButon,
        props.state === 'absolvovana' ? styles.zelena : styles.cervena
      ]}
    >
      <View>
        <Text style={styles.textInButton}>{props.state}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    marginTop: 10,
    marginBottom: 3,
    height: 30,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 5,
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
  },
  zelena: {
    backgroundColor: Colors.lightGreen
  },
  cervena: {
    backgroundColor: Colors.lightRed,
    width: '30%'
  }
});

export default RideState;
