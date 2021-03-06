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



const Login = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
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
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        
        setIsLoading(true);
        setError(null);       

        try {
        await dispatch(action);
        props.navigation.navigate('SignedIn');
        }   catch(err) {
            console.log(err)
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

    <Image 
    style={styles.logo}
    source={require('../Images/afto.png')}
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
    id="password"
    placeholder="heslo"
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
    <Text style={styles.inputLoginText}>Login</Text>       
    </TouchableOpacity>)}
    </View>
    <TouchableOpacity
    activeOpacity={0.3}
    onPress={() => {props.navigation.navigate({
        routeName: 'Registracia'
    })
    }}>
    <View style={{marginTop: 12,
        width: 200,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primaryColor,
        elevation: 5,
        marginHorizontal: 10,
        elevation: 6,}}>
    <Text style={styles.inputLoginText}>Registracia</Text>
    </View>   
    </TouchableOpacity>
    <TouchableOpacity
    activeOpacity={0.3}
    onPress={() => {props.navigation.navigate({
        routeName: 'ZabudnuteHeslo'
    })
    }}>
    <View style={{marginTop: 12,
        width: 150,
        height: 30,
        borderRadius: 10,
        backgroundColor: Colors.sedatmava,
        elevation: 5,
        marginHorizontal: 10,
        elevation: 6,}}>
    <Text style={styles.inputLoginTextBlack}>Zabudnute heslo</Text>
    </View>   
    </TouchableOpacity>
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

    inputLoginText: {
        paddingVertical: 3,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'

    },
    inputLoginTextBlack: {
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: 14,
        color: 'black'

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

export default Login;

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
