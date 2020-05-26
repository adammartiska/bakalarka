import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from './DetailJazdy';
import { useState } from 'react';
import Colors from '../constants/Colors';
import InstruktorBar from './InstruktorBar';

const AbsolvovaneZiak = props => {
  const [showDetails, setShowDetails] = useState(false);
  const calculateColor = state => {
    switch (state) {
      case 'FINISHED':
        return { backgroundColor: '#e6ffee' };
      case 'PENDING':
        return { backgroundColor: '#feffc9' };
      case 'CANCELLED':
        return { backgroundColor: '#ffe6e6' };
    }
  };

  const prelozStav = stav => {
    switch (stav) {
      case 'FINISHED':
        return 'Uspesne ukoncena';
      case 'PENDING':
        return 'Caka sa na potvrdenie';
      case 'CANCELLED':
        return 'Zrusena';
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setShowDetails(prevState => !prevState);
      }}
    >
      <View style={styles.screen}>
        <View style={[styles.riadokJazdy, calculateColor(props.rideState)]}>
          <View>
            <InstruktorBar name={props.instructorName} />
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{props.date}</Text>
          </View>
        </View>

        {showDetails && (
          <View style={styles.vysunute}>
            <DetailJazdy
              time={props.time}
              rideState={prelozStav(props.rideState)}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 8
  },

  riadokJazdy: {
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 8,
    marginHorizontal: 16
  },
  vysunute: {
    backgroundColor: '#fff',
    marginTop: 0,
    marginHorizontal: 16
  },

  title: {
    fontSize: 18
  },
  logo: {
    width: 22,
    height: 22
  }
});

export default AbsolvovaneZiak;
