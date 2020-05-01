import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  Button,
  TouchableOpacity
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import Colors from '../../constants/Colors';
import TimeButton from '../../components/TimeButton';
import Icon from 'react-native-vector-icons/Ionicons';

let arrnew = [];

export default class Prvy extends Component {
  constructor(props) {
    super(props);
    this.Qno = 0;
    this.score = 0;
    const { params } = this.props.navigation.state;
    const jdata = params.test;
    // arrnew = Object.keys(jdata).map(function(k) {
    //   return jdata[k];
    // });
    arrnew = jdata;
    console.log(arrnew);

    this.state = {
      vyhodnot: false,
      value: 0,
      question: arrnew.questions[this.Qno].question,
      answers: arrnew.questions[this.Qno].answers,
      correct: arrnew.questions[this.Qno].correctAnswer,
      uhadnute: false,
      neuhadnute: false
    };
  }
  next() {
    console.log(arrnew.questions.length);
    if (
      `answer_${arrnew.questions[this.Qno].correctAnswer}` ===
      `answer_${this.state.value + 1}`
    ) {
      this.score = this.score + 1;
    }
    if (this.Qno === arrnew.questions.length - 1) {
      this.setState({
        vyhodnot: true
      });
    } else {
      this.Qno++;
      this.setState({
        neuhadnute: false,
        uhadnute: false,
        value: 0,
        question: arrnew.questions[this.Qno].question,
        answers: arrnew.questions[this.Qno].answers,
        correct: arrnew.questions[this.Qno].correctAnswer
      });
    }
    console.log(this.Qno);
    console.log(this.state.vyhodnot);
  }

  check() {
    if (
      `answer_${arrnew.questions[this.Qno].correctAnswer}` ===
      `answer_${this.state.value + 1}`
    ) {
      this.setState({
        uhadnute: true
      });
    } else {
      this.setState({ neuhadnute: true });
    }
    console.log(this.state.vyhodnot);
  }

  zobrazVysledok() {
    if (this.state.vyhodnot) {
      return (
        <View style={styles.centered}>
          <View>
            <Icon name="md-flag" size={35} />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text>
              Dosiahol si {this.score} z {arrnew.questions.length} moznych bodov
            </Text>
          </View>
        </View>
      );
    } else if (this.state.uhadnute) {
      return (
        <View style={styles.centered}>
          <View>
            <Icon name="md-checkmark" size={35} color={Colors.carhartt} />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text>Spravne! Len tak dalej</Text>
          </View>
        </View>
      );
    } else if (this.state.neuhadnute) {
      return (
        <View style={styles.centered}>
          <View>
            <Icon name="md-close" size={35} color="#f00" />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text>Nespravna odpoved</Text>
          </View>
        </View>
      );
    }
    return;
  }

  vyhodnot() {
    return (
      <View>
        <Text>
          Dosiahol si {this.score} z {arrnew.length} moznych bodov
        </Text>
      </View>
    );
  }

  nextButtonHandler() {
    //TODO MOZNO ZOBRAZIT INU IKONU NA VYHODNOTENIE
    // if (this.Qno === arrnew.questions.length - 1) {
    //   return <Text style={styles.textInButton}>Vyhodnot</Text>;
    // }
    return <Icon name="ios-arrow-dropright" size={30} />;
  }

  render() {
    const radio_props = [
      { label: `${this.state.answers.answer_1}`, value: 1 },
      { label: `${this.state.answers.answer_2}`, value: 2 },
      { label: `${this.state.answers.answer_3}`, value: 3 }
    ];
    return (
      <View style={styles.center}>
        <View style={styles.questionHeader}>
          <Text style={{ fontSize: 22, textAlign: 'center' }}>
            {this.state.question}
          </Text>
        </View>
        <View style={styles.radio}>
          <RadioForm initial={1}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.value === i}
                  onPress={() => {
                    this.setState({
                      neuhadnute: false,
                      uhadnute: false,
                      value: i
                    });
                  }}
                  borderWidth={1}
                  buttonInnerColor={
                    this.state.value === i
                      ? this.state.uhadnute
                        ? Colors.carhartt
                        : this.state.neuhadnute
                        ? '#f00'
                        : Colors.primaryColor
                      : '#000'
                  }
                  buttonOuterColor="#000"
                  buttonSize={15}
                  buttonOuterSize={25}
                  buttonStyle={{ marginVertical: 5 }}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={() => {
                    this.setState({
                      neuhadnute: false,
                      uhadnute: false,
                      value: i
                    });
                  }}
                  labelHorizontal={true}
                  labelStyle={{ fontSize: 15 }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
        {this.zobrazVysledok()}
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 10,
            top: 0,
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <View style={styles.customButon}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.check()}>
              <Icon name="md-search" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.customButon}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={
                this.state.vyhodnot ? () => this.vyhodnot() : () => this.next()
              }
            >
              {this.nextButtonHandler()}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  questionHeader: {
    paddingBottom: 20
  },
  radio: {
    marginBottom: 20
  },
  customButon: {
    margin: 5,
    height: 35,
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  },
  textInButton: {
    fontSize: 22,
    color: 'black'
  }
});
