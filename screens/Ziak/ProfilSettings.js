import React, { useState, Component, useReducer, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import  ToggleSwitch  from '../../components/ToggleSwitch';
import CustomButton from '../../components/CustomButton';
import Colors from '../../constants/Colors';
import ButtonIcon from '../../components/ButtonIcon';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value

        }
        return {
            ...state,
            inputValues: updatedValues
        }        
    }
    return state;
    }


const ProfilSettings = props => {
   // const { zmenaHesla, zmenaMailu } = formState.inputValues;
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            zmenaHesla: false,
            zmenaMailu: false,
            stareHeslo: '',
            noveHeslo: '',
            noveHesloZnovu: '',
            novyMail: '',
            novyMailZnovu: '',
            switchState: false,
        }
    });

    const inputChangeHandler =  (inputId, inputValue) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                input: inputId
            })
        }
    


    return (
        <KeyboardAvoidingView style = {{flex: 1}}
     behavior='padding'
     enabled>
    <TouchableWithoutFeedback onPress={
        () => {Keyboard.dismiss();}}>
        <View style={styles.screen}>
        <CustomButton name='Zmen heslo' iconName='ios-key' onPress={() => {dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: !formState.inputValues.zmenaHesla,
            input: 'zmenaHesla'
        })}}/>
        {
            (formState.inputValues.zmenaHesla) && (
                <View style={styles.obalka}> 
                <TextInput 
                id="stareHeslo"
                placeholder="stare heslo"                
                value={formState.inputValues.stareHeslo}
                onChangeText={inputChangeHandler.bind(this, 'stareHeslo')}
                required
                secureTextEntry={true}
                style={[styles.input, {marginTop: 15}]}
                /> 
                <TextInput 
                id="noveHeslo"
                placeholder="nove heslo"
                value={formState.inputValues.noveHeslo}
                onChangeText={inputChangeHandler.bind(this, 'noveHeslo')}
                required
                secureTextEntry={true}
                style={styles.input}
                />
                <TextInput 
                id="noveHesloZnovu"
                placeholder="nove heslo znovu"
                value={formState.inputValues.noveHesloZnovu}
                onChangeText={inputChangeHandler.bind(this, 'noveHesloZnovu')}
                required
                secureTextEntry={true}
                style={[styles.input, {marginBottom: 0}]}
                />
                <ButtonIcon iconName='md-checkmark' onPress={() => {
                    console.log(formState.inputValues.stareHeslo);
                    console.log(formState.inputValues.noveHeslo);
                    console.log(formState.inputValues.noveHesloZnovu);
                }}/>
                </View>) 
                          

        }
        <CustomButton name='Zmen e-mail' iconName='ios-mail' onPress={() => {dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: !formState.inputValues.zmenaMailu,
            input: 'zmenaMailu'
        })}}/>
        {   (formState.inputValues.zmenaMailu) && (<View style={styles.obalka}>
                <TextInput 
                id="novyMail"
                placeholder="novy mail"
                value={formState.inputValues.novyMail}
                onChangeText={inputChangeHandler.bind(this, 'novyMail')}
                required
                style={styles.input}
                />
                <TextInput 
                id="novyMailZnovu"
                placeholder="novy mail znovu"
                value={formState.inputValues.novyMailZnovu}
                onChangeText={inputChangeHandler.bind(this, 'novyMailZnovu')}
                required
                style={[styles.input, {marginBottom: 0}]}
                />
                <ButtonIcon iconName='md-checkmark' onPress={() => {
                    console.log(formState.inputValues.stareHeslo);
                    console.log(formState.inputValues.noveHeslo);
                    console.log(formState.inputValues.noveHesloZnovu);
                }}/>
                </View>) 

        }
        <View>
       <ToggleSwitch 
        state={formState.inputValues.switchState}
        onChange = {(newValue) => {dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: newValue,
            input: 'switchState'
        })}}
        text = 'Push notifikacie ' 
        />
        </View>
        
         
        

        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>


    );

};


const styles = StyleSheet.create({
    screen: {
        marginTop: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    obalka: {
        width: '80%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.sedatmava,



    },
    input: {
        marginVertical: 12,
        marginHorizontal: 20,
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        width: 200,
        height: 40,
        backgroundColor: (255,255,255,0.9),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        
        
        elevation: 2,


    },


});
export default ProfilSettings;
