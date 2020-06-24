import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InstruktorBar from '../components/InstruktorBar';
import Colors from '../constants/Colors';

const NadchadzajuceInstruktor = props => {
  return (
    <View style={[styles.default, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomWidth: 2,
          borderBottomColor: Colors.sedatmava
        }}
      >
        <View>
          <Text style={styles.velky}>{props.datum}</Text>
        </View>
        <Icon name="ios-flag" size={25} />
        <View>
          <Text style={styles.velky}>{props.cas}</Text>
        </View>
      </View>
      <View style={{ marginTop: 7, alignItems: 'center' }}>
        <InstruktorBar name={props.name} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    elevation: 1,
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: Colors.sedatmava,
    padding: 8
  },
  velky: {
    textAlign: 'center',
    fontSize: 18
  }
});

export default NadchadzajuceInstruktor;
