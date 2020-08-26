import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from '../screens/TestScreen';
import { LoginNavigator } from './NavigationStudent';
import { TabStudent } from './NavigationStudent';

const MyStack = createStackNavigator();

const MainNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const relations = useSelector(state => state.auth.relations);
  return (
    <NavigationContainer>
      {isAuth && relations.length === 1 && <TabStudent />}
      {!isAuth && <LoginNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
