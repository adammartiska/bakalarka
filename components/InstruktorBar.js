import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const InstruktorBar = props => {

    return (
        <View style={styles.instruktorLayout}>
        <Image 
        style={styles.logo}
        source={require('../Images/instruktor.jpg')}
        />
        <View style={styles.menoInstruktora}>
        <Text style={{fontSize: 20,}}>Drahomir Januska</Text>
        </View>  
        </View>
    );


};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        paddingTop: 120,
        alignItems: 'center',
    },

    instruktorLayout: {
        flexDirection: 'row',

    },
    logo: {
        borderColor: 'black',
        borderRadius: 10,
        width: 35,
        height: 35,
    },
    menoInstruktora: {
        marginLeft: 15,
        paddingVertical: 5,
    },




});

export default InstruktorBar;