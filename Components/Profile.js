'use strict';

import React, { StyleSheet, Text, View, Image, Component, TextInput, } from 'react-native';
import { Blue, Grey, } from '../Colours';
import { Main, Accent, } from '../Fonts';
import GithubApi from '../GithubApi';
import { Contributions, } from 'NativeModules';

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      avatarUrl: 'https://secure.gravatar.com/avatar?size=100',
      name: '',
      followers: 0,
      following: 0,
      publicRepos: 0,

      streak: 0,
      today: 0,
      commits: [],

      // TODO
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
      this.setState({
        commits: commits,
        streak: streak,
        today: today,
      });
    });
  }

  render() {
    let { avatarUrl, name, followers, following, publicRepos,
          commits, streak, today, } = this.state;

    const styles = StyleSheet.create({
      container: {
        paddingTop: 30,
      },
      avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      headerImage: {
        padding: 10,
        paddingLeft: 15,
      },
      header: {
        flexDirection: 'row',
      },
      headerText: {
        flexDirection: 'column',
      },
      fullName: {
        fontFamily: Main,
        fontSize: 26,
        color: Blue,
        fontWeight: 'bold',
        letterSpacing: -1,
        marginTop: 8,
      },
      username: {
        fontFamily: Main,
        fontSize: 17,
        color: Grey,
        fontWeight: 'normal',
        marginTop: -5,
      },
      stats: {
        flexDirection: 'row',
      },
      stat: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
      },
      number: {
        fontFamily: Accent,
        fontSize: 32,
        color: Blue,
      },
      description: {
        fontFamily: Main,
        color: Grey,
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImage}>
            <Image source={{uri: avatarUrl}} style={styles.avatar} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.fullName}>{name}</Text>
            <Text style={styles.username}>@{this.props.username}</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.number}>{publicRepos}</Text>
            <Text style={styles.description}>repos</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.number}>{followers}</Text>
            <Text style={styles.description}>followers</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.number}>{streak}</Text>
            <Text style={styles.description}>streak</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.number}>{today}</Text>
            <Text style={styles.description}>today</Text>
          </View>
        </View>
      </View>
    )
  }

};
