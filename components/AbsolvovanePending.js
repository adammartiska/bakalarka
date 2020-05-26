import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailJazdy from './DetailJazdy';
import { useState } from 'react';
import Colors from '../constants/Colors';
import InstruktorBar from './InstruktorBar';
import Icon from 'react-native-vector-icons/Ionicons';
import TimeButton from './TimeButton';
import CustomButton from './CustomButton';

const AbsolvovanePending = props => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={[styles.default, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomWidth: 2,
          borderBottomColor: Colors.sedatmava
        }}
      >
        <View>
          <Text style={styles.velky}>{props.datum}</Text>
        </View>
        <Icon name="ios-flag" size={25} />
        <View>
          <Text style={styles.velky}>{props.cas}</Text>
        </View>
      </View>
      <View style={{ marginTop: 7, alignItems: 'center' }}>
        <InstruktorBar name={props.name} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 10
        }}
      >
        <TimeButton
          name="potvrdit"
          styles={{ width: 100, backgroundColor: Colors.lightGreen }}
          onPress={props.onPressConfirm}
        />
        <TimeButton
          name="zrusit"
          styles={{ width: 100, backgroundColor: Colors.lightRed }}
          onPress={props.onPressDecline}
        />
      </View>
    </View>
  );
};

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
    marginHorizontal: 15
  },
  default: {
    elevation: 1,
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: Colors.sedatmava,
    padding: 8
  },
  item: {
    marginLeft: 25,
    marginRight: 20
  },
  velky: {
    textAlign: 'center',
    fontSize: 18
  },

  riadokJazdy: {
    borderWidth: 2,
    borderColor: '#000',
    //backgroundColor: Colors.sedatmava,
    padding: 10,
    marginTop: 8,
    width: '100%',
    marginHorizontal: 15
  },
  vysunute: {
    borderWidth: 1,
    marginTop: 0,
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 15
  },

  title: {
    fontSize: 20
  },
  logo: {
    width: 22,
    height: 22
  }
});

export default AbsolvovanePending;
