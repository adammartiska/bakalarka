import * as React from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Colors from '../../constants/Colors';
import ConfirmScreen from '../Instruktor/ConfirmScreen';
import KickScreen from '../Instruktor/KickScreen';

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
        lazy
        navigationState={this.state}
        renderScene={SceneMap({
          first: ConfirmScreen,
          second: KickScreen
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'white', fontSize: 12 }}
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
