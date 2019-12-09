import React, {PureComponent} from 'react';
import {AppState} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

import Home from './src/views/home';
import Detail from './src/views/detail';
import Database from './src/database/database';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Detail: {
    screen: Detail
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends PureComponent {
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState !== 'active') {
      Database.close();
    }
  };

  render() {
    return <AppContainer />;
  }
}
