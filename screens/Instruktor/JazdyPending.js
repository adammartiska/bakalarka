import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';
import RezervovanaJazda from '../../components/RezervovanaJazda';
import NadchadzajuceInstruktor from '../../components/NadchadzajuceInstruktor';
import AbsolvovanePending from '../../components/AbsolvovanePending';


const JazdyNadchadzajuce = props => {
   
    const [DATA, setDATA] = useState([
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '12.3.2018',
          time: '15:00',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: '5.4.2018',
          time: '12:00',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '18.4.2018',
          time: '10:00',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '18.4.2018',
          time: '10:00',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '18.4.2018',
          time: '10:00',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '18.4.2018',
          time: '10:00',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '18.4.2018',
          time: '10:00',
        },
      ]);


      const zmazHandler = id => {
          const newData = DATA.filter(item => item.id !== id)
          setDATA(newData);
      }

    return (
        <SafeAreaView style = {styles.screen}>
        <FlatList
        data={DATA}
        renderItem={({item}) => <AbsolvovanePending datum={item.title} cas={item.time}/>}
        />      
        
        
        </SafeAreaView>

    );



};


const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 12,
        flex: 1, 
        marginTop: 8,



    },

    riadokJazdy: {
        borderWidth: 2,
        borderColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: Colors.sedatmava,
        padding: 10,
        marginTop: 8,
        width: '60%',
        marginHorizontal: 15,

    },
    vysunute: {
        backgroundColor: '#fff',
        marginTop: 0,
        marginHorizontal: 16,


    },

      title: {
        fontSize: 22,
      },
      logo: {
        width: 22,
        height: 22,

      }

});

export default JazdyNadchadzajuce;