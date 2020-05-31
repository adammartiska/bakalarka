import { create } from 'apisauce';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Colors from '../constants/Colors';
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

const Registracia = props => {
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const keyboardVerticalOffset = 10;
  const [showAlert, setShowAlert] = useState(false);
  const [rola, setSelectedRola] = useState('Student');
  const [alertTitle, setAlertTitle] = useState('');
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
      setShowAlert(true);
    }
  }, [error]);

  const allAreFormsFilled = (
    fullName,
    email,
    phoneNumber,
    password,
    matchingPassword
  ) => {
    if (
      fullName === '' ||
      email === '' ||
      phoneNumber === '' ||
      password.length === '' ||
      matchingPassword.length === ''
    ) {
      return true;
    }
    return false;
  };
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
        roles: rola
      });
      setIsLoading(false);
      console.log(response);
      if (response.ok) {
        setAlertTitle('Uspesna registracia');
        setShowAlert(true);
      } else {
        setAlertTitle('Nastala chyba');
        if (
          allAreFormsFilled(
            formState.inputValues.fullName,
            formState.inputValues.email,
            formState.inputValues.phoneNumber,
            formState.inputValues.password,
            formState.inputValues.matchingPassword
          )
        ) {
          setError('Vyplne prosim vsetky polia formularov');
        } else if (response.status === 400) {
          setError(response.data.subErrors[0].message);
        }
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
    <KeyboardAwareScrollView extraScrollHeight={50} extraHeight={30}>
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
        <View style={styles.pickerOut}>
          <Picker
            selectedValue={rola}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedRola(itemValue)}
            itemStyle={{ textAlign: 'center' }}
          >
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Instruktor" value="instructor" />
            <Picker.Item label="Majitel" value="owner" />
          </Picker>
        </View>
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
        <AwesomeAlert
          overlayStyle={{ flex: 2 }}
          show={showAlert}
          title={alertTitle}
          message={error}
          cancelText="Spat"
          confirmText="Prihlasit ma"
          showProgress={false}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={error === null}
          cancelButtonColor={'#7a7a7a'}
          confirmButtonColor={Colors.carhartt}
          onCancelPressed={hideAlert}
          onConfirmPressed={() => props.navigation.navigate('Login')}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingBottom: 2
  },
  logo: {
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
  picker: {
    height: 40,
    width: 200,
    justifyContent: 'center'
  },
  pickerOut: {
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: (255, 255, 255, 0.9),
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5
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
