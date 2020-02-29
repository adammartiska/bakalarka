import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../components/DetailJazdy';
import { useState } from 'react';
import Colors from '../constants/Colors';
import InstruktorBar from '../components/InstruktorBar';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeButton from './TimeButton';


const RezervovanaJazda = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        
        <View style={{elevation: 50}} id={props.id}>
        <View style={styles.screen}>

        
        <View style={{width: '60%', flexDirection: 'column'}}>
        <View style={{marginBottom: 5,}}>
        <InstruktorBar />
        </View>


        <View style = {{flexDirection: 'row'}}>
        <View style={{marginLeft: 10}}><Icon name="ios-flag" size={25}/></View>
        <View style={styles.item}>
          <Text style={styles.title}>{props.datum}</Text>
        </View>
        <View>
          <Text style={styles.title}>{props.cas}</Text>
        </View>       
         </View>
        </View>
      <View style = {{marginLeft: 90, marginTop: 18,}}>
      <TouchableOpacity onPress = {() => setShowDetails(!showDetails)}>
        <Icon name="md-close-circle-outline" size={35} color='#000'/>
        </TouchableOpacity>
    </View> 
        
        </View>
        {showDetails && (
        <View style={styles.vysunute}>
        
        <Text style={{fontSize: 15}}>
        Naozaj si prajete zavazne zrusit jazdu?
        </Text>
       
        <TimeButton 
        name = 'zrus'
        styles = {{backgroundColor: '#f00', width: '30%', marginTop: 15,}}
        onPress = {props.onPress}/>

        </View>)
    
        }
        </View>
        
        
        


      );
  }


  const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        flex: 1, 
        marginTop: 8,
        borderWidth: 2,
        borderColor: Colors.carhartt,
        backgroundColor: '#eeeeee',
        padding: 10,
        marginTop: 8,
        marginHorizontal: 15,




    },
    item: {
        marginLeft: 25,
        marginRight: 20,
    },

    riadokJazdy: {
        borderWidth: 2,
        borderColor: '#000',
        //backgroundColor: Colors.sedatmava,
        padding: 10,
        marginTop: 8,
        width: '100%',
        marginHorizontal: 15,

    },
    vysunute: {
        borderWidth: 1,
        marginTop: 0,
        marginHorizontal: 16,
        alignItems: 'center', 
        paddingVertical: 8,
        marginVertical: 15,



    },

      title: {
        fontSize: 20,
      },
      logo: {
        width: 22,
        height: 22,

      }

});


  export default RezervovanaJazda;