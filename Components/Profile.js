'use strict';

import React, { StyleSheet, Text, View, Image, Component, TextInput, } from 'react-native';
import { Blue, Grey, } from '../Colours';
import { Main, Accent, } from '../Fonts';
import GithubApi from '../GithubApi';
import { Contributions, } from 'NativeModules';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  }
});

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      avatarUrl: 'https://secure.gravatar.com/avatar?size=100',
      publicRepos: 0,
      followers: 0,
      streak: 0,
      today: 0,
      _fetchingUserInfo: true,
      _fetchingUserContributions: true,
    }
  }

  componentWillMount() {
    GithubApi.fetchUserInfo(this.props.username).then((info) => {
      this.setState({
        avatarUrl: info.avatar_url,
        name: info.name,
        followers: info.followers,
        following: info.following,
        publicRepos: info.public_repos,
      });
    });

    Contributions.fetch(this.props.username, (err, [commits, streak, today]) => {
      debugger;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello {this.props.username}</Text>
      </View>
    )
  }

};
