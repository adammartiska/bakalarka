import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from './DetailJazdy';
import InstruktorBar from './InstruktorBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

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
          <InstruktorBar name={props.instructorName} />
          <View style={{ paddingTop: hp('1.4%') }}>
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
    marginTop: hp('1%')
  },

  riadokJazdy: {
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    marginTop: hp('1.8%')
  },
  vysunute: {
    backgroundColor: '#f5f5f5'
  },

  title: {
    fontSize: hp('2.75%')
  }
});

export default AbsolvovaneZiak;
