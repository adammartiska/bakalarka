import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Text,
  Picker,
  TouchableOpacity
} from 'react-native';

const AutoskolaCart = props => {
  const calculateColor = state => {
    switch (state) {
      case 'ACCEPTED':
        return { backgroundColor: '#e6ffee' };
      case 'PENDING':
        return { backgroundColor: '#feffc9' };
      case 'CANCELLED':
        return { backgroundColor: '#ffe6e6' };
    }
  };
  return (
    <View style={[styles.outer, calculateColor(props.state)]} {...props}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        <Text style={{ fontSize: 20 }}>{props.autoskola}</Text>
      </View>
      <View style={styles.bunky}>
        <Text style={styles.innerText}>Rola</Text>
        <Text style={styles.innerText}>{props.role}</Text>
      </View>
      <View style={styles.bunky}>
        <Text style={styles.innerText}>Stav</Text>
        <Text style={styles.innerText}>{props.state}</Text>
      </View>

      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <View
          style={
            props.disabled ? styles.customButtonDisabled : styles.customButon
          }
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={props.onPress}
            disabled={props.state === 'PENDING' || props.state === 'CANCELLED'}
          >
            <Text
              style={
                props.disabled
                  ? styles.disabledTextInButton
                  : styles.textInButton
              }
            >
              Vstupit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center'
  },
  outer: {
    width: '85%',
    borderWidth: 1,
    borderColor: '#404040',
    marginHorizontal: 20,
  },
  textInButton: {
    fontSize: 20,
    color: 'white'
  },
  disabledTextInButton: {
    fontSize: 20,
    color: '#4d4d4d'
  },

  innerText: {
    fontSize: 16
  },
  customButon: {
    margin: 5,
    height: 30,
    width: '35%',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  customButtonDisabled: {
    margin: 5,
    height: 30,
    width: '35%',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2
  },
  bunky: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginVertical: 5,
    paddingHorizontal: 25
  },
  skusim: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 50
  }
});

export default AutoskolaCart;
