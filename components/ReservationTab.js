import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InstruktorBar from './InstruktorBar';
import TimeButton from './TimeButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const ReservationTab = props => {
  const [selected, setSelected] = useState('');
  const handler = time => {
    props.onChildClick(time);
    setSelected(time.time);
  };
  return (
    <View style={{}}>
      <View style={styles.instruktor}>
        <InstruktorBar name={props.instructorName} />
      </View>
      <View style={styles.screen}>
        {props.data.map(item => {
          return (
            <TimeButton
              key={`${props.instructorName}-${item.time}`}
              name={item.time}
              onPress={() => handler(item)}
              styles={
                selected === item.time && {
                  elevation: 12
                }
              }
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: hp('2%')
  },
  instruktor: {
    marginLeft: wp('2%'),
    marginBottom: hp('1.5%')
  }
});

export default ReservationTab;
