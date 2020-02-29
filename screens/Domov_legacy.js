import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import {useSelector} from 'react-redux';

import TimeButton from '../components/TimeButton';



const Domov = props => {
    const token = useSelector(state => state.auth.token)
    return (
        <ScrollView contentContainerStyle = {styles.screen}>
        
        <View style={{marginVertical: 50,}}>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </View>
        <View style={{marginVertical: 50,}}>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </View>
        <View style={{marginVertical: 50,}}>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </View>
        <View style={{marginVertical: 50,}}>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </View>
        <View style={{marginVertical: 50,}}>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </View>
        <View style={{marginVertical: 50,}}>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </View>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        <Text>Tu bude domovska stranka autoskoly ktora sa zatial pripravuje</Text>
        </ScrollView>
        
    );



};

const styles = StyleSheet.create({
    screen: {
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center',

    },



});

export default Domov;