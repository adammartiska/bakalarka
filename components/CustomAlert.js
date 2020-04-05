import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const CustomAlert = props => {
  const [showAlert, setShowAlert] = useState(false);

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <AwesomeAlert
      show={props.showAlert}
      showProgress={false}
      title={props.title}
      message={props.message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText={props.cancelText}
      confirmText={props.confirmText}
      confirmButtonColor="#DD6B55"
      onCancelPressed={hideAlert}
      onConfirmPressed={props.onConfirm}
    />
  );
};

export default CustomAlert;
