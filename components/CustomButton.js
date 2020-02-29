import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const CustomButton = props => {

    return (
            <View style={[styles.customButon, props.style]}>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
                    <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                    <View><Icon name={props.iconName} size={30}/></View>
                    <Text style={styles.textInButton}>{props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
    );



};

const styles = StyleSheet.create({
    customButon: {
        paddingVertical: 5,
        marginVertical: 20,
        height: 40,
        width: 180,
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
        textAlign: 'center'
        //fontFamily: 'open-sans-bold',
        //textAlign: 'center',

    },


});

export default CustomButton;