import React, { Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
//import { Colors } from 'react-native-paper';
import Colors from '../../constants/Colors';
import moment from 'moment';
import {useSelector, connect, useDispatch} from 'react-redux';
import TimeButtonCheck from '../../components/TimeButtonCheck';
import TimeButton from '../../components/TimeButton';
import * as authActions from '../../store/actions/auth';
import { useFetchGet } from '../../hooks/useFetch';


const JazdyInstruktor = props => {
  const [pole, setPole] = useState([]);
    useEffect(() => {
    console.log('useEffect');
  }, []);
  const selectedStartDate = null;
  const res = useFetchGet('geh');
  const { error, isloadink, response } = res;
  const [isLoading, setIsLoading] = useState(true);
  const [displayText, setDisplayText] = useState(true);
  const dataToMap = ["11:00", "12:00", "13:00", "14:00", "15:00"];

  const checkHandler = (id) => {
    setCeknute(!ceknute);
    if(!ceknute) {
        const novePole = pole.slice();
        novePole.push(id);
        console.log("pushuj");
        setPole(novePole); 
        console.log(pole); 
    }
    else
    {
        console.log("filtruj");
    }

};


const list = [
  { value: "1100", label: "11:00" },
  { value: "1200", label: "12:00" },
  { value: "1300", label: "13:00" },
  { value: "1400", label: "14:00" },
  { value: "1500", label: "15:00" },
  { value: "1600", label: "16:00" }
];
const [data, setData] = useState(() =>
list.map(item => ({
  ...item,
  isChecked: true
}))
);


const zhromazdiData = (data) => {
    data.map(item => {
    if(item.isChecked === true) {
      pole.push(item.label);
    }
  });
  console.log(pole);
 console.log(response.status);
}

function handleToggleCheckbox(value) {
  setData(list =>
    list.map(item => {
      if (item.value === value) {
        return {
          ...item,
          isChecked: !item.isChecked
        };
      }
      return item;
    })
  );
}

const dajPole = (pole, id) => {
  const novePole = pole.slice();
            novePole.push(id);
            console.log("pushuj");
            setPole(novePole); 
            console.log(pole); 
}

 const maper = (data) => {
    return(
      <View style = {styles.center}>
      <View style = {{marginHorizontal: 18,}}>
      <View style = {styles.screen}>
      {data.map(({value, label, isChecked}) => (

        <TimeButtonCheck
         key = {value}
         label={label}
         isChecked={isChecked}
         onPress={() => handleToggleCheckbox(value)}
         />
   ))}

      </View>
      </View>
     <TimeButton 
      name = 'Posli'
      styles={styles.restoreCenter}
      onPress={() => zhromazdiData(data)}
       />      
        </View>

    );
  }

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  // const [selectedDate, setSelectedDate] = useState([]);
  const token = useSelector(state => state.auth.token);
  const dateChangeHandler = (date) => {
      setIsLoading(false);
      setDisplayText(false);
       const upravenyDate = moment(date).format("YYYY-MM-DD");
      const dataToSent = {
        token: token,
        date: upravenyDate
      }
      console.log(dataToSent);
  };

    return(
    <View style={styles.container}>
    <CalendarPicker 
    onDateChange={dateChangeHandler}
    />
    <View>
    {(isLoading) ? ((displayText) ? (<View style={styles.centered}><Text>Pre zobrazenie volnych terminov si vyberte datum</Text></View>) : (<View style = {{paddingTop: 10,
      textAlign: 'center',}}><ActivityIndicator size='large' color={Colors.primaryColor}/></View>)) : maper(data)}
    </View>

    </View>



  );



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

export default JazdyInstruktor;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  screen: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',


},

restoreCenter: {
  width: '30%',
  marginVertical: 60,
  
  


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
posli: {
  marginTop: 20,
  justifyContent: 'center',
},

textInButton: {
    fontSize: 20,
    color: 'black',
    //fontFamily: 'open-sans-bold',
    //textAlign: 'center',

},
});
