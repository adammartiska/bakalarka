import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';



const TimeButton = props => {

    return (
            <View style={[styles.customButon, props.styles]}>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
                    <Text style={styles.textInButton}>{props.name}</Text>
                </TouchableOpacity>
            </View>
    );



};

const styles = StyleSheet.create({
    customButon: {
        margin: 5,
        height: 30,
        width: '22%',
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

export default TimeButton;