import React, { Component, } from 'react-native';
import ReactART, { Path, Shape, } from 'ReactNativeART';

export default class Circle extends Component {
  render() {
    const { radius, } = this.props;

    let path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close();

    return <Shape {...this.props} d={path} />;
  }
}
