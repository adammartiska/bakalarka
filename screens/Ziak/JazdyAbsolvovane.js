import React from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from '../../components/DetailJazdy';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import InstruktorBar from '../../components/InstruktorBar';


const JazdyAbsolvovane = props => {
   
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '12.3.2018',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: '5.4.2018',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '18.4.2018',
        },
      ];

      const Item = props => {
        const [showDetails, setShowDetails] = useState(false);
        return (
            
            <TouchableOpacity onPress={() => 
            {
                setShowDetails(prevState => !prevState)
            }}>
            <View style={styles.screen}>
            <View style={styles.riadokJazdy}>
            <View>
            <InstruktorBar />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{props.nazov}</Text>
            </View>
            </View>
            
            {showDetails && (<View style={styles.vysunute}><DetailJazdy /></View>)}
            
            
            </View>
            </TouchableOpacity>
            
          );
      }





    return (
        <SafeAreaView style = {styles.screen}>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Item nazov = {item.title}/>}
        />      
        
        
        </SafeAreaView>

    );



};


const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        marginTop: 8,



    },

    riadokJazdy: {
      borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e6ffee',
        padding: 20,
        marginTop: 8,
        marginHorizontal: 16,

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

export default JazdyAbsolvovane;