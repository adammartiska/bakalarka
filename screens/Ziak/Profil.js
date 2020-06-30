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
import ProfileRow from '../../components/ProfileRow';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomButon from '../../components/CustomButton';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import Colors from '../../constants/Colors';
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
  const celkovo = 15;
  let prog = (ridesCompleted / celkovo) * 100;
  let progString = prog.toString() + '%';
  const p = () => {
    return progString;
  };
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
    props.navigation.setParams({ odhlas: () => logoutHandler() });
  }, [logoutHandler]);

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => pickImage()}>
        <Image style={styles.logo} source={require('../../Images/user.png')} />
      </TouchableOpacity>
      <View style={styles.heading}>
        <Text style={{ fontSize: hp('3.25%') }}>{fullName}</Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ fontSize: hp('2.5%') }}>Progres</Text>
      </View>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            { backgroundColor: Colors.lightGreen, width: p() })
          }
        />
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text>
          {progString} , Odjazdenych {ridesCompleted} jazd z 15.
        </Text>
      </View>
      <ProfileRow information={email} iconName="ios-mail" />
      <ProfileRow information={phoneNumber} iconName="ios-call" />
      <ProfileRow information={date} iconName="ios-flag" />
      <View style={{ marginTop: hp('2%') }}>
        <CustomButon
          name="Nastavenia"
          iconName="md-settings"
          onPress={() => props.navigation.navigate('ProfilSettings')}
        />
      </View>
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
    marginTop: hp('2%'),
    height: hp('15%'),
    width: wp('25%')
  },
  heading: {
    marginVertical: hp('3%')
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: 300,
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20
  },

  input: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '85%',
    height: 30,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    justifyContent: 'space-between'
  }
});

export default Profil;
