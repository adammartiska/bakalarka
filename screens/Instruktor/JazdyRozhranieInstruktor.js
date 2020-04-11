import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import JazdyAbsolvovane from '../Instruktor/JazdyAbsolvovane';
import JazdyNadchadzajuce from '../Instruktor/JazdyNadchadzajuce';
import Colors from '../../constants/Colors';
import { TabBar } from 'react-native-tab-view';
import JazdyPending from '../Instruktor/JazdyPending';

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Rezervovane' },
      { key: 'second', title: 'Absolvovane' },
      { key: 'third', title: 'Cakajuce' }
    ]
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: JazdyNadchadzajuce,
          second: JazdyAbsolvovane,
          third: JazdyPending
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'white' }}
            activeColor={Colors.primaryColor}
            inactiveColor={'black'}
          />
        )}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});
