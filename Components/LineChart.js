'use strict';

import React, { StyleSheet, Text, View, Image, Component, TextInput, } from 'react-native';
import { Main, Accent, } from '../Fonts';
import { Blue, Grey, } from '../Colours';
import ReactART, { Path, Surface, Group, Transform, Shape, } from 'ReactNativeART';
import Bezier from 'paths-js/bezier';
import TimerMixin from 'react-timer-mixin';

var Circle = React.createClass({
  render: function() {
    var radius = this.props.radius;

    var path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close();

    return <Shape {...this.props} d={path} />;
  }
});

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factor: 0.1
    }
  }

  componentDidMount() {
    this.animateLine();
  }

  animateLine() {
    if (this.state.factor < 1) {
      this.setState({factor: this.state.factor + 0.05});
      requestAnimationFrame(this.animateLine.bind(this));
    }
  }

  render() {
    let f = this.state.factor;
    const points = [
      [0, 50 * f],
      [50, 70 * f],
      [100, 40 * f],
      [150, 30 * f],
      [200, 60 * f],
      [250, 80 * f],
      [300, 50 * f]
    ];

    let line = Bezier({points: points });
    let circles = line.path.points().map(function(p) {
      return (
        <Group x={p[0]} y={p[1]}>
          <Circle radius={5} fill={Blue} />
        </Group>
      )
    });

    return (
      <Surface width={320} height={150}>
        <Shape stroke="#888888" strokeWidth={1} d={line.path.print()} />
        {circles}
      </Surface>
    )
  }
}
