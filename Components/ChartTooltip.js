import React, { Component, } from 'react-native';
import ReactART, { Group, Text, Transform, } from 'ReactNativeART';
import Rectangle from './Rectangle';

export default class ChartTooltip extends Component {
  render() {
    let { x, y, inverted, } = this.props;
    let yPositions = {};

    if (inverted) {
      yPositions.pointer = 3;
      yPositions.background = 11;
      yPositions.text = 17;
    } else {
      yPositions.pointer = -20;
      yPositions.background = -40;
      yPositions.text = -33;
    }

    return (
     <Group x={x} y={y}>
        <Group y={yPositions.pointer} x={0} transform={new Transform().rotate(45)}>
          <Rectangle width={12} height={12} fill="#191919" />
        </Group>
        <Group y={yPositions.background} x={-15}>
          <Rectangle width={30} height={30} radius={5} fill="#191919" />
        </Group>
        <Group y={yPositions.text} x={0}>
          <Text font="Helvetica" stroke="white" alignment="center">
            {this.props.children}
          </Text>
        </Group>
      </Group>
    )
  }
}
