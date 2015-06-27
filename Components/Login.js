'use strict';

import React, { StyleSheet, Text, View, Image, Component, TextInput, } from 'react-native';
import { Blue, Grey, } from '../Colours';
import { Main, Accent, } from '../Fonts';
import GithubApi from '../GithubApi';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginTop: 90,
  },
  titleText: {
    fontSize: 36,
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
    marginTop: 15,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
  }
});

class Login extends Component {
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

  handleSubmit() {

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
          onSubmitEditing={this._handleSubmit}
          style={styles.usernameInput}
          placeholder="Enter your Github username" />
        <View style={styles.footer}>
          <Text style={styles.zenTip}>{this.state.zen || ' '}</Text>
          <Text style={styles.zenAttribution}>{this.state.zen ? 'api.github.com/zen' : ' '}</Text>
        </View>
      </View>
    )
  }
}

module.exports = Login;
