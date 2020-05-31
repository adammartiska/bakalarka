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
import AwesomeAlert from 'react-native-awesome-alerts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
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
const mapStateToProps = state => {
  console.log('zbehnemapstate');
  return {
    info: state
  };
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
      console.log(error);
    }
  }, [error]);

  const authHandler = async () => {
    Keyboard.dismiss();
    let action;
    console.log('Pod tymto email');
    console.log(formState.inputValues.password);
    action = authActions.loginmyapp(
      formState.inputValues.email,
      formState.inputValues.password
    );

    setIsLoading(true);
    setError(null);

    try {
      const where = await dispatch(action);
      const { token, relations, schoolCount } = where;
      console.log(token, schoolCount);
      if (relations.length > 0) {
        if (schoolCount === 1 && relations[0].information === 'completed') {
          await dispatch(authActions.headerData(relations[0].relationID));
          props.navigation.navigate('CompletedZiak');
        }
        if (relations[0].information === 'active' && schoolCount === 1) {
          await dispatch(authActions.reduxdata(token, relations[0].relationID));
          if (relations[0].role === 'INSTRUCTOR') {
            props.navigation.navigate('SignedInInstructor');
          } else if (relations[0].role === 'STUDENT') {
            console.log('naviguje ziak');
            props.navigation.navigate('SignedInZiak');
          } else if (relations[0].role === 'OWNER') {
            console.log('navigujem owner');
            props.navigation.navigate('SignedInOwner');
          }
        }
        if (
          schoolCount > 1 &&
          relations.map(item => item.information !== 'active')
        ) {
          console.log('preco som tu');
          props.navigation.navigate('VyberScreen');
        }
      } else {
        props.navigation.navigate('Vyber');
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
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

          <View style={styles.loginButton}>
            {isLoading ? (
              <View style={{ paddingTop: 10, textAlign: 'center' }}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.3} onPress={authHandler}>
                <Text style={styles.inputLoginText}>Prihlasit</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => {
              props.navigation.navigate({
                routeName: 'Registracia'
              });
            }}
          >
            <View
              style={{
                marginTop: 12,
                width: 200,
                height: 40,
                borderRadius: 10,
                backgroundColor: Colors.primaryColor,
                elevation: 5,
                marginHorizontal: 10,
                elevation: 6
              }}
            >
              <Text style={styles.inputLoginText}>Registracia</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => {
              props.navigation.navigate({
                routeName: 'ZabudnuteHeslo'
              });
            }}
          >
            <View
              style={{
                marginTop: 12,
                width: 150,
                height: 30,
                borderRadius: 10,
                backgroundColor: Colors.sedatmava,
                marginHorizontal: 10
              }}
            >
              <Text style={styles.inputLoginTextBlack}>Zabudnute heslo</Text>
            </View>
          </TouchableOpacity>
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
        contentContainerStyle={{ width: '75%', height: '25%' }}
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
    marginHorizontal: 30
  },
  logo: {
    marginBottom: 30,
    width: 200,
    height: 100
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
    elevation: 6
  }
});

export default Login;
