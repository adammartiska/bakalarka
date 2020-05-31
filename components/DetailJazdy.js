import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailJazdy = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.bunky}>
        <Text>Cas jazdy</Text>
        <Text>{props.time}</Text>
      </View>
      <View style={styles.bunky}>
        <Text>Stav jazdy</Text>
        <Text>{props.rideState}</Text>
      </View>
    </View>
  );
};

export default DetailJazdy;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#aaa'
  },

  bunky: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 25
  }
});
