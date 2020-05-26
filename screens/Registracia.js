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
  ScrollView,
  Picker
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [errors, setErrors] = useState([]);
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
