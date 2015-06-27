'use strict';

import React, { Component, View, } from 'react-native';
import { Main, Accent, } from '../Fonts';
import { Blue, Grey } from '../Colours';
import ReactART, { Surface, Group, Shape, } from 'ReactNativeART';
import Circle from './Circle';
import Path from 'paths-js/path';
import SmoothLine from 'paths-js/smooth-line';
import Dimensions from 'Dimensions';

const DeviceWidth = Dimensions.get('window').width;
const innerHeight = 160;
const innerWidth = DeviceWidth - 40;

export default class ContributionsChart extends Component {
  _renderGrid() {
    const underline = Path().moveto(0, innerHeight).lineto(innerWidth, innerHeight);
    const leftline = Path().moveto(0, 0).lineto(0, innerHeight);

    return (
      <Group x={20} y={10}>
        <Shape d={underline.print()} strokeWidth={1} stroke='rgba(0,0,0,0.1)' />
        <Shape d={leftline.print()} strokeWidth={1} stroke='rgba(0,0,0,0.1)' />
      </Group>
    )
  }

  render() {
    const commits = this.props.commits.length ? this.props.commits : [0,0,0];
    const points = commits.map((i, commits) => [commits, i]);
    const chart = SmoothLine({
      data: [points],
      width: innerWidth,
      height: innerHeight,
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
        {this._renderGrid()}
        <Group x={20} y={10}>
          {line}
          {area}
          {circles}
        </Group>
      </Surface>
    )
  }
}
