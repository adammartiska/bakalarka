import React, { useReducer, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    touched: false
  });

  const { onInputChange, id } = props;
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <TextInput
      {...props}
      autoCorrect={false}
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor="#9c9c9c"
      onChangeText={textChangeHandler}
      onBlur={lostFocusHandler}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 5,
    marginHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    backgroundColor: (255, 255, 255, 0.9),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,

    elevation: 2
  }
});

export default Input;
