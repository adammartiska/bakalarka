import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';


/*

    NEVIEM CI TO CHCEM SPRAVIT SEPARATNE 

    */

const ZmenaMailu= props => {

    return (
        <View style={styles.obalka}> 
        <TextInput 
        id="stareHeslo"
        placeholder="stare heslo"                
        value={props.novyMail}
        onChangeText={props.onChangeText}
        required
        secureTextEntry={true}
        style={[styles.input, {marginTop: 15}]}
        /> 
        <TextInput 
        id="noveHeslo"
        placeholder="nove heslo"
        value={props.novyMailZnovu}
        onChangeText={props.onChangeText}
        required
        secureTextEntry={true}
        style={styles.input}
        />
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