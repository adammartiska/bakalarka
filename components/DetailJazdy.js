import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';

const DetailJazdy = props => {
    return(
        <View style = {styles.screen}>
        <View style={styles.bunky}>
        <Text>Datum a cas jazdy:</Text>
        <Text>25.10.2019, 14:00</Text>
        </View>
        <View style={styles.bunky}>
        <Text>Instruktor:</Text>
        <Text>Michal Panak</Text>
        </View>
        <View style={styles.bunky}>
        <Text>Trvanie jazdy:</Text>
        <Text>64 min:</Text>
        </View>
        
        
        </View>


    )




};

export default DetailJazdy;


const styles = StyleSheet.create({
    screen: {
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#aaa',
    },

    bunky: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        paddingHorizontal: 25,
    }


});
