import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { TouchableOpacity, Directions } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authenticate';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
import { create } from 'apisauce';
import CustomAlert from '../components/CustomAlert';
import AwesomeAlert from 'react-native-awesome-alerts';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const Registracia = props => {
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const keyboardVerticalOffset = 50;
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      phoneNumber: '',
      email: '',
      phoneNumber: '',
      password: '',
      matchingPassword: ''
    },
    inputValidities: {
      phoneNumber: false,
      email: false,
      phoneNumber: false,
      password: false,
      matchingPassword: false
    },
    formIsValid: false
  });
  const hideAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Nastala chyba!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      matchingPassword
    } = formState.inputValues;
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/authenticate/register', {
        email,
        fullName,
        matchingPassword,
        password,
        phoneNumber,
        roles: 'Student'
      });
      setIsLoading(false);
      if (response.ok) {
        setShowAlert(true);
      }
      setShowAlert(true);
      console.log(response);
    } catch (err) {
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
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior="padding"
      enabled
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Image style={styles.logo} source={require('../Images/form.png')} />
            <Input
              id="fullName"
              placeholder="meno a priezvisko"
              required
              fullName
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
              id="phoneNumber"
              placeholder="telefonne cislo"
              keyboardType={'numeric'}
              required
              phoneNumber
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
              id="matchingPassword"
              placeholder="heslo znovu"
              onInputChange={inputChangeHandler}
              required
              secureTextEntry={true}
            />

            <View style={styles.loginButton}>
              {isLoading ? (
                <View style={{ paddingTop: 10, textAlign: 'center' }}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <TouchableOpacity activeOpacity={0.3} onPress={authHandler}>
                  <Text style={styles.inputLoginText}>Odosli</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <AwesomeAlert
          show={showAlert}
          title="Uspesna registracia"
          message="Registracia prebehla uspesne. Teraz sa mozete prihlasit"
          cancelText="Zrusit"
          confirmText="Prihlasit ma"
          showProgress={false}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmButtonColor="#DD6B55"
          onCancelPressed={hideAlert}
          onConfirmPressed={() => props.navigation.navigate('Login')}
        />
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
    paddingBottom: 85
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
    color: '#fff'
  },
  loginButton: {
    marginTop: 12,
    width: 200,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    marginHorizontal: 10,
    elevation: 6
  }
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
