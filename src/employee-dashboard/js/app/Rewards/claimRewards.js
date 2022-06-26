import { Skeleton } from "antd";
import React, { Component } from "react";
import { Spinner } from "../../../../common";
import { showNotification } from "../../../../utils/general";
import LuckyWheel from "../../common/luckyWheel";
import { claimReward } from "../api";

export default class ClaimReward extends Component {
  state = {
    loading: false,
  };
  onFinished = (claimed) => {
    const { rewards = [], employeeDetails, onSuccess } = this.props;
    const claimedReward = rewards.find((reward) => claimed === reward.title);

    const data = {
      rewardId: claimedReward?.id,
      employeeId: employeeDetails?.id,
    };

    this.setState({loading: true});
    claimReward(data)
      .then((res) => {
        this.setState({loading: false});
        showNotification(res?.message || 'Something went wrong, please try again!' )
        typeof onSuccess == "function" && onSuccess();
      })
      .catch(() => {
          this.setState({loading: false});
      });
  }

  updateSpinner = () => {
    const { points, pointsToClaim } = this.props;
    const canvas = document.getElementById("canvas");
    if (canvas) {
      if (points < pointsToClaim) {
        canvas.style.pointerEvents = 'none';
        canvas.style.cursor = 'not-allowed';
      } else {
        canvas.style.pointerEvents = 'auto';
        canvas.style.cursor = 'unset';
      }
    }
  }

  componentDidUpdate() {
    this.updateSpinner();
  }

  componentDidMount() {
   this.updateSpinner();
  }
  render() {
    const { loading, rewards, points, pointsToClaim } = this.props;
    if (loading && !rewards) {
      return (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      );
    }

    const segments = [];
    const segColors = [];

    (rewards || []).forEach((reward) => {
      segments.push(reward.title);
      segColors.push(reward.color);
    });

    return (
      <>
        {this.state.loading && <Spinner />}
        <div className="text-center">
          <p className="bold font-16 mt-10">Current Points: {points}</p>
          <p className="mt-10">
            {points < pointsToClaim
              ? `You need to have at least ${pointsToClaim} points to claim reward.`
              : `Claim reward by spinning the wheel, please note it will cost ${pointsToClaim} points.`}
          </p>
          <LuckyWheel
            segments={segments}
            segColors={segColors}
            onFinished={this.onFinished}
            onLoadWheel
          />
        </div>
      </>
    );
  }
}
