import React, { Component, useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
//import { Colors } from 'react-native-paper';
import Colors from '../../constants/Colors';
import moment from 'moment';
import {useSelector, connect} from 'react-redux';
import TimeButton from '../../components/TimeButton';
import InstruktorBar from '../../components/InstruktorBar';
import TimeButtonCheck from '../../components/TimeButtonCheck';
import ObjednajButton from '../../components/ObjednajButton';


const JazdyRezervacia = props => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const scrollViewRef = useRef();
  const [title, setTitle] = useState({
    datum: '',
    cas: ''
  });
    const pole = ["8:00", "9:00", "10:00"];
    const checkHandler = (id) => {
      setCeknute(!ceknute);
      if(!ceknute) {
          const novePole = pole.slice();
          novePole.push(id);
          console.log("pushuj");
          setPole(novePole);
          console.log(novePole);
      }
      else
      {
          console.log("filtruj");
      }


  };
    useEffect(() => {
    console.log('useEffect');
    console.log(screenWidth);
    scrollViewRef.current.scrollToEnd();
  });
  const selectedStartDate = null;
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState(true);
  const dataToMap = ["11:00", "12:00", "13:00", "14:00", "15:00"]
  const [objednal, setObjednal] = useState(false);
  const [selected, setSelected] = useState('');

    const jazdaHandler = (id) => {
      setTitle({
        ...title,
        cas: id
      });
      setObjednal(true);
      setSelected(id);
      console.log(id);
      // scrollViewRef.current.scrollToEnd();
      // scrollViewRef.current.scrollToEnd();

    }

    const maper = (data) => {
      
    return(
      <View style = {{marginHorizontal: 18,}}>
      <View style ={styles.instruktor}>
      <InstruktorBar />
      </View>
      <View style = {styles.screen}>
      {data.map((item) => {
        return ( 
          <TimeButton
         styles = {(selected === item) && {     
         elevation: 15, }}
         name = {item}
         onPress = {() => jazdaHandler(item)}
         />
   )})}
   </View>
      {/*
        (objednal) && (
          <View style={{flex: 1}}>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><Text>My fixed footer</Text></View>
          </View>
        )
        */}
      </View>
    );
  }
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // const [selectedDate, setSelectedDate] = useState([]);
  const token = useSelector(state => state.auth.token);
  const dateChangeHandler = (date) => {
      setIsLoading(false);
      setDisplayText(false);
      upravenyDate = moment(date).format("MM DD YYYY");
      setTitle({
        ...title,
        datum: upravenyDate
      });
      const dataToSent = {
        token: token,
        date: upravenyDate
      }
      console.log(dataToSent);
  };

    return(
    <ScrollView 
    contentContainerStyle={styles.container}
    ref={scrollViewRef}>
    <CalendarPicker 
    onDateChange={dateChangeHandler}
    />
    <View>
    {(isLoading) ? ((displayText) ? (<View style={styles.centered}><Text>Pre zobrazenie volnych terminov si vyberte datum</Text></View>) : (<View style = {{paddingTop: 10,
      textAlign: 'center',}}><ActivityIndicator size='large' color={Colors.primaryColor}/></View>)) : maper(dataToMap)}
    </View>
    {
      (objednal) && (
        <View style={{marginVertical: 40, alignItems: 'center', width: '100%', height: 40, }}>
        <ObjednajButton datum={`${title.datum}      -      ${title.cas}`} name='Rezervovat'/> 
       {/* <Button title={`${title.datum}            ${title.cas}`} color={Colors.primaryColor}
    onPress={() => rezervujHandler()}/> */}
        </View>
      )
    }
    </ScrollView>




  );

//<View style={{width: '100%', height: 40, position: 'absolute', left: ((screenWidth/4) - 10), right: 0, bottom: 60}}>

};



//  export class Jazdy extends Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedStartDate: null,
//     };
//     this.onDateChange = this.onDateChange.bind(this);
//   };
//   // dateChangeHandler = (date) => {
//   //   const upravenyDate = moment(date).format("MM DD YYYY");
//   //   const token = useSelector(state => state.auth.token);
//   //   console.log({token});
//   // }


//   onDateChange(date) {
//     this.setState({
//       selectedStartDate: date,
//       datum: date,
//     });


    
//   }
//   render() {
//     const { selectedStartDate } = this.state;
//     const startDate = selectedStartDate ? selectedStartDate.toString() : '';
//     //const token = useSelector(state => state.auth.token);
//     const dateChangeHandler = (date) => {
//       const upravenyDate = moment(date).format("MM DD YYYY");
//       const { token } = this.props;
//       const dataToSent = {
//         token: token,
//         date: upravenyDate
//       }
//       console.log(dataToSent);
//       return (
//         <TimeButton />
//       );
//     }
  
    
//     return (
//       <View style={styles.container}>
//         <CalendarPicker
//           onDateChange={dateChangeHandler}
//           selectedDayColor = {Colors.primaryColor}
//         />
//         <View>
//           <Text>SELECTED DATE:</Text>
//         </View>
//       </View>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     token: state.auth.token
//   }
// };
// export default connect(mapStateToProps, null)(Jazdy)

export default JazdyRezervacia;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    marginTop: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  screen: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',


},
instruktor: {
  marginLeft: 8,
  marginBottom: 10,
 
},
customButon: {
    margin: 5,
    height: 30,
    width: '21%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,


},

textInButton: {
    fontSize: 20,
    color: 'black',
    //fontFamily: 'open-sans-bold',
    //textAlign: 'center',

},
});
