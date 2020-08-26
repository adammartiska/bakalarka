import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const CustomButton = props => {
  return (
    <View style={[styles.customButon, props.style]}>
      <View style={{ marginHorizontal: 15 }}>
        <Image style={styles.logo} source={require('../Images/profil.png')} />
      </View>
      <View style={{ marginRight: 110 }}>
        <Text style={{ fontSize: 18 }}>{props.name}</Text>
      </View>
      <TouchableOpacity onPress={props.onPressDecline}>
        <View style={{}}>
          <Icon
            name="ios-close-circle-outline"
            size={28}
            color={Colors.darkRed}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  customButon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginHorizontal: 15,
    marginVertical: 8
  },
  logo: {
    width: 20,
    height: 20
  }
});

export default CustomButton;
