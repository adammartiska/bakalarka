import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InstruktorBar from './InstruktorBar';
import TimeButton from './TimeButton';

const ReservationTab = props => {
  const [selected, setSelected] = useState('');
  const handler = time => {
    props.onChildClick(time);
    setSelected(time.time);
  };
  return (
    <View style={{ marginHorizontal: 18 }}>
      <View style={styles.instruktor}>
        <InstruktorBar name={props.instructorName} />
      </View>
      <View style={styles.screen}>
        {props.data.map(item => {
          return (
            <TimeButton
              name={item.time}
              onPress={() => handler(item)}
              styles={
                selected === item.time && {
                  elevation: 15
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
    marginBottom: 25
  },
  instruktor: {
    marginLeft: 8,
    marginBottom: 10
  }
});

export default ReservationTab;
