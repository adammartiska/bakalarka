import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ConfirmScreen from '../Instruktor/ConfirmScreen';
import KickScreen from '../Instruktor/KickScreen';
import Colors from '../../constants/Colors';
import { TabBar } from 'react-native-tab-view';

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Ziadosti o prijatie' },
      { key: 'second', title: 'Neaktivni ziaci' }
    ]
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: ConfirmScreen,
          second: KickScreen
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
