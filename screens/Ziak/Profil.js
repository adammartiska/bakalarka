import React, {useEffect, useCallback, useState, useRef} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, Animated } from 'react-native';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import TimeButton from '../../components/TimeButton';
import { Card, ListItem } from 'react-native-elements';
//import Icon from 'react-native-ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import CustomButon from '../../components/CustomButton';
import AwesomeAlert from 'react-native-awesome-alerts';

const Profil = props => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const odjazedene = 10;
    const celkovo = 20;
    let prog = (odjazedene/celkovo) * 100;
    let progString = prog.toString() + '%';
    const p = () => {      
      return progString;
    }
    let animation = useRef(new Animated.Value(0));
    _pickImage = async () => {
        console.log(progString);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
    const logoutHandler = useCallback(() => {      
       dispatch(authActions.logout());
       props.navigation.navigate('SignedOut')
    }, [dispatch]);

    useEffect(() => {
        props.navigation.setParams({odhlas: () => setShowAlert(true)})
    }, [logoutHandler]); 

    const hideAlert = () => {
      setShowAlert(false);
    };


    return (
        <View style = {styles.screen}>
        <TouchableOpacity onPress={() => _pickImage()}>
        <Image 
        style={styles.logo}
         source={require('../../Images/user.png')}
    />
    </TouchableOpacity>
        <View style={styles.heading}>
        <Text style={{fontSize: 20}}>Adam Martiska</Text>
        </View>
        <View style={{marginVertical:5}}><Text>Progres</Text></View>
        <View style={styles.progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: p()}}/>
        </View>
        <View style={{marginVertical:5}}><Text>{progString} , Odjazdenych {odjazedene} jazd z 20.</Text></View>
        <View style={styles.input}>

        <View><Icon name="ios-mail" size={30}/></View>
        <View style={{paddingTop:5}}><Text>thefaston@gmail.com</Text></View>

        </View>
        <View style={styles.input}>
        <View><Icon name="ios-call" size={30}/></View>
        <View style={{paddingTop:5}}><Text>+421 948 020 147</Text></View>
        </View>
        <View style={styles.input}>
        <View><Icon name="ios-flag" size={30}/></View>
        <View style={{paddingTop:5}}><Text>18.9.2019</Text></View>
        </View>
        <View style={{marginTop: 10}}>
        <CustomButon name='Nastavenia' iconName = 'md-settings' onPress={() => props.navigation.navigate('ProfilSettings')} />
        </View>
        <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title='Prajete si zavazne odhlasit?'
        message= 'Pred tym nez sa odhlasite, skontrolujte prosim ci mate potvrdene vsetky jazdy pre dnesny den'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Nie, skontrolovat jazdy"
        confirmText="Odhlasit ma!"
        confirmButtonColor="#DD6B55"
        onCancelPressed={hideAlert}
        onConfirmPressed={logoutHandler}
      />
        </View>

    );

    


};

  Profil.navigationOptions = (navData) => {
    const odhlasSa = navData.navigation.getParam('odhlas');
    return {
    headerRight: (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Logout"
            iconName='ios-log-out'
            onPress={odhlasSa}
          />
        </HeaderButtons>
      )
    }; 
}  


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 20,
  
    },

    logo: {
        marginTop: 20,
        height: 100,
        width: 100,
    },
    heading: {
        marginVertical: 20, 
    },
    progressBar: {
    flexDirection: 'row',
    height: 20,
   width: 300,
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 2,
   borderRadius: 5,
   marginBottom: 20, 
    },

    customButon: {
        margin: 5,
        height: 30,
        width: '20%',
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            elevation: 3,


    },
    text: {
        fontSize: 20,
        color: 'black',
        //textAlign: 'center',

    },
    input: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '85%',
        height: 30,
        borderBottomColor: '#ccc',
    borderBottomWidth: 2, 
    justifyContent: 'space-between',
    },




});

export default Profil;