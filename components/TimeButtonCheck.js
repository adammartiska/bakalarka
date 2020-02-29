import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { CheckBox } from 'react-native-elements'



const TimeButtonCheck = props => {
    const [ceknute, setCeknute] = useState(true);
    const array = ["10:00"];
    const key = ["15:00"];
    const checkHandler = (id) => {
        setCeknute(!ceknute);
        if(!ceknute) {
            props.dajPole(array, key);
        }
        else
        {
            console.log("filtruj");
        }

    };
    return (
            <View style={styles.customButon}>
            <CheckBox
            checked = {props.isChecked}
            value = {props.value}
            onPress = {props.onPress}
            checkedColor = {Colors.primaryColor}
            containerStyle = {{padding:0,}}
            
            />

                <TouchableOpacity activeOpacity={0.5}>
                    <Text 
                    style={styles.textInButton}>
                    {props.label}
                    </Text>
                </TouchableOpacity>
            </View>
    );



};

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    customButon: {
        flexDirection: 'row',
        margin: 5,
        height: 30,
        width: '30%',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,


    },
    textInButton: {
        fontSize: 20,
        color: 'black',
        //fontFamily: 'open-sans-bold',
        //textAlign: 'center',

    },


});

export default TimeButtonCheck;