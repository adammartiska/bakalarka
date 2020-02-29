import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity, Directions } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";


const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    };
    return state;
};



const ZabudnuteHeslo = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
        },
        inputValidities: {
            email: false,
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error) {
            Alert.alert('Nastala chyba!', error, [{text: 'Okay'}]);
        }

    }, [error]);

    const authHandler = async () => {
        let action;

        action = authActions.forgotpass(
            formState.inputValues.email,
        );
        
        setIsLoading(true);
        setError(null);
        

        try {
        await dispatch(action);
        setIsEmail(true);
        setIsLoading(false);
        //props.navigation.navigate('Login');
        }   catch(err) {
            setError(err.message);
            setIsLoading(false);
        }

    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchFormState]
    );

    return (
    <KeyboardAvoidingView style = {{flex: 1}}
     behavior='padding'
     enabled>
    <TouchableWithoutFeedback onPress={
        () => {Keyboard.dismiss();}}>
    <View style={styles.container}> 
    <View style={{marginVertical: 5}}>
    <Text>Zadajte e-mail pre obnovu hesla</Text>
    </View>
    <Input 
    id="email"
    placeholder="e-mail"
    keyboardType={'email-address'}
    required
    email
    onInputChange={inputChangeHandler}
    />

    <View style = {styles.loginButton}>
    {(isLoading) ? (<View style = {{paddingTop: 10,
        textAlign: 'center',}}><ActivityIndicator size='small' color='white'/></View>) :
         (
    <TouchableOpacity
    activeOpacity={0.3}
    onPress={authHandler}
    >    
    <Text style={styles.inputLoginText}>Odosli</Text>       
    </TouchableOpacity>)}
    </View>
    <View>
    {(isEmail) && (        
        <View style={styles.sprava}><Text>Na vas e-mail bol poslany link na reset vasho heslo</Text>
        </View>
 )}
    </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

    );

   
    };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,

    },
    logo: {     
        marginVertical: 30,
        width: 200,
        height: 100,
    },
    zarovnaj: {
        alignItems: 'flex-start'
    },

    inputLoginText: {
        paddingVertical: 3,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'

    },
    inputLoginTextBlack: {
        paddingVertical: 3,
        textAlign: 'center',
        fontSize: 22,

    },
    sprava: {
        marginVertical: 10,
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: 10,
        elevation: 6,
    

    },
  
});

export default ZabudnuteHeslo;


        //poznamka prvotny login nejde kvoli tomu, ze potvrdenie inputu mam zatial 
        //nastavene na onblur cize ked stratim focus z daneho textinputu
