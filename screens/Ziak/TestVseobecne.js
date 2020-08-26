import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

let arrnew = [];

export default class Prvy extends Component {
  constructor(props) {
    super(props);
    this.Qno = 0;
    this.score = 0;
    const { params } = this.props.navigation.state;
    const jdata = params.test;
    arrnew = jdata;

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
  }

  zobrazVysledok() {
    if (this.state.vyhodnot) {
      return (
        <View style={styles.centered}>
          <View>
            <Icon name="md-flag" size={wp('9%')} />
          </View>
          <View style={{ marginVertical: hp('1.75%') }}>
            <Text style={{ fontSize: hp('2.25%') }}>
              Dosiahol si {this.score} z {arrnew.questions.length} moznych bodov
            </Text>
          </View>
        </View>
      );
    } else if (this.state.uhadnute) {
      return (
        <View style={styles.centered}>
          <View>
            <Icon name="md-checkmark" size={wp('9%')} color={Colors.carhartt} />
          </View>
          <View style={{ marginVertical: hp('1.75%') }}>
            <Text style={{ fontSize: hp('2.25%') }}>
              Spravne! Len tak dalej
            </Text>
          </View>
        </View>
      );
    } else if (this.state.neuhadnute) {
      return (
        <View style={styles.centered}>
          <View>
            <Icon name="md-close" size={wp('9%')} color="#f00" />
          </View>
          <View style={{ marginVertical: hp('1.75%') }}>
            <Text style={{ fontSize: hp('2.25%') }}>Nespravna odpoved</Text>
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
          <Text style={{ fontSize: hp('3%'), textAlign: 'center' }}>
            {this.state.question}
          </Text>
        </View>
        <View>
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
                  buttonSize={wp('4%')}
                  buttonOuterSize={wp('6%')}
                  buttonStyle={{ marginVertical: hp('2%') }}
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
                  labelStyle={{ fontSize: hp('2.25%') }}
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
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.check()}
              hitSlop={{
                left: wp('7%'),
                right: wp('7%'),
                top: hp('3%'),
                bottom: hp('3%')
              }}
            >
              <Icon name="md-search" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.customButon}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={
                this.state.vyhodnot ? () => this.vyhodnot() : () => this.next()
              }
              hitSlop={{
                left: wp('7%'),
                right: wp('7%'),
                top: hp('3%'),
                bottom: hp('3%')
              }}
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
    paddingHorizontal: wp('12%')
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('8%')
  },
  questionHeader: {
    marginBottom: hp('5%')
  },
  customButon: {
    marginHorizontal: wp('2%'),
    height: hp('5%'),
    width: wp('22%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3
  }
});
