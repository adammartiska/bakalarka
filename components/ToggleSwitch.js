import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Colors from '../constants/Colors';

const ToggleSwitch = props => {
    return (
    <View style = {styles.Switchcontainer}>
    <View style={{marginHorizontal: 20,}}>
    <Text style={styles.textSwitch}>{props.text}</Text>
    </View>

<Switch 
trackColor = {{true: '#ccc', false:'#ccc'}} //draha
thumbColor = {Colors.primaryColor} //gulicka
onValueChange = {props.onChange}
value = {props.state}
/>

</View>

    );
};

const styles = StyleSheet.create({
    Switchcontainer: {
        marginVertical: 20,
        marginHorizontal: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
      textSwitch: {
          fontSize: 18
      }

});

export default ToggleSwitch;