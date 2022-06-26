import React, { Component } from "react";
import LuckyWheel from "../../common/luckyWheel";
import FilterTable from '../../common/FilterTable';
import moment from "moment";

export default class RewardsHistory extends Component {
    state = {
        uuid: Math.random(),
    }

    
    render() {
        const {rewardsHistory} = this.props;
        const columns = [
            {
              title: "Reward Title",
              dataIndex: "reward.title",
              key: "title",
              sorter: true,
            },
            {
              title: "Claimed On",
              dataIndex: "operator.name",
              key: "claimed",
              render: (text, record) => {
                const date =  moment(record.createdAt || new Date).format("DD MMM YYYY");
                return (
                  <div style={{ display: "flex" }}>
                    <p>
                      {date}
                    </p>
                  </div>
                );
              },
            }
          ];

        return <div>
            <FilterTable
             uuid={this.state.uuid}
             columns={columns}
             filterData={() => Promise.resolve({data: rewardsHistory})}
            /> 
        </div>
    }
}