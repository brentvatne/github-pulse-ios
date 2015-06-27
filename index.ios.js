'use strict';

import regenerator from 'regenerator/runtime';
import React, { AppRegistry, StyleSheet, Text, View, Component, Navigator } from 'react-native';
import Login from './Components/Login';
import Profile from './Components/Profile';

const DefaultRoute = { id: 'login', };

class GithubPulse extends Component {
  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    if (route.id === 'login') {
      return <Login navigator={navigator} />;
    } else {
      return <Profile navigator={navigator} username={route.username} />;
    }
  }

  configureScene(route) {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      <Navigator
        initialRoute={DefaultRoute}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    );
  }
}

AppRegistry.registerComponent('GithubPulse', () => GithubPulse);
