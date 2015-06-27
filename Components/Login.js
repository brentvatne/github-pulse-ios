'use strict';

import React, { StyleSheet, Text, View, Image, Component, TextInput, } from 'react-native';
import { Blue, Grey, } from '../Colours';
import { Main, Accent, } from '../Fonts';
import GithubApi from '../GithubApi';
import LineChart from './LineChart';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginTop: 80,
  },
  titleText: {
    fontSize: 44,
    letterSpacing: -1,
    fontWeight: 'bold',
    fontFamily: Main,
  },
  pulseText: {
    color: Blue,
  },
  usernameInput: {
    height: 50,
    fontFamily: Main,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0,0,0,0.2)',
    textAlign: 'center',
    color: Grey,
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  zenTip: {
    color: Grey,
    fontFamily: Main,
    fontSize: 16,
  },
  zenAttribution: {
    color: Grey,
    opacity: 0.5,
  },
  logo: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      zen: null,
    }
  }

  componentWillMount() {
    GithubApi.getZen().then((zen) => {
      this.setState({zen});
    });
  }

  _handleSubmit() {
    this.props.navigator.replace({id: 'profile', username: this.state.username});
  }

  _updateUsername(username) {
    this.setState({username})
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('image!Logo')} style={styles.logo} />
        <Text style={styles.titleText}>
          Github <Text style={styles.pulseText}>Pulse</Text>
        </Text>
        <TextInput
          returnKeyType='go'
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={this._handleSubmit.bind(this)}
          style={styles.usernameInput}
          placeholder="Enter your Github username"
          onChangeText={this._updateUsername.bind(this)} />

        <LineChart />

        <View style={styles.footer}>
          <Text style={styles.zenTip}>{this.state.zen || ' '}</Text>
          <Text style={styles.zenAttribution}>{this.state.zen ? 'api.github.com/zen' : ' '}</Text>
        </View>
      </View>
    )
  }
}
