import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import Domov from '../screens/Domov_legacy';
import Profil from '../screens/Ziak/Profil';
import Testy from '../screens/Ziak/Testy';
import JazdyAbsolvovane from '../screens/Ziak/JazdyAbsolvovane';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ProfilSettings from '../screens/Ziak/ProfilSettings';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
};

const JazdyAbsolvovaneStack = createStackNavigator(
  {
    JazdyStack: {
      screen: JazdyAbsolvovane,
      navigationOptions: {
        headerTitle: 'Absolvovane jazdy'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const TestyStack = createStackNavigator(
  {
    Testy: {
      screen: Testy,
      navigationOptions: {
        headerTitle: 'Testy'
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

const NavigaciaCompletedZiak = createMaterialBottomTabNavigator(
  {
    Jazdy: {
      screen: JazdyAbsolvovaneStack,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-car" size={25} color={tabInfo.tintColor} />
          );
        }
      }
      //tabBarColor: Colors.primaryColor,
    },

    Testy: {
      screen: TestyStack,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-book" size={25} color={tabInfo.tintColor} />
          );
        }
      }
      //tabBarColor: Colors.secondaryColor,
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

export default NavigaciaCompletedZiak;
