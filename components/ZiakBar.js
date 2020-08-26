import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const ZiakBar = props => {
  return (
    <View style={styles.instruktorLayout}>
      <Image style={styles.logo} source={require('../Images/profil.png')} />
      <View style={styles.menoInstruktora}>
        <Text style={{ fontSize: 20 }}>Adam Martiska</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  instruktorLayout: {
    flexDirection: 'row'
  },
  logo: {
    borderColor: 'black',
    borderRadius: 10,
    width: 35,
    height: 35
  },
  menoInstruktora: {
    marginLeft: 15,
    paddingVertical: 5
  }
});

export default ZiakBar;
