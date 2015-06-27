import React, { StyleSheet, PixelRatio, } from 'react-native';
import { Blue, Grey, } from '../Colours';
import { Main, Accent, } from '../Fonts';

export default styles = StyleSheet.create({
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
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 20,
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
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(0,0,0,0.1)',
  },
  stat: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 15,
    paddingTop: 8,
  },
  number: {
    fontFamily: Main,
    fontSize: 32,
    color: Blue,
    letterSpacing: -1,
    fontWeight: '600',
  },
  description: {
    fontFamily: Main,
    color: Grey,
    fontSize: 11,
  }
});
