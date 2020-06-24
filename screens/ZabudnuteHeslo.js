import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Input from '../components/Input';
import AuthButton from '../components/AuthButton';
import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../constants/Colors';
import { create } from 'apisauce';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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

const ZabudnuteHeslo = props => {
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: ''
    },
    inputValidities: {
      email: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    setIsLoading(true);
    setMessage(null);
    const response = await api.post('/authenticate/forgotPassword', {
      userEmail: formState.inputValues.email
    });
    setShowAlert(true);
    setIsLoading(false);
    if (response.ok) {
      setTitle('Uspesne resetovanie hesla!');
      setMessage('Na vas mail bolo zaslane nove docasne heslo');
    } else {
      setTitle('Neuspesne resetovanie hesla');
      setMessage('Ucet s takymto mailom bohuzial neevidujeme');
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
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={{ marginVertical: hp('2%') }}>
            <Text style={{ fontSize: hp('3%') }}>
              Zadajte e-mail pre obnovu hesla
            </Text>
          </View>
          <Input
            id="email"
            placeholder="e-mail"
            keyboardType={'email-address'}
            required
            email
            onInputChange={inputChangeHandler}
          />
          <AuthButton
            title="Odosli"
            onPress={authHandler}
            isLoading={isLoading}
            containerStyle={{ marginTop: hp('5%') }}
          />
        </View>
      </TouchableWithoutFeedback>
      <AwesomeAlert
        show={showAlert}
        title={title}
        message={message}
        cancelText="Spat"
        confirmText="Prihlasit ma"
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelButtonColor={'#7a7a7a'}
        confirmButtonColor={Colors.carhartt}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => props.navigation.navigate('Login')}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('9%')
  }
});

export default ZabudnuteHeslo;
