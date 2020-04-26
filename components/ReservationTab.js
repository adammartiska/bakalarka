import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import TimeButton from './TimeButton';
import InstruktorBar from './InstruktorBar';

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
  center: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center'
  },
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
  },

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

export default ReservationTab;
