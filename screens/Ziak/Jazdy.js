import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import JazdyAbsolvovane from './JazdyAbsolvovane';
import JazdyNadchadzajuce from './JazdyNadchadzajuce';
import Colors from '../../constants/Colors';
import { TabBar } from 'react-native-tab-view';

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Rezervovane' },
      { key: 'second', title: 'Absolvovane' }
    ]
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: JazdyNadchadzajuce,
          second: JazdyAbsolvovane
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'white' }}
            activeColor={Colors.primaryColor}
            inactiveColor={Colors.carhartt}
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
