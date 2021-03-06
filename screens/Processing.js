import React, {useEffect} from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const Processing = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('SignedOut');
                return;
            }
        const transformedData = JSON.parse(userData);
        const {token, userId, expiryDate} = transformedData;
        const expirationDate = new Date(expiryDate);        
        if(expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('SignedOut');
                return;
        }
        props.navigation.navigate('SignedIn');
        dispatch(authActions.authenticate(userId, token));
    };
        tryLogin();
    }, [dispatch]);

    return (<View style = {styles.screen}>
        <ActivityIndicator size='large' color={Colors.primary} />
    </View>);
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


});

export default Processing;