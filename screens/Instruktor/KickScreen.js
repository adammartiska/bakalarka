import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import { create } from 'apisauce';
import KickTab from '../../components/KickTab';
import Colors from '../../constants/Colors';

const KickScreen = props => {
  const [showAlert, setShowAlert] = useState(false);
  const jwt = useSelector(state => state.auth.token);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [kickId, setKickId] = useState(0);
  const relationId = useSelector(state => state.auth.relationId);
  const hideAlert = () => {
    setShowAlert(false);
  };
  const api = create({
    baseURL: 'http://147.175.121.250:80',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
      Relation: relationId
    }
  });
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await api.get('/school/getInactiveUsers');
      if (response.ok) {
        console.log(response);
        setInactiveUsers(response.data);
      }
    };
    fetchRequests();
  }, []);

  const kickHandler = async id => {
    const reponse = await api.post(`/school/kickUser/${id}`);
    console.log(reponse);
    if (response.ok) {
      setInactiveUsers(inactiveUsers.filter(user => user.relationID !== id));
    }
  };
  const askAboutKick = id => {
    setKickId(id);
    setShowAlert(true);
  };
  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>
          Nizsie sa vam zobrazuju ziaci, ktori su vo vasej autoskole dlhsie
          neaktivni
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <Text
          style={{
            fontSize: 14,
            color: Colors.inActive,
            textAlign: 'center'
          }}
        >
          Po kliknuti na ikonu bude dany ziak z vasej autoskoly vyhodeny
        </Text>
      </View>
      {inactiveUsers.length > 0 ? (
        inactiveUsers.map(user => (
          <KickTab
            key={user.name}
            name={user.name}
            onPressDecline={() => askAboutKick(user.relationID)}
          />
        ))
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
          }}
        >
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}
          >
            Vo vasej autoskole nie su ziadni neaktivni ziaci
          </Text>
        </View>
      )}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Vyhodenie ziaka"
        message="Skutocne si prajete vyhodit daneho ziaka z vasej autoskoly?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Ano"
        cancelText="Nie"
        confirmButtonColor={Colors.carhartt}
        cancelButtonColor="#7a7a7a"
        onCancelPressed={hideAlert}
        onConfirmPressed={() => kickHandler(kickId)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 20,
    flex: 1
  }
});

export default KickScreen;
