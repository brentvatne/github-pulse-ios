'use strict';

import React, { Component, View, } from 'react-native';
import { Main, Accent, } from '../Fonts';
import { Blue, } from '../Colours';
import ReactART, { Surface, Group, Shape, } from 'ReactNativeART';
import Circle from './Circle';
import SmoothLine from 'paths-js/smooth-line';
import Dimensions from 'Dimensions';

const DeviceWidth = Dimensions.get('window').width;

export default class ContributionsChart extends Component {
  static defaultProps = { commits: [] }

  render() {
    if (!this.props.commits.length) {
      return <View />;
    }

    const points = this.props.commits.map((i, commits) => [commits, i]);
    const chart = SmoothLine({
      data: [points],
      width: DeviceWidth - 40,
      height: 160,
      closed: false
    });

    const line = <Shape d={chart.curves[0].line.path.print()} stroke={Blue} />
    const area = <Shape d={chart.curves[0].area.path.print()} opacity={0.2} fill={Blue} />
    const circles = chart.curves[0].line.path.points().map(([x, y]) => {
      return (
        <Group x={x} y={y}>
          <Circle radius={5} fill={Blue} strokeWidth={2} stroke="#ffffff" />
        </Group>
      )
    });

    return (
      <Surface width={DeviceWidth} height={180}>
        <Group x={20} y={10}>
          {line}
          {area}
          {circles}
        </Group>
      </Surface>
    )
  }
}
