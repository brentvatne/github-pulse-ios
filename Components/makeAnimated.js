import React, { Component, View, Transform, } from 'react-native';
import easingFunctions from '../easingFunctions';

// TODO: Clean up this whole mess
export default BaseComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        scale: 0.01
      }
    }

    animateState(target, options) {
      options = options || {};
      let start = Date.now();
      let initialState = copy(this.state);
      let duration = 400;
      let easing = options.easing || easingFunctions.easeOutQuad;
      let self = this;

      function updateState() {
        var t = Math.min(Date.now() - start, duration) / duration;
        self.setState(interpolate(initialState, target, easing(t)));

        if (t < 1) {
          requestAnimationFrame(updateState);
        }
        else {
          if (options.done) options.done();
        }
      }

      requestAnimationFrame(updateState);
    }

    componentWillReceiveProps(nextProps) {
      // Nasty!
      if (nextProps[0] !== 0 && nextProps[1] !== 0 && !this.state.animating) {
        this.setState({animating: true});
        this.animateState({scale: 1});
      }
    }

    render() {
      return <BaseComponent {...this.state} {...this.props} />;
    }
  }
}

function interpolate(a, b, t) {
  if (Array.isArray(b)) {
    return b.map(function(x, i) {
      return interpolate(a[i], x, t);
    });
  }
  if (typeof b === 'object') {
    var res = {}, k;
    for (var k in b) {
      // No need to check hasOwnProperty,
      // we are working with object literals
      res[k] = interpolate(a[k], b[k], t);
    }
    return res;
  }
  if (typeof b === 'number') {
    return (a || 0.01) + (b - (a || 0.01)) * t;
  }
  return a || 0.01;
}

function copy(obj) {
  var res = {}, k;
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      res[k] = obj[k];
    }
  }
  return res;
}
