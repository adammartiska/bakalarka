import React, { useState } from 'react';
import { StyleSheet, Text, View, ProgressViewIOSComponent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import InstruktorBar from '../components/InstruktorBar';
import Colors from '../constants/Colors';

const RezervovanaJazda = props => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  showAlertfunction = () => {
    setShowAlert(true);
  };

  hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <View style={{ elevation: 50, marginBottom: 12 }} id={props.id}>
      <View style={styles.screen}>
        <View style={{ width: '60%', flexDirection: 'column' }}>
          <View style={{ marginBottom: 5 }}>
            <InstruktorBar name={props.name} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginLeft: 10 }}>
              <Icon name="ios-flag" size={25} />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{props.datum}</Text>
            </View>
            <View>
              <Text style={styles.title}>{props.cas}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 90, marginTop: 18 }}>
          <TouchableOpacity onPress={props.onPress}>
            <Icon
              name="md-close-circle-outline"
              size={35}
              color={Colors.darkRed}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: '#eeeeee',
    padding: 10,
    marginTop: 8,
    marginHorizontal: 15
  },
  item: {
    marginLeft: 25,
    marginRight: 20
  },

  title: {
    fontSize: 18
  }
});

export default RezervovanaJazda;

{
  /* showDetails && (
    <View style={styles.vysunute}>
    
    <Text style={{fontSize: 15}}>
    Naozaj si prajete zavazne zrusit jazdu?
    </Text>
   
    <TimeButton 
    name = 'zrus'
    styles = {{backgroundColor: '#f00', width: '30%', marginTop: 15,}}
    onPress = {props.onPress}/>

    </View>)
*/
}
