import React, { useState } from 'react';
import { StyleSheet, Text, View, ProgressViewIOSComponent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import InstruktorBar from '../components/InstruktorBar';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const RezervovanaJazda = props => {
  return (
    <View
      style={{ marginBottom: hp('2.5%'), justifyContent: 'center' }}
      id={props.id}
    >
      <View style={styles.screen}>
        <View style={{ width: wp('55%'), flexDirection: 'column' }}>
          <View style={{ marginBottom: hp('1%') }}>
            <InstruktorBar name={props.name} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: wp('3%') }}>
              <Icon name="ios-flag" size={wp('6%')} />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{props.datum}</Text>
            </View>
            <View>
              <Text style={styles.title}>{props.cas}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={props.onPress}>
            <Icon
              name="md-close-circle-outline"
              size={35}
              color={Colors.darkRed}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginTop: hp('1%'),
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: '#eeeeee',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%')
  },
  item: {
    marginHorizontal: wp('6.5%')
  },

  title: {
    fontSize: hp('2.65%')
  }
});

export default RezervovanaJazda;

{
  /* showDetails && (
    <View style={styles.vysunute}>
    
    <Text style={{fontSize: 15}}>
    Naozaj si prajete zavazne zrusit jazdu?
    </Text>
   
    <TimeButton 
    name = 'zrus'
    styles = {{backgroundColor: '#f00', width: '30%', marginTop: 15,}}
    onPress = {props.onPress}/>

    </View>)
*/
}
