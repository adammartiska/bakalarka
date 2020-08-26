import React from 'react';
import {
  ActivityIndicator,
  Image,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

const TestScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Test screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default TestScreen;

