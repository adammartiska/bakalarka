import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { TouchableOpacity, Directions } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authenticate';
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



const Registracia = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const keyboardVerticalOffset = 50;
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            phonenumber: '',
            email: '',
            phonenumber: '',
            password: '',
            matchingpassword: '',
        },
        inputValidities: {
            phonenumber: false,
            email: false,
            phonenumber: false,
            password: false,
            matchingpassword: false,
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
        action = authActions.signup(
            formState.inputValues.fullname,
            formState.inputValues.email,
            formState.inputValues.phonenumber,
            formState.inputValues.password,
            formState.inputValues.matchingpassword,
            'Student',
        );   
        setIsLoading(true);
        setError(null);       

        try {
        await dispatch(action);
        props.navigation.navigate('Login');
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
    keyboardVerticalOffset= {keyboardVerticalOffset}
     behavior='padding'
     enabled>
     <SafeAreaView style={{flex: 1}}>
    <TouchableWithoutFeedback 
    onPress={() => {Keyboard.dismiss();}}>
    <View style={styles.container}>
    <Image 
    style={styles.logo}
    source={require('../Images/form.png')}
    />
    <Input 
    id="fullname"
    placeholder="meno a priezvisko"
    required
    fullname
    onInputChange={inputChangeHandler}
    />
    <Input 
    id="email"
    placeholder="e-mail"
    keyboardType={'email-address'}
    required
    email
    onInputChange={inputChangeHandler}
    />
    <Input 
    id="phonenumber"
    placeholder="telefonne cislo"
    keyboardType={'numeric'}
    required
    phonenumber
    onInputChange={inputChangeHandler}
    />
    <Input 
    id="password"
    placeholder="heslo"
    onInputChange={inputChangeHandler}
    required
    secureTextEntry={true}
    />
    <Input 
    id="matchingpassword"
    placeholder="heslo znovu"
    onInputChange={inputChangeHandler}
    required
    secureTextEntry={true}
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
    </View>


    
    </TouchableWithoutFeedback>
    </SafeAreaView>
    </KeyboardAvoidingView>

    );

   
    };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 30,
        justifyContent: 'flex-end',
        paddingBottom: 85,
    },
    logo: { 
            marginTop: 45,   
            width: 100,
            height: 200,
            resizeMode: 'contain' 
    },

    inputLoginText: {
        paddingVertical: 3,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff',

    },
    loginButton: {
        marginTop: 12,
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: 10,
        elevation: 6,
    

    },
  
});

export default Registracia;

        //  const odosli = () => {
        //     fetch("https://cc50f32d-6fac-4f8e-9785-490f1aa516e6.mock.pstmn.io/skuslogin", {
        //     method: "POST",
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //       },
        //     body:  JSON.stringify(mojedata)
        //  })
        //  .then(function(response){ 
        //   return response.json();   
        //  })
        //  .then(function(data){ 
        //  console.log(data)
        //  });
        //  };

        //poznamka prvotny login nejde kvoli tomu, ze potvrdenie inputu mam zatial 
        //nastavene na onblur cize ked stratim focus z daneho textinputu
