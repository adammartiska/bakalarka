import { create } from 'apisauce';
import React, { useReducer, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useSelector } from 'react-redux';
import ButtonIcon from '../../components/ButtonIcon';
import CustomButton from '../../components/CustomButton';
import Colors from '../../constants/Colors';
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
    return {
      ...state,
      inputValues: updatedValues
    };
  }
  return state;
};

const ProfilSettings = props => {
  const jwt = useSelector(state => state.auth.token);
  const relationId = useSelector(state => state.auth.relationId);
  const [showAlert, setShowAlert] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });

  const [dialogMessage, setDialogMessage] = useState('');
  const changePasswordHandler = async (
    oldPassword,
    newPassword,
    newPasswordAgain
  ) => {
    if (newPassword === newPasswordAgain) {
      const response = await api.post('/user/update/password', {
        newPassword: newPassword,
        oldPassword: oldPassword
      });
      if (response.ok) {
        setDialogTitle('Uspesna zmena hesla');
        setDialogMessage('Heslo bolo uspesne zmenene!');
        setShowAlert(true);
      }
    } else {
      setDialogTitle('Neuspesna zmena hesla');
      setDialogMessage('Hesla sa nezhoduju');
    }
  };

  const changeEmailHandler = async (newEmail, newEmailAgain) => {
    if (newEmail === newEmailAgain) {
      const response = await api.post('/user/update/email', {
        newEmail: newEmail
      });
      if (response.ok) {
        setDialogTitle('Uspesna zmena emailu');
        setDialogMessage('Vas email bol uspesne zmeneny!');
        setShowAlert(true);
      }
    } else {
      setDialogTitle('Emaily sa nezhoduju');
      setDialogMessage('Emaily sa musia zhodovat!');
      setShowAlert(true);
    }
  };
  const hideAlert = () => {
    setShowAlert(false);
  };
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
      switchState: false
    }
  });

  const inputChangeHandler = (inputId, inputValue) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      input: inputId
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <CustomButton
            name="Zmena hesla"
            iconName="ios-key"
            onPress={() => {
              dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: !formState.inputValues.zmenaHesla,
                input: 'zmenaHesla'
              });
            }}
          />
          {formState.inputValues.zmenaHesla && (
            <View style={styles.obalka}>
              <TextInput
                id="stareHeslo"
                placeholder="stare heslo"
                value={formState.inputValues.stareHeslo}
                onChangeText={inputChangeHandler.bind(this, 'stareHeslo')}
                required
                secureTextEntry={true}
                style={[styles.input, { marginTop: hp('3%') }]}
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
                style={[styles.input, { marginBottom: hp('1.25%') }]}
              />
              <ButtonIcon
                iconName="md-checkmark"
                onPress={() =>
                  changePasswordHandler(
                    formState.inputValues.stareHeslo,
                    formState.inputValues.noveHeslo,
                    formState.inputValues.noveHesloZnovu
                  )
                }
              />
            </View>
          )}
          <CustomButton
            name="Zmena mailu"
            iconName="ios-mail"
            onPress={() => {
              dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: !formState.inputValues.zmenaMailu,
                input: 'zmenaMailu'
              });
            }}
          />
          {formState.inputValues.zmenaMailu && (
            <View style={styles.obalka}>
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
                style={[styles.input, { marginBottom: hp('1.25%') }]}
              />
              <ButtonIcon
                iconName="md-checkmark"
                onPress={() =>
                  changeEmailHandler(
                    formState.inputValues.novyMail,
                    formState.inputValues.novyMailZnovu
                  )
                }
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={dialogTitle}
        message={dialogMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Super!"
        confirmButtonColor={Colors.carhartt}
        onConfirmPressed={hideAlert}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  obalka: {
    width: '80%',
    alignItems: 'center'
  },
  input: {
    marginVertical: hp('2.25%'),
    fontSize: hp('3%'),
    textAlign: 'center',
    justifyContent: 'center',
    width: wp('50%'),
    height: hp('6%'),
    backgroundColor: (255, 255, 255, 0.9),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: hp('1%'),
    elevation: 2
  }
});
export default ProfilSettings;
