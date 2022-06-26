import React from "react";
import WheelComponent from "react-wheel-of-prizes";
import './luckyWheel.css'
export default class LuckyWheel extends React.Component {
  render() {
    const { segments = [], segColors, onFinished } = this.props;

    return segments.length > 0 ? (
      <WheelComponent
        segments={segments}
        segColors={segColors}
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={true}
        size={260}
        upDuration={100}
        downDuration={1000}
        fontFamily="Arial"
        style={{'pointer-events': 'none'}}
      />
    ) : null;
  }
}
