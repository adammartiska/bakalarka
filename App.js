import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
//import * as Font from 'expo-font';
import { useScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import Navigacia, { createRootNavigator } from './navigation/Navigacia';
import Login from './screens/Login';
import { isSignedIn } from './components/Auth';
import Testy from './screens/Ziak/Testy';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/orders';
import JazdyAbsolvovane from './screens/Instruktor/JazdyAbsolvovane';
import Profil from './screens/Ziak/Profil';
import JazdyRezervacia from './screens/Ziak/JazdyRezervacia';
import JazdyInstruktor from './screens/Instruktor/JazdyInstruktor';
import Prvy from './screens/Testy/Prvy';
import ProfilSettings from './screens/Ziak/ProfilSettings';
import NavigaciaInstrktor from './navigation/NavigaciaInstruktor';
import NadchadzajuceInstruktor from './components/NadchadzajuceInstruktor';
import JazdyNadchadzajuce from './screens/Instruktor/JazdyNadchadzajuce';

//useScreens();  //optimalizacia screenov performance


const rootReducer = combineReducers({
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

// const fetchfonts = () => {
//   return Font.loadAsync({
//     'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
//   });
// }; //funkcia na nacitanie fontov
  // const [fontLoaded, setFontLoaded] = useState('false');
  // if(!fontLoaded) {
  //   return <AppLoading startAsync={fetchfonts}
  //     onFinish={() => setFontLoaded(true)}
  //     />
    
  // };

  // const [isLoggedIn, setIsLoggedIn] = useState('false');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      signedIn: false,
      checkedSignIn: false,
    };
  };

  // }
render() {
  // const { signedIn, checkedSignIn } = this.state;
  // const Layout = createRootNavigator(signedIn);
  return (
    <Provider store = {store}>
    <NavigaciaInstrktor />
    </Provider>
  );
};
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// {
//   const { checkedSignIn, signedIn } = this.state;
//   if(!checkedSignIn) {
//     return null;
//   }
//   if(!signedIn){
//     return <Login />;
//   }
//   if(signedIn) {
//     return (<View style={styles.container}><Text> si prihlaseny</Text></View>)
//   }
// }