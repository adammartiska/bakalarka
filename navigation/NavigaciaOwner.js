import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import Colors from '../constants/Colors';
import Domov from '../screens/Domov_legacy';
import JazdyRezervacia from '../screens/Ziak/JazdyRezervacia';
import Profil from '../screens/Ziak/Profil';
import Testy from '../screens/Ziak/Testy';
import Login from '../screens/Login';
import JazdyAbsolvovane from '../screens/Ziak/JazdyAbsolvovane';
import Jazdy from '../screens/Ziak/Jazdy';
import Registracia from '../screens/Registracia';
import ZabudnuteHeslo from '../screens/ZabudnuteHeslo';
import JazdyInstruktor from '../screens/Instruktor/JazdyInstruktor';
import Processing from '../screens/Processing';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { fromLeft } from 'react-navigation-transitions';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import ProfilSettings from '../screens/Ziak/ProfilSettings';
import JazdyNadchadzuje from '../screens/Ziak/JazdyNadchadzajuce';
import TestVseobecne from '../screens/Testy/TestVseobecne';
import JazdyRozhranieInstruktor from '../screens/Instruktor/JazdyRozhranieInstruktor';
import ConfirmScreen from '../screens/Instruktor/ConfirmScreen';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
};

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

const ConfirmStack = createStackNavigator(
  {
    Confirm: {
      screen: ConfirmScreen,
      navigationOptions: {
        headerTitle: 'Ziadosti'
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

const NavigaciaOwner = createMaterialBottomTabNavigator(
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

    Confirm: {
      screen: ConfirmStack,
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

export default NavigaciaOwner;
