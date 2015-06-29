'use strict';

import React, { Component, View, PanResponder, } from 'react-native';
import { Main, Accent, } from '../Fonts';
import { Blue, Grey } from '../Colours';
import ReactART, { Surface, Group, Shape, Text, Transform, } from 'ReactNativeART';
import ChartTooltip from './ChartTooltip';
import Circle from './Circle';
import Rectangle from './Rectangle';
import Path from 'paths-js/path';
import SmoothLine from 'paths-js/smooth-line';
import Dimensions from 'Dimensions';

const DeviceWidth = Dimensions.get('window').width;
const innerHeight = 160;
const innerWidth = DeviceWidth - 40;
const leftMargin = 20;

export default class ContributionsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touchX: null
    }
  }

  _handleTouch(x) {
    this.setState({touchX: x - leftMargin});
  }

  _handleTouchCancel(e, { moveX, }) {
    this.setState({touchX: null});
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (e, { x0 }) => this._handleTouch(x0),
      onPanResponderMove: (e, { moveX }) => this._handleTouch(moveX),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this._handleTouchCancel.bind(this),
      onPanResponderTerminate: this._handleTouchCancel.bind(this),
    });
  }

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

  _isTouchingPoint(x, currentPointIndex, allPoints) {
    if (!x) {
      return false;
    }

    let currPointX = allPoints[currentPointIndex][0];
    let prevPointX = (allPoints[currentPointIndex - 1] || [])[0];
    let nextPointX = (allPoints[currentPointIndex + 1] || [])[0];

    if ((prevPointX || prevPointX === 0)&& nextPointX) {
      let lowerMid = prevPointX + ((currPointX - prevPointX) / 2);
      let upperMid = currPointX + ((nextPointX - currPointX) / 2);

      if (x > lowerMid && x < upperMid) {
        return true;
      }
    } else if ((prevPointX || prevPointX === 0) && !nextPointX) {
      let lowerMid = prevPointX + ((currPointX - prevPointX) / 2);

      if (x > lowerMid) {
        return true;
      }
    } else if (!prevPointX && prevPointX !== 0 && nextPointX) {
      let upperMid = currPointX + ((nextPointX - currPointX) / 2);
      if (x < upperMid) {
        return true;
      }
    } else {
      return false;
    }
  }

  render() {
    const commits = this.props.commits.length ? this.props.commits : [0,0,0];
    const data = commits.map((i, commits) => [commits, i]);
    const chart = SmoothLine({
      data: [data],
      width: innerWidth,
      height: innerHeight,
      closed: false
    });

    const line = <Shape d={chart.curves[0].line.path.print()} stroke={Blue} />
    const area = <Shape d={chart.curves[0].area.path.print()} opacity={0.2} fill={Blue} />
    const points = chart.curves[0].line.path.points();
    let tooltip = null;

    const circles = points.map(([x, y], i) => {
      let fillColor = Blue;
      let strokeColor = '#fff';

      if (this._isTouchingPoint(this.state.touchX, i, points)) {
        [strokeColor, fillColor] = [fillColor, strokeColor];
        tooltip = (
          <ChartTooltip x={x} y={y} inverted={y <= 30}>
            {this.props.commits[i].toString()}
          </ChartTooltip>
        )
      }

      return (
        <Group x={x} y={y} key={x.toString() + ' ' + y.toString()}>
          <Circle radius={5} fill={fillColor} strokeWidth={2} stroke={strokeColor} />
        </Group>
      )
    });

    return (
      <View {...this._panResponder.panHandlers}>
        <Surface width={DeviceWidth} height={180}>
          {this._renderGrid()}
          <Group x={leftMargin} y={10}>
            {line}
            {area}
            {circles}
            {tooltip}
          </Group>
        </Surface>
      </View>
    )
  }
}
