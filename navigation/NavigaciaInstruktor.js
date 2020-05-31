import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import JazdyInstruktor from '../screens/Instruktor/JazdyInstruktor';
import JazdyRozhranieInstruktor from '../screens/Instruktor/JazdyRozhranieInstruktor';
import Profil from '../screens/Instruktor/Profil';
import Login from '../screens/Login';
import Registracia from '../screens/Registracia';
import ZabudnuteHeslo from '../screens/ZabudnuteHeslo';
import ProfilSettings from '../screens/Ziak/ProfilSettings';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
};

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login'
      }
    },
    Registracia: {
      screen: Registracia,
      navigationOptions: {
        headerTitle: 'Registracia'
      }
    },
    ZabudnuteHeslo: {
      screen: ZabudnuteHeslo,
      navigationOptions: {
        headerTitle: 'Zabudnute Heslo'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const DomovStack = createStackNavigator(
  {
    Domov: {
      screen: JazdyRozhranieInstruktor,
      navigationOptions: {
        headerTitle: 'Domov'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const JazdyStack = createStackNavigator(
  {
    JazdyStack: {
      screen: JazdyInstruktor,
      navigationOptions: {
        headerTitle: 'Jazdy'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const ProfilStack = createStackNavigator(
  {
    Profil: {
      screen: Profil,
      navigationOptions: {
        headerTitle: 'Profil'
      }
    },
    ProfilSettings: {
      screen: ProfilSettings,
      navigationOptions: {
        headerTitle: 'Nastavenia'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const NavigaciaTabInstruktor = createMaterialBottomTabNavigator(
  {
    Domov: {
      screen: DomovStack,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
          );
        }
      }
      // tabBarColor: Colors.primaryColor,
    },

    Jazdy: {
      screen: JazdyStack,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-car" size={25} color={tabInfo.tintColor} />
          );
        }
      }
      //tabBarColor: Colors.primaryColor,
    },

    Profil: {
      screen: ProfilStack,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-contact" size={25} color={tabInfo.tintColor} />
          );
        }
      }
      //tabBarColor: Colors.secondaryColor,
    }
  },
  {
    activeTintColor: 'black',
    shifting: false,
    barStyle: {
      backgroundColor: Colors.primaryColor
    } // ked dam shifting true toto nebude mat vyznam

    /* navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor,
            },
            headerTintColor: 'white', 
            headerTitle: 'skusme',
        } */
  }
);

export default NavigaciaTabInstruktor;
