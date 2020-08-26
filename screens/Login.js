import { create } from 'apisauce';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import AuthButton from '../components/AuthButton';
import * as authActions from '../store/actions/auth';
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

const Login = props => {
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const info = useSelector(state => state.auth.info);
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
    if (error) {
      setShowAlert(true);
      error;
    }
  }, [error]);

  const authHandler = async () => {
    Keyboard.dismiss();
    let action;
    action = authActions.loginmyapp(
      formState.inputValues.email,
      formState.inputValues.password
    );

    //setIsLoading(true);
    setError(null);
    const where = await dispatch(action);
    const { token, relations, schoolCount } = where;
    await dispatch(authActions.reduxdata(token, relations[0].relationID));
    //   const { token, relations, schoolCount } = where;
    //   token, schoolCount;
    //   if (relations.length > 0) {
    //     if (schoolCount === 1 && relations[0].information === 'completed') {
    //       await dispatch(authActions.headerData(relations[0].relationID));
    //       props.navigation.navigate('CompletedZiak');
    //     }
    //     if (relations[0].information === 'active' && schoolCount === 1) {
    //       await dispatch(authActions.reduxdata(token, relations[0].relationID));
    //       if (relations[0].role === 'INSTRUCTOR') {
    //         props.navigation.navigate('SignedInInstructor');
    //       } else if (relations[0].role === 'STUDENT') {
    //         props.navigation.navigate('SignedInZiak');
    //       } else if (relations[0].role === 'OWNER') {
    //         props.navigation.navigate('SignedInOwner');
    //       }
    //     }
    //     if (
    //       schoolCount > 1 &&
    //       relations.map(item => item.information !== 'active')
    //     ) {
    //       props.navigation.navigate('VyberScreen');
    //     }
    //   } else {
    //     props.navigation.navigate('Vyber');
    //   }
    // } catch (err) {
    //   setError(err.message);
    //   err.message;
    //   setIsLoading(false);
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
  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Image style={styles.logo} source={require('../Images/afto.png')} />

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
          <AuthButton
            title="Prihlasit"
            isLoading={isLoading}
            onPress={authHandler}
            containerStyle={{ marginTop: hp('0%') }}
          />
          <AuthButton
            title="Registracia"
            onPress={() =>
              props.navigation.navigate({
                routeName: 'Registracia'
              })
            }
            containerStyle={{ marginBottom: hp('0.6%') }}
          />
          <AuthButton
            title="Zabudnute heslo"
            onPress={() =>
              props.navigation.navigate({
                routeName: 'ZabudnuteHeslo'
              })
            }
            fontStyle={{ fontSize: hp('2.5%'), color: Colors.sedaTmava }}
            buttonStyle={styles.forgotPasswordButton}
          />
        </View>
      </TouchableWithoutFeedback>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Nastala chyba"
        message={`${error}`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        contentContainerStyle={{ width: wp('75%'), height: hp('22%') }}
        showConfirmButton={true}
        confirmText="Skusit znova"
        confirmButtonColor={'#7a7a7a'}
        onConfirmPressed={hideAlert}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('8%')
  },
  logo: {
    marginBottom: hp('5%'),
    width: wp('40%'),
    height: hp('13%')
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
  forgotPasswordButton: {
    elevation: 2,
    width: wp('40%'),
    height: hp('5%'),
    borderRadius: hp('1%'),
    backgroundColor: '#e0e0e0'
  }
});

export default Login;
