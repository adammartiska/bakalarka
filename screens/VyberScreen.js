import { create } from 'apisauce';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import AutoskolaCart from '../components/AutoskolaCart';
import CustomHeaderButton from '../components/CustomHeaderButton';
import * as authActions from '../store/actions/auth';

const VyberScreen = props => {
  const jwt = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [relations, setRelations] = useState(
    useSelector(state => state.auth.relations)
  );
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    }
  });
  const [autoskola, setSelectedAutoskola] = useState('');
  const [rola, setSelectedRola] = useState('');

  useEffect(() => {
    const fetchRelations = async () => {
      const response = await api.get('/user/viewRelations');
      console.log(response);
      setRelations(response.data);
    };
    fetchRelations();
  }, []);
  const enterHandler = async (relationId, role, information) => {
    if (information === 'completed') {
      await dispatch(authActions.headerData(relationId));
      props.navigation.navigate('CompletedZiak');
    }
    const response = await dispatch(authActions.reduxdata(jwt, relationId));
    console.log(response);
    if (response.ok) {
      if (role === 'STUDENT') {
        props.navigation.navigate('SignedInZiak');
      } else if (role === 'INSTRUCTOR') {
        props.navigation.navigate('SignedInInstructor');
      } else if (role === 'OWNER') {
        props.navigation.navigate('SignedInOwner');
      }
    }
  };

  const prelozStav = stav => {
    switch (stav) {
      case 'waiting':
        return 'Caka sa na potvrdenie';
      case 'active':
        return 'Aktivny';
      case 'completed':
        return 'Uspesne ukonceny';
      case 'rejected':
        return 'Zamietnuty';
      default:
        return 'Neznamy';
    }
  };

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    props.navigation.navigate('SignedOut');
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ odhlas: () => logoutHandler() });
  }, [logoutHandler]);
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={styles.centered}>
          Vyberte si autoskolu, do ktorej sa chcete prihlasit
        </Text>
      </View>
      {relations.map(item => {
        return (
          <AutoskolaCart
            state={prelozStav(item.information)}
            role={item.role}
            key={item.relationID}
            autoskola={item.school}
            onPress={() =>
              enterHandler(item.relationID, item.role, item.information)
            }
            disabled={
              prelozStav(item.information) === 'Zamietnuty' ||
              prelozStav(item.information) === 'Caka sa na potvrdenie'
            }
          />
        );
      })}
      <View style={{ marginTop: 25, marginBottom: 0 }}>
        <Text style={styles.centered}>
          Pokial sa chcete registrovat do novej autoskoly, musite si zalozit
          nove konto
        </Text>
      </View>
      <View style={styles.customButon}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('VstupAutoskoly')}
        >
          <Text style={styles.textInButton}>Nove Konto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
VyberScreen.navigationOptions = navData => {
  const odhlasSa = navData.navigation.getParam('odhlas');
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Logout" iconName="ios-log-out" onPress={odhlasSa} />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10
  },
  textInButton: {
    fontSize: 20,
    color: 'white'
  },
  customButon: {
    height: 50,
    width: '40%',
    // backgroundColor: '#000',
    borderRadius: 5,
    // shadowColor: 'black',
    // shadowOpacity: 0.3,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    elevation: 3
  },
  centered: {
    fontSize: 18,
    textAlign: 'center'
  },
  innerText: {
    fontSize: 16
  },
  textInButton: {
    fontSize: 20,
    color: 'white'
  },

  customButon: {
    marginTop: 20,
    marginBottom: 40,
    justifyContent: 'center',
    margin: 5,
    height: 40,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  }
});

export default VyberScreen;
