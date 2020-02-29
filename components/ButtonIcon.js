import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const ButtonIcon = props => {

    return (
            <View style={[styles.customButon, props.style]}>
                <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
                    <View><Icon name={props.iconName} size={32}/></View>
                </TouchableOpacity>
            </View>
    );



};

const styles = StyleSheet.create({
    customButon: {
        marginVertical: 20,
        alignItems: 'center',
        paddingVertical: 5,
        margin: 5,
        height: 40,
        width: 80,
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,


    },

});

export default ButtonIcon;