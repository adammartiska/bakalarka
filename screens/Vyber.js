import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text
} from 'react-native';

const Vyber = props => {
  return (
    <View style={styles.screen}>
      <View>
        <Text style={{ fontSize: 20 }}>Autoskola BIMA</Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'space-evenly' }}>
          <Text>Adam Martiska</Text>
          <Text>Instruktor</Text>
        </View>
        <Text>Instruktor</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Vyber;
