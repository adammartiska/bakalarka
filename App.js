import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Navigacia from './navigation/Navigacia';
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/orders';

//useScreens();  //optimalizacia screenov performance

const rootReducer = combineReducers({
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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

export default function App() {
  return (
    <Provider store={store}>
      <Navigacia />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
