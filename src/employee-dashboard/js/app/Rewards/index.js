import React, { Component } from "react";
import { Spinner } from "../../../../common";
import BodyContainer from "../../common/BodyContainer";
import { getRewards, getRewardsHistory } from "../api";
import ClaimReward from "./claimRewards";
import RewardsHistory from "./rewardsHistory";

export default class Rewards extends Component {
  state = {
    menu: 0,
    rewardsHistory: null,
    rewards: null,
    loadingRewards: false,
    loadingHistory: false,
    points: 0,
    pointsToClaim: 0
  };

  getMyRewardsHistory() {
      this.setState({loadingHistory: true})
      const {employeeDetails} = this.props;
      getRewardsHistory(employeeDetails.id)
      .then(res => {
        this.setState({loadingHistory: false});
        if (res.data) {
            this.setState({points: res.data.points, rewardsHistory: res.data.rewardsHistory, pointsToClaim: res.data.pointsToClaim});
        }
      })
      .catch(e => {
          this.setState({loadingHistory: false})
      })
  }

  getAllRewards() {
      this.setState({loadingRewards: true});
      getRewards()
      .then(res => {
          this.setState({loadingRewards: false})
          if (res.rewards) {
              this.setState({rewards: res.rewards})
          }
      })
      .catch(err => {
          this.setState({loadingRewards: false})
      })
  }

  componentDidMount() {
      this.getAllRewards();
      this.getMyRewardsHistory();
  }

  
  render() {
    return (
      <BodyContainer title="Dashboard">
        {/* {(this.state.loadingHistory || this.state.loadingRewards) && <Spinner/>} */}
        <div>
          <button
            className={this.state.menu === 0 ? 'customBtnDefault' : 'customBtnSecondary'}
            onClick={() => {
              this.setState({ menu: 0 });
            }}
          >
            Rewards
          </button>
          <button
            className={this.state.menu === 1 ? 'customBtnDefault' : 'customBtnSecondary'}
            style={{ marginLeft: "5px" }}
            onClick={() => {
              this.setState({ menu: 1 });
            }}
          >
            History
          </button>
        </div>
        <div style={{height: '75vh'}}>
            {this.state.menu === 0 ? 
            <ClaimReward 
                loading={this.state.loadingRewards || this.state.loadingHistory} 
                rewards={this.state.rewards} 
                points={this.state.points} 
                pointsToClaim={this.state.pointsToClaim}
                employeeDetails={this.props.employeeDetails}
                onSuccess={() =>  this.getMyRewardsHistory()}/> : 
            <RewardsHistory loading={this.state.loadingHistory} rewardsHistory={this.state.rewardsHistory}/>}
        </div>
      </BodyContainer>
    );
  }
}
