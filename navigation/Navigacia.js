import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { useSelector } from 'react-redux';
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
import NavigaciaTabInstruktor from './NavigaciaInstruktor';
import Vyber from '../screens/Vyber';
import ConfirmScreen from '../screens/Instruktor/ConfirmScreen';
import VyberScreen from '../screens/VyberScreen';
import NavigaciaOwner from './NavigaciaOwner';
import NavigaciaCompletedZiak from './NavigaciaCompletedZiak';

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

const VyberStack = createStackNavigator(
  {
    Vyber: {
      screen: Vyber,
      navigationOptions: {
        headerTitle: 'Prve prihlasenie'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);
const VyberScreenStack = createStackNavigator(
  {
    Vyber: {
      screen: VyberScreen,
      navigationOptions: {
        headerTitle: 'Druhe prihlasenie'
      }
    }
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const switchik = createAnimatedSwitchNavigator(
  {
    PrvyVyber: {
      screen: VyberStack
    },

    DruhyVyber: {
      screen: VyberScreenStack
    }
  },
  {
    initialRouteName: 'PrvyVyber'
  }
);

const DomovStack = createStackNavigator(
  {
    Domov: {
      screen: Jazdy,
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
      screen: JazdyRezervacia,
      navigationOptions: {
        headerTitle: 'Jazdy'
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

const NavigaciaTab = createMaterialBottomTabNavigator(
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

const SwitchNavigator = createAnimatedSwitchNavigator(
  {
    Processing: {
      screen: Processing
    },

    SignedOut: {
      screen: LoginStack
    },

    SignedInZiak: {
      screen: NavigaciaTab
    },
    SignedInInstructor: {
      screen: NavigaciaOwner
    },
    SignedInOwner: {
      screen: NavigaciaOwner
    },
    Vyber: {
      screen: VyberStack
    },
    VyberScreen: {
      screen: VyberScreenStack
    },
    CompletedZiak: {
      screen: NavigaciaCompletedZiak
    }
  },
  {
    initialRouteName: 'SignedOut'
    //transitionConfig: () => fromLeft(),
  }
);

export default createAppContainer(SwitchNavigator);
