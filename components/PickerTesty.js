import React, { useState } from 'react';
import {Picker, View, StyleSheet} from 'react-native';



const PickerTesty = props => {
    const testy = 
        [
        {label : 'Prvy test', value : 'Prvy' },
        {label : 'Druhy test', value : 'Druhy'},
        {label : 'Treti test', value : 'Treti'},
        {label : 'Stvrty test', value : 'Stvrty'}
        ]
    
    return (
        <View>
        <Picker
        selectedValue={props.selectedValue}
        style={{height: 80, width: 150}}
        onValueChange={props.onValueChange}
        >
        {
            testy.map((item) => {
                return (
                    <Picker.Item label={item.label} value={item.value} key = {item.value}/>
                );
            })
        }
      </Picker>
      </View>
    );
}



export default PickerTesty;