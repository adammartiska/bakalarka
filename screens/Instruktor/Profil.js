import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomButon from '../../components/CustomButton';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import Colors from '../../constants/Colors';
import ProfileRow from '../../components/ProfileRow';
import * as authActions from '../../store/actions/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Profil = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth.userInfo);
  const { email, fullName, phoneNumber, ridesCompleted, startDate } = userInfo;
  const date = moment(startDate).format('DD/MM/YYYY');
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  let animation = useRef(new Animated.Value(0));
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    props.navigation.navigate('SignedOut');
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ odhlas: () => setShowAlert(true) });
  }, [logoutHandler]);

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => pickImage()}>
        <Image style={styles.logo} source={require('../../Images/user.png')} />
      </TouchableOpacity>
      <View style={styles.heading}>
        <Text style={{ fontSize: hp('3.25%') }}>{fullName}</Text>
      </View>
      <View style={{ marginBottom: hp('4%') }}>
        <Text style={{ fontSize: hp('2.25%') }}>
          Spolu odjazdenych {ridesCompleted} jazd
        </Text>
      </View>
      <ProfileRow information={email} iconName="ios-mail" />
      <ProfileRow information={phoneNumber} iconName="ios-call" />
      <ProfileRow information={date} iconName="ios-flag" />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: hp('1%'),
          top: 0,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <CustomButon
          name="Nastavenia"
          iconName="md-settings"
          onPress={() => props.navigation.navigate('ProfilSettings')}
        />
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Prajete si zavazne odhlasit?"
        message="Pred tym nez sa odhlasite, skontrolujte prosim ci mate potvrdene vsetky jazdy pre dnesny den"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Nie, skontrolovat jazdy"
        confirmText="Odhlasit ma!"
        confirmButtonColor={Colors.carhartt}
        cancelButtonCOlor={'#7a7a7a'}
        onCancelPressed={hideAlert}
        onConfirmPressed={logoutHandler}
      />
    </View>
  );
};

Profil.navigationOptions = navData => {
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: wp('4%')
  },

  logo: {
    marginTop: hp('4%'),
    height: hp('15%'),
    width: wp('25%')
  },
  heading: {
    marginVertical: hp('3.5%')
  },

  input: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    width: wp('80%'),
    height: hp('4.5%'),
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    justifyContent: 'space-between'
  }
});

export default Profil;
