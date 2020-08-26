import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import Profil from '../screens/Ziak/Profil';
import ProfilSettings from '../screens/Ziak/ProfilSettings';
import TestVseobecne from '../screens/Ziak/TestVseobecne';
import Testy from '../screens/Ziak/Testy';
import UkoncenyZiak from '../screens/Ziak/UkoncenyZiak';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
};

const JazdyAbsolvovaneStack = createStackNavigator(
  {
    JazdyStack: {
      screen: UkoncenyZiak,
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
    },
    TestVseobecne: {
      screen: TestVseobecne,
      navigationOptions: {
        headerTitle: 'Test'
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
