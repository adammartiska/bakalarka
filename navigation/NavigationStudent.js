import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Colors from '../constants/Colors';
import Login from '../screens/Login';
import Registracia from '../screens/Registracia';
// import Vyber from '../screens/Vyber';
// import VyberScreen from '../screens/VyberScreen';
import ZabudnuteHeslo from '../screens/ZabudnuteHeslo';
import Jazdy from '../screens/Ziak/Jazdy';
import JazdyRezervacia from '../screens/Ziak/JazdyRezervacia';
import Profil, { screenOptions } from '../screens/Ziak/Profil';
import ProfilSettings from '../screens/Ziak/ProfilSettings';
import TestVseobecne from '../screens/Ziak/TestVseobecne';
import Testy from '../screens/Ziak/Testy';
import JazdyNadchadzajuce from '../screens/Ziak/JazdyNadchadzajuce';
import Constants from 'expo-constants';

// import NavigaciaCompletedZiak from './NavigaciaCompletedZiak';
// import NavigaciaTabInstruktor from './NavigaciaInstruktor';
// import NavigaciaOwner from './NavigaciaOwner';

const defaultStackNavOptions = {
  cardStyle: {
    backgroundColor: 'white'
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
};

const LoginStack = createStackNavigator();
export const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={defaultStackNavOptions}>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: 'Prihlasenie'
        }}
      />
      <LoginStack.Screen
        name="Registration"
        component={Registracia}
        options={{
          headerTitle: 'Registracia'
        }}
      />
      <LoginStack.Screen
        name="ForgotPassword"
        component={ZabudnuteHeslo}
        options={{
          headerTitle: 'Zabudnute heslo'
        }}
      />
    </LoginStack.Navigator>
  );
};

// const LoginStack = createStackNavigator(
//   {
//     Login: {
//       screen: Login,
//       navigationOptions: {
//         headerTitle: 'Login'
//       }
//     },
//     Registracia: {
//       screen: Registracia,
//       navigationOptions: {
//         headerTitle: 'Registracia'
//       }
//     },
//     ZabudnuteHeslo: {
//       screen: ZabudnuteHeslo,
//       navigationOptions: {
//         headerTitle: 'Zabudnute Heslo'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );

// const VyberStack = createStackNavigator(
//   {
//     Vyber: {
//       screen: Vyber,
//       navigationOptions: {
//         headerTitle: 'Prve prihlasenie'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );
// const VyberScreenStack = createStackNavigator(
//   {
//     Vyber: {
//       screen: VyberScreen,
//       navigationOptions: {
//         headerTitle: 'Vyber autoskoly'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );

// const VyberSwitch = createSwitchNavigator(
//   {
//     VstupAutoskoly: {
//       screen: VyberStack,
//       navigationOptions: {
//         headerTitle: 'Prve prihlasenie'
//       }
//     },
//     VyberScreen: {
//       screen: VyberScreenStack,
//       navigationOptions: {
//         headerTitle: 'Vyber autoskoly'
//       }
//     }
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//     initialRouteName: 'VyberScreen'
//     //transitionConfig: () => fromLeft(),
//   }
// );

// const switchik = createAnimatedSwitchNavigator(
//   {
//     PrvyVyber: {
//       screen: VyberStack
//     },

//     DruhyVyber: {
//       screen: VyberScreenStack
//     }
//   },
//   {
//     initialRouteName: 'PrvyVyber'
//   }
// );

// const DomovStack = createStackNavigator(
//   {
//     Domov: {
//       screen: Jazdy,
//       navigationOptions: {
//         headerTitle: 'Domov'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );

const RidesOverviewStack = createStackNavigator();
export const RidesOverview = () => {
  return (
    <RidesOverviewStack.Navigator screenOptions={defaultStackNavOptions}>
      <RidesOverviewStack.Screen
        name="RidesOverview"
        component={Jazdy}
        options={ridesOverviewOptions}
      />
    </RidesOverviewStack.Navigator>
  );
};

const ridesOverviewOptions = {
  headerTitle: 'Prehlad jazd'
};

const RidesReservationStack = createStackNavigator();
export const RidesReservation = () => {
  return (
    <RidesReservationStack.Navigator screenOptions={defaultStackNavOptions}>
      <RidesReservationStack.Screen
        name="RidesReservation"
        component={JazdyRezervacia}
        options={{ headerTitle: 'Rezervacia jazd' }}
      />
    </RidesReservationStack.Navigator>
  );
};

const TestStack = createStackNavigator();
export const Test = () => {
  return (
    <TestStack.Navigator screenOptions={defaultStackNavOptions}>
      <TestStack.Screen
        name="TestOverview"
        component={Testy}
        options={{
          headerTitle: 'Prehlad testov'
        }}
      />
      <TestStack.Screen
        name="TestConcrete"
        component={TestVseobecne}
        options={{
          headerTitle: 'Test'
        }}
      />
    </TestStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
export const Profile = () => {
  return (
    <ProfileStack.Navigator screenOptions={defaultStackNavOptions}>
      <ProfileStack.Screen
        name="ProfileInformation"
        component={Profil}
        options={{ headerTitle: 'Profil' }}
      />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfilSettings}
        options={{
          headerTitle: 'Nastavenia'
        }}
      />
    </ProfileStack.Navigator>
  );
};

const TabStudentNavigator = createMaterialBottomTabNavigator();
export const TabStudent = () => {
  return (
    <TabStudentNavigator.Navigator
      initialRouteName="RidesOverview"
      barStyle={{ backgroundColor: Colors.primaryColor }}
      labeled={true}
    >
      <TabStudentNavigator.Screen
        name="RidesOverview"
        component={RidesOverview}
        options={{
          tabBarLabel: 'Prehlad',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={25} color={color} />
          )
        }}
      />
      <TabStudentNavigator.Screen
        name="RidesReservation"
        component={RidesReservation}
        options={{
          tabBarLabel: 'Jazdy',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-car" size={25} color={color} />
          )
        }}
      />
      <TabStudentNavigator.Screen
        name="Test"
        component={Test}
        options={{
          tabBarLabel: 'Testy',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-book" size={25} color={color} />
          )
        }}
      />
      <TabStudentNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-contact" size={25} color={color} />
          )
        }}
      />
    </TabStudentNavigator.Navigator>
  );
};

// const JazdyStack = createStackNavigator(
//   {
//     JazdyStack: {
//       screen: JazdyRezervacia,
//       navigationOptions: {
//         headerTitle: 'Jazdy'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );

// const TestyStack = createStackNavigator(
//   {
//     Testy: {
//       screen: Testy,
//       navigationOptions: {
//         headerTitle: 'Testy'
//       }
//     },
//     TestVseobecne: {
//       screen: TestVseobecne,
//       navigationOptions: {
//         headerTitle: 'Test'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );

// const ProfilStack = createStackNavigator(
//   {
//     Profil: {
//       screen: Profil,
//       navigationOptions: {
//         headerTitle: 'Profil'
//       }
//     },
//     ProfilSettings: {
//       screen: ProfilSettings,
//       navigationOptions: {
//         headerTitle: 'Nastavenia'
//       }
//     }
//   },
//   { defaultNavigationOptions: defaultStackNavOptions }
// );

// const NavigaciaTab = createMaterialBottomTabNavigator(
//   {
//     Domov: {
//       screen: DomovStack,
//       navigationOptions: {
//         tabBarIcon: tabInfo => {
//           return (
//             <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
//           );
//         }
//       }
//       // tabBarColor: Colors.primaryColor,
//     },

//     Jazdy: {
//       screen: JazdyStack,
//       navigationOptions: {
//         tabBarIcon: tabInfo => {
//           return (
//             <Ionicons name="ios-car" size={25} color={tabInfo.tintColor} />
//           );
//         }
//       }
//       //tabBarColor: Colors.primaryColor,
//     },

//     Testy: {
//       screen: TestyStack,
//       navigationOptions: {
//         tabBarIcon: tabInfo => {
//           return (
//             <Ionicons name="ios-book" size={25} color={tabInfo.tintColor} />
//           );
//         }
//       }
//       //tabBarColor: Colors.secondaryColor,
//     },

//     Profil: {
//       screen: ProfilStack,
//       navigationOptions: {
//         tabBarIcon: tabInfo => {
//           return (
//             <Ionicons name="ios-contact" size={25} color={tabInfo.tintColor} />
//           );
//         }
//       }
//       //tabBarColor: Colors.secondaryColor,
//     }
//   },
//   {
//     activeTintColor: 'black',
//     shifting: false,
//     barStyle: {
//       backgroundColor: Colors.primaryColor
//     } // ked dam shifting true toto nebude mat vyznam

//     /* navigationOptions: {
//             headerStyle: {
//                 backgroundColor: Colors.primaryColor,
//             },
//             headerTintColor: 'white',
//             headerTitle: 'skusme',
//         } */
//   }
// );

// const SwitchNavigator = createAnimatedSwitchNavigator(
//   {
//     SignedOut: {
//       screen: LoginStack
//     },

//     SignedInZiak: {
//       screen: NavigaciaTab
//     },
//     SignedInInstructor: {
//       screen: NavigaciaTabInstruktor
//     },
//     SignedInOwner: {
//       screen: NavigaciaOwner
//     },
//     Vyber: {
//       screen: VyberStack
//     },
//     VyberScreen: {
//       screen: VyberSwitch
//     },
//     CompletedZiak: {
//       screen: NavigaciaCompletedZiak
//     }
//   },
//   {
//     initialRouteName: 'SignedOut'
//     //transitionConfig: () => fromLeft(),
//   }
// );

// export default createAppContainer(SwitchNavigator);
