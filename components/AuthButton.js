import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

const AuthButton = ({
  title,
  children,
  isLoading = false,
  onPress,
  buttonStyle,
  containerStyle,
  fontStyle,
  props
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={title}
        titleStyle={[styles.textInButton, fontStyle]}
        buttonStyle={[styles.authButton, buttonStyle]}
        containerStyle={[styles.buttonContainer, containerStyle]}
        loading={isLoading}
        onPress={onPress}
        {...props}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  authButton: {
    justifyContent: 'center',
    width: wp('50%'),
    height: hp('6%'),
    borderRadius: hp('1.5%'),
    backgroundColor: Colors.primaryColor,
    marginTop: hp('1.75%'),
    elevation: 6
  },
  textInButton: {
    fontSize: hp('3.25%'),
    fontFamily: 'Roboto'
  },
  buttonContainer: {
    marginTop: hp('0.5%')
  }
});

export default AuthButton;
